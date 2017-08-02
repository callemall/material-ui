module.exports = {
  // So parent files don't get applied
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true,
  },
  extends: ['airbnb', 'plugin:import/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
  },
  plugins: ['babel', 'import', 'jsx-a11y', 'mocha', 'flowtype', 'material-ui', 'prettier', 'spellcheck'],
  settings: {
    'import/resolver': {
      webpack: {
        config: './docs/webpackBaseConfig.js',
      },
    },
  },
  rules: {
    'linebreak-style': 'off', // Don't play nicely with Windows.
    'arrow-body-style': 'off', // Not our taste?
    'arrow-parens': 'off', // Incompatible with prettier
    indent: 'off', // Incompatible with prettier
    'space-before-function-paren': 'off', // Incompatible with prettier
    'no-mixed-operators': 'off', // Incompatible with prettier
    'consistent-this': ['error', 'self'],
    'max-len': [
      'error',
      100,
      2,
      {
        ignoreUrls: true,
      },
    ], // airbnb is allowing some edge cases
    'no-console': 'error', // airbnb is using warn
    'no-alert': 'error', // airbnb is using warn
    'no-param-reassign': 'off', // Not our taste?
    'no-prototype-builtins': 'off', // airbnb use error
    'object-curly-spacing': 'off', // use babel plugin rule
    'no-restricted-properties': 'off', // To remove once react-docgen support ** operator.

    'babel/object-curly-spacing': ['error', 'always'],

    'import/unambiguous': 'off', // scripts
    'import/namespace': ['error', { allowComputed: true }],
    'import/no-extraneous-dependencies': 'off',

    'react/jsx-indent': 'off', // Incompatible with prettier
    'react/jsx-closing-bracket-location': 'off', // Incompatible with prettier
    'react/jsx-wrap-multilines': 'off', // Incompatible with prettier
    'react/jsx-indent-props': 'off', // Incompatible with prettier
    'react/jsx-handler-names': [
      'error',
      {
        // airbnb is disabling this rule
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
      },
    ],
    'react/require-default-props': 'off', // airbnb use error
    'react/forbid-prop-types': 'off', // airbnb use error
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }], // airbnb is using .jsx
    'react/no-danger': 'error', // airbnb is using warn
    'react/no-direct-mutation-state': 'error', // airbnb is disabling this rule
    'react/no-find-dom-node': 'off', // I don't know
    'react/no-unused-prop-types': 'off', // Is still buggy
    'react/sort-prop-types': 'error', // airbnb do nothing here.
    'react/sort-comp': [
      2,
      {
        order: [
          'type-annotations',
          'static-methods',
          'lifecycle',
          // '/^handle.+$/', // wishlist -- needs above first
          // '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/', // wishlist -- needs above first
          'everything-else',
          '/^render.+$/',
          'render',
        ],
      },
    ],

    'material-ui/docgen-ignore-before-comment': 'error',

    'mocha/handle-done-callback': 'error',
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-global-tests': 'error',
    'mocha/no-pending-tests': 'error',
    'mocha/no-skipped-tests': 'error',

    'flowtype/define-flow-type': 'error',
    'flowtype/require-valid-file-annotation': ['error', 'always'],
    'flowtype/require-parameter-type': 'off',
    'flowtype/require-return-type': 'off',
    'flowtype/space-after-type-colon': 'off',
    'flowtype/space-before-type-colon': 'off',
    'flowtype/type-id-match': 'off',
    'flowtype/use-flow-type': 'error',

    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 100,
        trailingComma: 'all',
      },
    ],

    'spellcheck/spell-checker': [1,
      {
        'comments': true,
        'strings': true,
        'identifiers': true,
        'lang': 'en_US',
        'skipWords': [
          '100vh',
          '100vw',
          '10px',
          '1kb',
          '1px',
          '3kb',
          '90vh',
          'acc',
          'activations',
          'alertdialog',
          'algolia',
          'amd',
          'antialiased',
          'Antialiasing',
          'argv',
          'Arial',
          'assistive',
          'autofill',
          'Autosuggest',
          'autosuggest',
          'bezier',
          'bg',
          'blockquote',
          'bluetooth',
          'bool',
          'brcast',
          'breakpoint',
          'browserstack',
          'calc',
          'cancelable',
          'cb',
          'ceil',
          'chai',
          'checkbox',
          'Checkbox',
          'Checkboxes',
          'childs',
          'chorizo',
          'classname',
          'classnames',
          'clickaway',
          'commonjs',
          'commonjs2',
          'cssinjs',
          'cx',
          'cy',
          'Dasharray',
          'Dashoffset',
          'dataset',
          'debounce',
          'deduplicate',
          'deepmerge',
          'delapouite',
          'Deletable',
          'deletable',
          'dep',
          'deps',
          'Deps',
          'describedby',
          'dev',
          'devtool',
          'Dialogs',
          'Dione',
          'Dll',
          'dll',
          'docgen',
          'Docgen',
          'Docsearch',
          'docsearch',
          'Dom',
          'dp',
          'dropdown',
          'ds',
          'durations',
          'enum',
          'esc',
          'facebook',
          'fffds',
          'fg',
          'firefox',
          'flowtype',
          'focusable',
          'foooooo',
          'fs',
          'fse',
          'func',
          'funcs',
          'funcs',
          'gfm',
          'gmail',
          'grey',
          'Helvetica',
          'Hidable',
          'hoc',
          'href',
          'hsl',
          'hsla',
          'idx',
          'Idx',
          'ie',
          'ie8',
          'inkbar',
          'instanceof',
          'javascript',
          'jpeg',
          'jpg',
          'jsdom',
          'jsnext',
          'jss',
          'jsx',
          'keycode',
          'Keydown',
          'keydown',
          'keyframes',
          'keylines',
          'keyup',
          'layouting',
          'len',
          'li',
          'lifecycles',
          'Lightbulb',
          'Linecap',
          'lodash',
          'lol',
          'lstat',
          'ltr',
          'Luminance',
          'md',
          'menuitem',
          'Middleware',
          'Minimist',
          'mkdirp',
          'monospace',
          'mousedown',
          'mouseup',
          'Moz',
          'mui',
          'multiline',
          'namespace',
          'nbsp',
          'Neue',
          'nev',
          'nowrap',
          'ns',
          'num',
          'ok',
          'okaidia',
          'ol',
          'os',
          'Osx',
          'Otakan',
          'Pageview',
          'Pageview',
          'Perf',
          'perf',
          'phantomjs',
          'piment',
          'pred',
          'prismjs',
          'progressbar',
          'Pyxis',
          'radiogroup',
          'readdir',
          'readdir',
          'Rect',
          'Rects',
          'redux',
          'referencial',
          'reflow',
          'remy',
          'Renderer',
          'renderer',
          'Rerender',
          'resize',
          'Rewriter',
          'rgb',
          'rimraf',
          'Roboto',
          'Roboto',
          'rosskevin',
          'rtl',
          'scrollable',
          'Scrollbar',
          'scroller',
          'Segoe',
          'sep',
          'singleline',
          'sinon',
          'Sinon',
          'sm',
          'Snackbar',
          'Snackbars',
          'snackbars',
          'splitregex',
          'stdout',
          'Stmt',
          'subdirs',
          'Subheader',
          'substring',
          'Subtree',
          'svg',
          'swipeable',
          'Swipeable',
          'tabindex',
          'tablist',
          'tappable',
          'tbody',
          'td',
          'textarea',
          'textareas',
          'textfield',
          'th',
          'thead',
          'theming',
          'tooltip',
          'touchstart',
          'travis',
          'typename',
          'ul',
          'umd',
          'uncheck',
          'Undocked',
          'unmount',
          'Unmount',
          'unmounting',
          'unrender',
          'unrendering',
          'utf8',
          'uxceo',
          'valuemax',
          'valuemin',
          'valuenow',
          'Vert',
          'viewports',
          'vrtest',
          'Vue',
          'webfontloader',
          'Webkit',
          'webpack',
          'webpack\'s',
          'Wifi',
          'wifi',
          'winston',
          'xl',
          'xml',
          'xs',
          'yargs',

          // own names
          // gulp plugin names, node package names etc.
          //
          'analytics',
          'atlassian',
          'autoprefixer',
          'cordova',
          'cssnano',
          'del', // gulp plugin name
          'eslint',
          'github',
          'gmap',
          'gmapgoogle', // in uiGmapgoogle package name
          'gulpfile',
          'htmlmin', // gulp plugin name
          'ionics',
          'ios',
          'iPad',
          'iPads',
          'iPod',
          'iPods',
          'istanbul',
          'lazypipe',
          'localforage',
          'lodash',
          'ng',
          'segmentio',
          'shelljs',
          'splashscreen', // a name of cordova plugin
          'streamqueue', // node package
          'touchspin',
          'uglify',
          'webdriver',


          //file extensions
          'css',
          'html',
          'html',
          'js',
          'jsonp',
          'md',
          'png',
          'scss',
          'tpl',


          // programming gibberish
          'addon',
          'addons',
          'arg',
          'args',
          'asc',
          'async',
          'atan',
          'attr',
          'attrs',
          'auth',
          'autocomplete',
          'autoincrement',
          'basename',
          'bcrypt',
          'broadcasted',
          'chainable',
          'cli',
          'clickability',
          'concat',
          'conf',
          'config',
          'configs',
          'const',
          'ctrl',
          'customizer',
          'deregister',
          'deregistered',
          'deregistering',
          'deregistrator',
          'deregistrators',
          'desc',
          'deserialization',
          'deserialize',
          'deserialized',
          'deserializes',
          'dest',
          'destructuring',
          'dev',
          'dir',
          'dirname',
          'dragend',
          'dragstart',
          'el',
          'elem',
          'elems',
          'env',
          'envs',
          'falsy',
          'filename',
          'fn',
          'fns',
          'formatters',
          'fulfillable',
          'fullscreen',
          'getter',
          'hostname',
          'http',
          'https',
          'img',
          'init',
          'initializer',
          'injectable',
          'instantiation',
          'iterable',
          'iteree',
          'laquo',
          'lib',
          'libs',
          'lifecycle',
          'linter',
          'linters',
          'metadata',
          'minified',
          'mixin',
          'mixins',
          'multiselect',
          'nav',
          'noop',
          'param',
          'params',
          'parsers',
          'polyfill',
          'polyfilled',
          'polyfills',
          'popup',
          'prefetch',
          'preload',
          'preloaded',
          'preprocess',
          'preprocessor',
          'preprocessors',
          'preselected',
          'programmatically',
          'proto',
          'px',
          'raquo',
          'reconfiguring',
          'refetch',
          'refetching',
          'ret',
          'rethrows',
          'rgba',
          'runtime',
          'sanitization',
          'serialize',
          'serializer',
          'sha',
          'shorthands',
          'sourcemap',
          'sourcemaps',
          'sqrt',
          'src',
          'stacktrace',
          'subdirectories',
          'subdirectory',
          'subunit',
          'subunits',
          'superset',
          'thanables',
          'thenable',
          'timeline',
          'timestamp',
          'tmp',
          'todo',
          'truthy',
          'typedef',
          'ui',
          'uncomment',
          'unfulfillable',
          'ungroup',
          'ungrouped',
          'unhandled',
          'uniq',
          'unwatch',
          'util',
          'utils',
          'uuid',
          'validator',
          'viewport',
          'webserver',
          'whitelist',
          'whitelisted',
          'www',
          'zindex',
          'api',
          'backend',
          'iso',
          'utc',


          // names provided by external source code dependencies or standard
          // library
          //
          'clusterer', // in Google Map options
          'cwd', // in node api
          'eq', // in jQuery#eq
          'expr', // in uiRouter stateRef.paramExpr
          'extname', // gulp-plugin-rename config option
          'lcov', // name of line coverage format
          'memoize', // in _.memoize
          'nobrowser', // ionic cli flag
          'prev', // in jQuery#prev
          'roadmap', // https://developers.google.com/maps/documentation/javascript/maptypes
          'scrollwheel', // in Google Map options
          'sref', // in [ui-sref]
          'starttag', // a config name in gulp-plugin-inject
          'stringify',  // in JSON.stringify
          'stylers', // https://developers.google.com/maps/documentation/javascript/styling#overview
          'substr', // in String#substr
          'thru',  // in _.thru
          'transclude', // in angular directive
          'transclusion', // in angular directive
          'unshift', // in Array#unshift


          // Moment.js date format strings
          'YYYY',
          'YY',
          'Y',
          'MM',
          'MMM',
          'MMMM',
          'D',
          'DD',
          'Do',
          'DDD',
          'DDDD',
          'HH',
          'MM',
          'gg',
          'gggg',
          'ww',
          'ss',
          'ss',
          'zz',


          // Lorem ipsum 1st sentence
          'Lorem',
          'ipsum',
          'dolor',
          'sit',
          'amet',
          'consectetur',
          'adipiscing',
          'elit',


          // Related to Google Maps
          //
          'coords', // South-east etc.
          'geocode',
          'geocoder',
          'geocoding',
          'geolocate',
          'geolocated',
          'geolocation',
          'geoposition',
          'lat',
          'lng',
          'ne',
          'nw',
          'se',
          'sublocality',
          'sw',

          // various
          'ness', // -ness suffix
          'pre', // pre- prefix
          'Na', // in NaN - NaN is mishandled by the plugin

          // tests
          'foo',
          'bar',
          'baz',
          'quux'
        ],
        'skipIfMatch': [
          'http(s)?://[^s]*',
          // Auxiliary werbs
          // see: https://github.com/aotaduy/eslint-plugin-spellcheck/issues/7
          '(\\s|^)\\w+\'t(\\s | $)',
          // ordinals
          // https://github.com/aotaduy/eslint-plugin-spellcheck/issues/8
          '(\\s|^|\\w+)\\d+(st|nd|rd|th)(\\s|[A-Z][a-zA-Z]+|$)',
          // pre/post prefixes both in kebab case and camel case
          '(\\s|^)(pre|post)([-\\w]|[A-Z])[a-zA-Z]+(\\s|$)',
          // mimetypes
          '^[-\\w]+\/[-\\w\\.]+$',
          // xml tags
          '<(?:\/)?[\\w-]+>',
          // cryptographic octal hashes
          '^[0-9a-f]{5,999}$',
          // hex colors
          '^#[0-9a-f]{3,6}$'
        ]
      }
    ]
  },
};
