import pluginTester from 'babel-plugin-tester';
import * as path from 'path';
import materialUI from '../dist';

pluginTester({
  plugin: materialUI,
  pluginName: '@material-ui/babel-plugin-material-ui',
  endOfLine: 'preserve',
  fixtures: path.join(__dirname, '__fixtures__'),
  babelOptions: {
    root: __dirname,
    babelrc: false,
    configFile: false,
  },
});
