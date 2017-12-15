import React from 'react';
import { spy } from 'sinon';
import { assert } from 'chai';
import JssProvider from 'react-jss/lib/JssProvider';
import { create, SheetsRegistry } from 'jss';
import withStyles, { preset } from './withStyles';
import MuiThemeProvider from './MuiThemeProvider';
import createMuiTheme from './createMuiTheme';
import createGenerateClassName from './createGenerateClassName';
import { createMount, getClasses } from '../test-utils';
import consoleErrorMock from '../../test/utils/consoleErrorMock';

// eslint-disable-next-line react/prefer-stateless-function
class Empty extends React.Component {
  render() {
    return <div />;
  }
}

describe('withStyles', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('props', () => {
    let StyledComponent1;
    let classes;

    before(() => {
      const styles = { root: { display: 'flex' } };
      StyledComponent1 = withStyles(styles, { name: 'MuiEmptyField' })(Empty);
      classes = getClasses(<StyledComponent1 />);
    });

    it('should provide a classes property', () => {
      mount(<StyledComponent1 />); // attempt to grow sheet count - shouldn't change classes
      mount(<StyledComponent1 />);
      mount(<StyledComponent1 />);
      const wrapper = mount(<StyledComponent1 />).find('Empty');
      assert.deepEqual(wrapper.props().classes, classes, 'Should provide the classes property');
    });

    describe('prop: classes', () => {
      before(() => {
        consoleErrorMock.spy();
      });

      after(() => {
        consoleErrorMock.reset();
      });

      it('should accept a classes property', () => {
        const wrapper = mount(<StyledComponent1 classes={{ root: 'h1' }} />).find('Empty');
        assert.deepEqual(wrapper.props().classes, { root: `${classes.root} h1` });
        assert.strictEqual(consoleErrorMock.callCount(), 0);
      });

      it('should ignore undefined property', () => {
        const wrapper = mount(<StyledComponent1 classes={{ root: undefined }} />).find('Empty');
        assert.deepEqual(wrapper.props().classes, { root: `${classes.root}` });
        assert.strictEqual(consoleErrorMock.callCount(), 0);
      });

      it('should warn if providing a unknown key', () => {
        const wrapper = mount(<StyledComponent1 classes={{ bar: 'foo' }} />).find('Empty');

        assert.deepEqual(wrapper.props().classes, { root: classes.root, bar: 'undefined foo' });
        assert.strictEqual(consoleErrorMock.callCount(), 1);
        assert.match(
          consoleErrorMock.args()[0][0],
          /Material-UI: the key `bar` provided to the classes property is not implemented/,
        );
      });

      it('should warn if providing a non string', () => {
        const wrapper = mount(<StyledComponent1 classes={{ root: {} }} />).find('Empty');

        assert.deepEqual(wrapper.props().classes, { root: `${classes.root} [object Object]` });
        assert.strictEqual(consoleErrorMock.callCount(), 2);
        assert.match(
          consoleErrorMock.args()[1][0],
          /Material-UI: the key `root` provided to the classes property is not valid/,
        );
      });

      it('should recycle the object between two render if possible', () => {
        const wrapper = mount(<StyledComponent1 />).find('Empty');
        const classes1 = wrapper.find(Empty).props().classes;
        wrapper.update();
        const classes2 = wrapper.find(Empty).props().classes;
        assert.strictEqual(classes1, classes2);
      });
    });

    describe('prop: ref', () => {
      it('should provide a ref on the inner component', () => {
        const handleRef = spy();
        mount(<StyledComponent1 ref={handleRef} />).find('Empty');
        assert.strictEqual(handleRef.callCount, 1);
      });
    });
  });

  describe('mount', () => {
    let sheetsRegistry;
    let jss;

    beforeEach(() => {
      jss = create(preset());
      jss.options.createGenerateClassName = createGenerateClassName;
      sheetsRegistry = new SheetsRegistry();
    });

    it('should run lifecycles with no theme', () => {
      const styles = { root: { display: 'flex' } };
      const StyledComponent = withStyles(styles)(Empty);

      const wrapper = mount(
        <MuiThemeProvider theme={createMuiTheme()}>
          <JssProvider registry={sheetsRegistry} jss={jss}>
            <StyledComponent />
          </JssProvider>
        </MuiThemeProvider>,
      );
      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'Empty-root-1' });
      wrapper.update();
      assert.strictEqual(sheetsRegistry.registry.length, 1, 'should only attach once');
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'Empty-root-1' });
      wrapper.setProps({ theme: createMuiTheme() });
      assert.strictEqual(sheetsRegistry.registry.length, 1, 'should only attach once');
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'Empty-root-1' });

      wrapper.unmount();
      assert.strictEqual(sheetsRegistry.registry.length, 0);
    });

    it('should work when depending on a theme', () => {
      const styles = theme => ({ root: { padding: theme.spacing.unit } });
      const StyledComponent = withStyles(styles, { name: 'MuiEmptyField' })(Empty);

      const wrapper = mount(
        <MuiThemeProvider theme={createMuiTheme()}>
          <JssProvider registry={sheetsRegistry} jss={jss}>
            <StyledComponent />
          </JssProvider>
        </MuiThemeProvider>,
      );
      assert.strictEqual(sheetsRegistry.registry.length, 1, 'should only attach once');
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'MuiEmptyField-root-1' });
      wrapper.setProps({ theme: createMuiTheme() });
      assert.strictEqual(sheetsRegistry.registry.length, 1, 'should only attach once');
      assert.deepEqual(sheetsRegistry.registry[0].classes, { root: 'MuiEmptyField-root-2' });
    });

    it('should support the overrides key', () => {
      const styles = { root: { padding: 8 } };
      const StyledComponent = withStyles(styles, { name: 'MuiEmptyField' })(Empty);

      mount(
        <MuiThemeProvider
          theme={createMuiTheme({
            overrides: {
              MuiEmptyField: {
                root: {
                  padding: 9,
                },
              },
            },
          })}
        >
          <JssProvider registry={sheetsRegistry} jss={jss}>
            <StyledComponent />
          </JssProvider>
        </MuiThemeProvider>,
      );

      assert.strictEqual(sheetsRegistry.registry.length, 1, 'should only attach once');
      assert.deepEqual(sheetsRegistry.registry[0].rules.raw, { root: { padding: 9 } });
    });

    describe('options: disableStylesGeneration', () => {
      it('should not generate the styles', () => {
        const styles = { root: { display: 'flex' } };
        const StyledComponent = withStyles(styles)(Empty);

        const wrapper = mount(
          <MuiThemeProvider theme={createMuiTheme()} disableStylesGeneration>
            <JssProvider registry={sheetsRegistry} jss={jss}>
              <StyledComponent />
            </JssProvider>
          </MuiThemeProvider>,
        );
        assert.strictEqual(sheetsRegistry.registry.length, 0);
        assert.deepEqual(wrapper.find(Empty).props().classes, {});
        wrapper.unmount();
        assert.strictEqual(sheetsRegistry.registry.length, 0);
      });
    });
  });

  describe('HMR with same state', () => {
    it('should take the new stylesCreator into account', () => {
      const styles1 = { root: { padding: 1 } };
      const StyledComponent1 = withStyles(styles1, { name: 'MuiEmptyField' })(Empty);
      const wrapper = mount(<StyledComponent1 />).find('Empty');

      const styles2 = { root: { padding: 2 } };
      const StyledComponent2 = withStyles(styles2, { name: 'MuiEmptyField' })(Empty);

      // Simulate react-hot-loader behavior
      wrapper.instance().componentWillReceiveProps =
        StyledComponent2.prototype.componentWillReceiveProps;

      const classes1 = wrapper.props().classes.root;
      wrapper.setProps({});
      const classes2 = wrapper.props().classes.root;

      assert.notStrictEqual(classes1, classes2, 'should generate new classes');
    });
  });
});
