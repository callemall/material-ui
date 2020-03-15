/* eslint-disable no-console */
import * as babel from '@babel/core';
import traverse from '@babel/traverse';
import { mkdir, readFileSync, writeFileSync } from 'fs';
import { getLineFeed } from './helpers';
import { rewriteUrlForNextExport } from 'next/dist/next-server/lib/router/rewrite-url-for-export';
import path from 'path';
import kebabCase from 'lodash/kebabCase';
import uniqBy from 'lodash/uniqBy';
import { defaultHandlers, parse as docgenParse } from 'react-docgen';
import muiDefaultPropsHandler from '../src/modules/utils/defaultPropsHandler';
import generateMarkdown from '../src/modules/utils/generateMarkdown';
import { findPagesMarkdown, findComponents } from '../src/modules/utils/find';
import { getHeaders } from '../src/modules/utils/parseMarkdown';
import parseTest from '../src/modules/utils/parseTest';
import { pageToTitle } from '../src/modules/utils/helpers';
import createMuiTheme from '../../packages/material-ui/src/styles/createMuiTheme';
import getStylesCreator from '../../packages/material-ui-styles/src/getStylesCreator';
import createGenerateClassName from '../../packages/material-ui-styles/src/createGenerateClassName';

const generateClassName = createGenerateClassName();

function ensureExists(pat, mask, cb) {
  mkdir(pat, mask, err => {
    if (err) {
      if (err.code === 'EEXIST') {
        cb(null); // ignore the error if the folder already exists
      } else {
        cb(err); // something else went wrong
      }
    } else {
      cb(null); // successfully created folder
    }
  });
}

// Read the command-line args
const args = process.argv;

// Exit with a message
function exit(error) {
  console.log(error, '\n');
  process.exit();
}

if (args.length < 4) {
  exit('\nERROR: syntax: buildApi source target');
}

const rootDirectory = path.resolve(__dirname, '../../');
const docsApiDirectory = path.resolve(rootDirectory, args[3]);
const theme = createMuiTheme();

const inheritedComponentRegexp = /\/\/ @inheritedComponent (.*)/;

function getInheritance(testInfo, src) {
  let inheritedComponentName = testInfo.inheritComponent;

  if (inheritedComponentName == null) {
    const match = src.match(inheritedComponentRegexp);
    if (match !== null) {
      inheritedComponentName = match[1];
    }
  }

  if (inheritedComponentName == null) {
    return null;
  }

  let pathname;

  switch (inheritedComponentName) {
    case 'Transition':
      pathname = 'https://reactcommunity.org/react-transition-group/transition#Transition-props';
      break;

    default:
      pathname = `/api/${kebabCase(inheritedComponentName)}`;
      break;
  }

  return {
    component: inheritedComponentName,
    pathname,
  };
}

async function annotateComponentDefinition(component, api) {
  const typesFilename = component.filename.replace(/\.js$/, '.d.ts');
  const typesSource = readFileSync(typesFilename, { encoding: 'utf8' });
  const typesAST = await babel.parseAsync(typesSource, {
    configFile: false,
    filename: typesFilename,
    presets: [require.resolve('@babel/preset-typescript')],
  });

  let start = null;
  let end = null;
  traverse(typesAST, {
    ExportDefaultDeclaration(babelPath) {
      // export default function Menu() {}
      let node = babelPath.node;
      if (node.declaration.type === 'Identifier') {
        // declare const Menu: {};
        // export default Menu;
        const bindingId = babelPath.node.declaration.name;
        const binding = babelPath.scope.bindings[bindingId];
        node = binding.path.parentPath.node;
      }

      const { leadingComments = [] } = node;
      const [jsdocBlock, ...rest] = leadingComments;
      if (rest.length > 0) {
        throw new Error('Should only have a single leading jsdoc block');
      }
      if (jsdocBlock !== undefined) {
        start = jsdocBlock.start;
        end = jsdocBlock.end;
      } else {
        start = node.start - 1;
        end = start;
      }
    },
  });

  if (end === null || start === 0) {
    throw new TypeError(
      "Don't know where to insert the jsdoc block. Probably no `default export` found",
    );
  }

  const demos = uniqBy(
    api.pagesMarkdown.filter(page => {
      return page.components.includes(api.name);
    }, []),
    page => page.pathname,
  );

  const jsdoc = `/**
 * ${api.description.replace(/\n/g, '\n * ')}
 *
 * Demos:
 * - ${demos
   .map(
     page =>
       `{@link https://material-ui.com${rewriteUrlForNextExport(page.pathname)} ${pageToTitle(
         page,
       )}}`,
   )
   .join('\n * - ')}
 *
 * API:
 * - {@link https://material-ui.com/api/${kebabCase(api.name)}/ ${api.name} API}
 * ${
   api.inheritance !== null
     ? `- inherits {@link https://material-ui.com${rewriteUrlForNextExport(
         api.inheritance.pathname,
       )} ${api.inheritance.component} API}`
     : ''
 }
 */`;
  const typesSourceNew = typesSource.slice(0, start) + jsdoc + typesSource.slice(end);
  writeFileSync(typesFilename, typesSourceNew, { encoding: 'utf8' });
}

