import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

const SIZE = 50; // same as CircularProgress
const circleAttr = {
  radius: SIZE / 2 - 5,
  originX: SIZE / 2,
  originY: SIZE / 2,
  strokeWidth: 5,
};

export const styles = () => ({
  root: {
    borderRadius: '50%',
  },
});

class RefreshIndicator extends React.Component {
  getPaddingSize() {
    return this.props.size * 0.14;
  }

  getPaperSize() {
    return this.props.size - this.getPaddingSize() * 2;
  }

  getArcDeg() {
    const p = Math.min(this.props.percentage, 100) / 100;
    const pOver100 = Math.max(0, (this.props.percentage - 100) / 100);

    const beginDeg = p * 120 + pOver100 * 410;
    const endDeg = p * 410 + pOver100 * 410;
    return [beginDeg, endDeg];
  }

  getFactor() {
    const p = Math.min(this.props.percentage, 100) / 100;
    const p1 = Math.min(1, p / 0.4);

    return p1;
  }

  getCircleStyle() {
    const isLoading = this.props.status === 'loading';
    const p1 = isLoading ? 1 : this.getFactor();
    const perimeter = Math.PI * 2 * circleAttr.radius;

    const [beginDeg, endDeg] = this.getArcDeg();
    const arcLen = (endDeg - beginDeg) * perimeter / 360;
    const dashOffset = -beginDeg * perimeter / 360;

    return {
      style: {
        strokeDasharray: `${arcLen}, ${perimeter - arcLen}`,
        strokeDashoffset: dashOffset,
        stroke:
          isLoading || this.props.percentage >= 100
            ? this.props.theme.palette[this.props.color].main
            : this.props.theme.palette.grey[300],
        strokeLinecap: 'round',
        opacity: p1,
        strokeWidth: circleAttr.strokeWidth * p1,
        fill: 'none',
      },
      attr: {
        cx: circleAttr.originX,
        cy: circleAttr.originY,
        r: circleAttr.radius,
      },
    };
  }

  getPolygonStyle() {
    const p1 = this.getFactor();

    const triangleCx = circleAttr.originX + circleAttr.radius;
    const triangleCy = circleAttr.originY;
    const dx = circleAttr.strokeWidth * 7 / 4 * p1;
    const trianglePath = `${triangleCx - dx},${triangleCy} ${triangleCx +
      dx},${triangleCy} ${triangleCx},${triangleCy + dx}`;

    const [, endDeg] = this.getArcDeg();

    return {
      style: {
        fill:
          this.props.percentage >= 100
            ? this.props.theme.palette[this.props.color].main
            : this.props.theme.palette.grey[300],
        transform: `rotate(${endDeg}deg)`,
        transformOrigin: `${circleAttr.originX}px ${circleAttr.originY}px`,
        opacity: p1,
      },
      attr: {
        points: trianglePath,
      },
    };
  }

  renderChildren() {
    const paperSize = this.getPaperSize();

    let childrenCmp = null;
    if (this.props.status !== 'ready') {
      childrenCmp = (
        <CircularProgress color={this.props.color} size={paperSize} thickness={3 * SIZE / 32} />
      );
    } else {
      const circleStyle = this.getCircleStyle(paperSize);
      const polygonStyle = this.getPolygonStyle(paperSize);
      childrenCmp = (
        <svg
          style={{
            width: paperSize,
            height: paperSize,
          }}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
        >
          <circle style={circleStyle.style} {...circleStyle.attr} />
          <polygon style={polygonStyle.style} {...polygonStyle.attr} />
        </svg>
      );
    }

    return childrenCmp;
  }

  render() {
    const {
      classes,
      className: classNameProp,
      color, // eslint-disable-line
      percentage,
      size,
      status,
      style,
      theme, // eslint-disable-line
      ...other
    } = this.props;

    return (
      <Paper
        className={classNames(classes.root, classNameProp)}
        style={{ width: size, height: size, padding: this.getPaddingSize(), ...style }}
        {...other}
      >
        {this.renderChildren()}
      </Paper>
    );
  }
}

RefreshIndicator.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['primary', 'secondary']),
  /**
   * The confirmation progress to fetch data. Max value is 100.
   */
  percentage: PropTypes.number,
  /**
   * Size in pixels.
   */
  size: PropTypes.number,
  /**
   * The display status of the indicator. If the status is "ready", the indicator will display the
   * ready state arrow. If the status is "loading", it will display the loading progress indicator.
   * If the status is "hide", the indicator will be hidden.
   */
  status: PropTypes.oneOf(['ready', 'loading', 'hide']),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,
};

RefreshIndicator.defaultProps = {
  color: 'secondary',
  percentage: 0,
  size: 40,
  status: 'hide',
};

export default withStyles(styles, { name: 'MuiRefreshIndicator', withTheme: true })(
  RefreshIndicator,
);
