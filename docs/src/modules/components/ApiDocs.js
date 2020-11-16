/* eslint-disable material-ui/no-hardcoded-labels, react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { exactProp } from '@material-ui/utils';
import Typography from '@material-ui/core/Typography';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import TopLayoutDocsPages from 'docs/src/modules/components/TopLayoutDocsPages';
import { SOURCE_CODE_ROOT_URL } from 'docs/src/modules/constants';

function PropsTable(props) {
  const { componentProps, propDescriptions } = props;
  const t = useTranslate();
  const userLanguage = 'en';

  return (
    <table>
      <thead>
        <tr>
          <th align="left">{t('name')}</th>
          <th align="left">{t('type')}</th>
          <th align="left">{t('default')}</th>
          <th align="left">{t('description')}</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(componentProps).map(([propName, propData]) => {
          const typeDescription = propData.type.description || propData.type.name;
          const propDefault = propData.default || (propData.type.name === 'bool' && 'false');
          return (
            propData.description !== '@ignore' && (
              <tr key={propName}>
                <td align="left">
                  <span className={clsx('prop-name', propData.required ? 'required' : null)}>
                    {propName}
                    {propData.required ? <sup>*</sup> : null}
                  </span>
                </td>
                <td align="left">
                  {typeDescription.length > 20 ? (
                    <details className="prop-type">
                      <summary>{propData.type.name}</summary>
                      <span dangerouslySetInnerHTML={{ __html: typeDescription }} />
                    </details>
                  ) : (
                    <span
                      className="prop-type"
                      dangerouslySetInnerHTML={{ __html: typeDescription }}
                    />
                  )}
                </td>
                <td align="left">
                  {propDefault && <span className="prop-default">{propDefault}</span>}
                </td>
                <td
                  align="left"
                  dangerouslySetInnerHTML={{
                    __html: propDescriptions[userLanguage][propName] || '',
                  }}
                />
              </tr>
            )
          );
        })}
      </tbody>
    </table>
  );
}

PropsTable.propTypes = {
  componentProps: PropTypes.object.isRequired,
  propDescriptions: PropTypes.object.isRequired,
};

function ClassesTable(props) {
  const { componentName, componentStyles, classDescriptions } = props;
  const t = useTranslate();
  const userLanguage = 'en';

  return (
    <table>
      <thead>
        <tr>
          <th align="left">{t('ruleName')}</th>
          <th align="left">{t('globalClass')}</th>
          <th align="left">{t('description')}</th>
        </tr>
      </thead>
      <tbody>
        {componentStyles.classes.map((className) => (
          <tr key={className}>
            <td align="left">
              <span className="prop-name">{className}</span>
            </td>
            <td align="left">
              <span className="prop-name">
                .{componentStyles.globalClasses[className] || `Mui${componentName}-${className}`}
              </span>
            </td>
            <td
              align="left"
              dangerouslySetInnerHTML={{
                __html:
                  classDescriptions[userLanguage][className] &&
                  classDescriptions[userLanguage][className].description.replace(
                    /{{conditions}}/,
                    classDescriptions[userLanguage][className].conditions,
                  ),
              }}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

ClassesTable.propTypes = {
  classDescriptions: PropTypes.object.isRequired,
  componentName: PropTypes.string.isRequired,
  componentStyles: PropTypes.object.isRequired,
};

function getTransaltedHeader(t, header) {
  const translations = {
    import: t('import'),
    props: t('props'),
    inheritance: t('inheritance'),
    demos: t('demos'),
    css: 'CSS',
  };

  return translations[header] || header;
}

function Heading(props) {
  const { hash, level: Level = 'h2' } = props;
  const t = useTranslate();

  return (
    <Level>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */}
      <a className="anchor-link" id={hash} />
      {getTransaltedHeader(t, hash)}
      <a className="anchor-link-style" aria-hidden="true" aria-label="anchor" href={`#${hash}`}>
        <svg>
          <use xlinkHref="#anchor-link-icon" />
        </svg>
      </a>
    </Level>
  );
}

Heading.propTypes = {
  hash: PropTypes.string.isRequired,
  level: PropTypes.string,
};