async function buildDocs(options) {
  const { component: componentObject, pagesMarkdown } = options;
  const src = readFileSync(componentObject.filename, 'utf8');

  if (src.match(/@ignore - internal component\./) || src.match(/@ignore - do not document\./)) {
    return;
  }

  const spread = !src.match(/ = exactProp\(/);

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const component = require(componentObject.filename);
  const name = path.parse(componentObject.filename).name;
  const styles = {
    classes: [],
    name: null,
    descriptions: {},
  };

  if (component.styles && component.default.options) {
    // Collect the customization points of the `classes` property.
    styles.classes = Object.keys(getStylesCreator(component.styles).create(theme)).filter(
      className => !className.match(/^(@media|@keyframes)/),
    );
    styles.name = component.default.options.name;
    styles.globalClasses = styles.classes.reduce((acc, key) => {
      acc[key] = generateClassName(
        {
          key,
        },
        {
          options: {
            name: styles.name,
            theme: {},
          },
        },
      );
      return acc;
    }, {});

    let styleSrc = src;
    // Exception for Select where the classes are imported from NativeSelect
    if (name === 'Select') {
      styleSrc = readFileSync(
        componentObject.filename.replace(
          `Select${path.sep}Select`,
          `NativeSelect${path.sep}NativeSelect`,
        ),
        'utf8',
      );
    }

    /**
     * Collect classes comments from the source
     */
    const stylesRegexp = /export const styles.*[\r\n](.*[\r\n])*};[\r\n][\r\n]/;
    const styleRegexp = /\/\* (.*) \*\/[\r\n]\s*(\w*)/g;
    // Extract the styles section from the source
    const stylesSrc = stylesRegexp.exec(styleSrc);

    if (stylesSrc) {
      // Extract individual classes and descriptions
      stylesSrc[0].replace(styleRegexp, (match, desc, key) => {
        styles.descriptions[key] = desc;
      });
    }
  }

  let reactAPI;
  try {
    reactAPI = docgenParse(src, null, defaultHandlers.concat(muiDefaultPropsHandler), {
      filename: componentObject.filename,
    });
  } catch (err) {
    console.log('Error parsing src for', componentObject.filename);
    throw err;
  }

  reactAPI.name = name;
  reactAPI.styles = styles;
  reactAPI.pagesMarkdown = pagesMarkdown;
  reactAPI.src = src;
  reactAPI.spread = spread;
  reactAPI.EOL = getLineFeed(src);

  const testInfo = await parseTest(componentObject.filename);
  // no Object.assign to visually check for collisions
  reactAPI.forwardsRefTo = testInfo.forwardsRefTo;

  // if (reactAPI.name !== 'TableCell') {
  //   return;
  // }

  // Relative location in the file system.
  reactAPI.filename = componentObject.filename.replace(rootDirectory, '');
  reactAPI.inheritance = getInheritance(testInfo, src);

  let markdown;
  try {
    markdown = generateMarkdown(reactAPI);
  } catch (err) {
    console.log('Error generating markdown for', componentObject.filename);
    throw err;
  }

  ensureExists(docsApiDirectory, 0o744, err => {
    if (err) {
      console.log('Error creating directory', docsApiDirectory);
      return;
    }

    writeFileSync(
      path.resolve(docsApiDirectory, `${kebabCase(reactAPI.name)}.md`),
      markdown.replace(/\r?\n/g, reactAPI.EOL),
    );
    writeFileSync(
      path.resolve(docsApiDirectory, `${kebabCase(reactAPI.name)}.js`),
      `import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from './${kebabCase(reactAPI.name)}.md';

export default function Page() {
  return <MarkdownDocs markdown={markdown} />;
}
`.replace(/\r?\n/g, reactAPI.EOL),
    );

    console.log('Built markdown docs for', reactAPI.name);
  });

  await annotateComponentDefinition(componentObject, reactAPI);
}

function run() {
  const pagesMarkdown = findPagesMarkdown()
    .map(markdown => {
      const markdownSource = readFileSync(markdown.filename, 'utf8');
      return {
        ...markdown,
        components: getHeaders(markdownSource).components,
      };
    })
    .filter(markdown => markdown.components.length > 0);
  const components = findComponents(path.resolve(rootDirectory, args[2]));

  components.forEach(component => {
    buildDocs({ component, pagesMarkdown }).catch(error => {
      console.warn(`error building docs for ${component.filename}`);
      console.error(error);
      process.exit(1);
    });
  });
}

run();