function ApiDocs(props) {
  const { disableAd = false, disableToc = false, pageContent } = props;
  const t = useTranslate();
  const userLanguage = 'en';
  const {
    classDescriptions,
    componentDescription,
    demos,
    filename,
    forwardsRefTo,
    inheritance,
    name: componentName,
    propDescriptions,
    props: componentProps,
    spread,
    nonJSSComponent,
    styles: componentStyles,
  } = pageContent;

  const description = t('apiPageDescription').replace(/{{name}}/, componentName);

  const source = filename
    .replace(
      /\/packages\/material-ui(-(.+?))?\/src/,
      (match, dash, pkg) => `@material-ui/${pkg || 'core'}`,
    )
    // convert things like `/Table/Table.js` to ``
    .replace(/\/([^/]+)\/\1\.(js|tsx)$/, '');

  const sections = [
    'import',
    componentStyles.name && 'component-name',
    'props',
    componentStyles.classes && 'css',
    'demos',
  ];

  const toc = [];
  sections.forEach((sectionName) => {
    if (sectionName) {
      toc.push({
        text: getTransaltedHeader(t, sectionName),
        hash: sectionName,
        children: [
          ...(sectionName === 'props' && inheritance
            ? [{ text: t('inheritance'), hash: 'inheritance', children: [] }]
            : []),
        ],
      });
    }
  });

  // The `ref` is forwarded to the root element.
  let refHint = t('refRootElement');
  if (forwardsRefTo == null) {
    // The component cannot hold a ref.
    refHint = t('refNotHeld');
  }

  let spreadHint = '';
  if (spread) {
    // Any other props supplied will be provided to the root element ({{spreadHintElement}}).
    spreadHint = t('apiSpreadHint').replace(
      /{{spreadHintElement}}/,
      inheritance
        ? `<a href="${inheritance.pathname}">${inheritance.component}</a>`
        : t('nativeElement'),
    );
  }

  let inheritanceSuffix = '';
  if (inheritance && inheritance.component === 'Transition') {
    inheritanceSuffix = t('apiInheritanceSuffixTransition');
  }

  return (
    <TopLayoutDocsPages
      description={description}
      disableAd={disableAd}
      disableToc={disableToc}
      location={filename}
      title={`${componentName} API – Material-UI`}
      toc={toc}
    >
      <MarkdownElement>
        <h1>{componentName} API</h1>
        <Typography variant="h5" component="p" className="description" gutterBottom>
          {description}
        </Typography>
        <Heading hash="import" />
        <HighlightedCode
          code={`
import ${componentName} from '${source}/${componentName}';
// ${t('or')}
import { ${componentName} } from '${source}';`}
          language="jsx"
        />
        <span dangerouslySetInnerHTML={{ __html: t('apiImportDifference') }} />
        {componentDescription[userLanguage] && (
          <span dangerouslySetInnerHTML={{ __html: componentDescription[userLanguage] }} />
        )}
        {componentStyles.name && (
          <React.Fragment>
            <Heading hash="component-name" />
            <span
              dangerouslySetInnerHTML={{
                __html: t('apiStyleOverrides').replace(/{{styles\.name}}/, `Mui${componentName}`),
              }}
            />
          </React.Fragment>
        )}
        <Heading hash="props" />
        <PropsTable componentProps={componentProps} propDescriptions={propDescriptions} />
        <br />
        {refHint}
        <br />
        <span dangerouslySetInnerHTML={{ __html: spreadHint }} />
        {inheritance && (
          <React.Fragment>
            <Heading hash="inheritance" level="h3" />
            <span
              dangerouslySetInnerHTML={{
                __html: t('apiInheritanceDescription')
                  .replace(/{{component}}/, inheritance.component)
                  .replace(/{{pathname}}/, inheritance.pathname)
                  .replace(/{{suffix}}/, inheritanceSuffix)
                  .replace(/{{componentName}}/, componentName),
              }}
            />
          </React.Fragment>
        )}
        {componentStyles.classes ? (
          <React.Fragment>
            <Heading hash="css" />
            <ClassesTable
              componentName={componentName}
              componentStyles={componentStyles}
              classDescriptions={classDescriptions}
            />
            <br />
            <span dangerouslySetInnerHTML={{ __html: t('apiOverrideStyles') }} />
            {nonJSSComponent ? (
              <span dangerouslySetInnerHTML={{ __html: t('apiOverrideStylesStyledComponent') }} />
            ) : (
              <span
                dangerouslySetInnerHTML={{
                  __html: t('apiOverrideStylesJss').replace(
                    /{{URL}}/,
                    `${SOURCE_CODE_ROOT_URL}${filename}`,
                  ),
                }}
              />
            )}
          </React.Fragment>
        ) : null}
        <Heading hash="demos" />
        <span dangerouslySetInnerHTML={{ __html: demos }} />
      </MarkdownElement>
      <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <symbol id="anchor-link-icon" viewBox="0 0 16 16">
          <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z" />
        </symbol>
      </svg>
    </TopLayoutDocsPages>
  );
}

ApiDocs.propTypes = {
  disableAd: PropTypes.bool,
  disableToc: PropTypes.bool,
  pageContent: PropTypes.object.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  ApiDocs.propTypes = exactProp(ApiDocs.propTypes);
}

export default ApiDocs;
