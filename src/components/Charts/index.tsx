import React from 'react';
import { extent } from 'd3-array';
import { Point } from './Model';
import XAxis from './XAxis';
import YAxis from './YAxis';
import _LineChart from './LineChart';
import _ScatterPlot from './ScatterPlot';

interface Props {
  /**
   * Data to display on the chart
   */
  data: Point[];

  /**
   * Height of the chart. (Maps to svg height)
   */
  height: number;

  /**
   * Width of the chart. (Maps to svg width)
   */
  width: number;

  /**
   * Selector function that returns the prop on the datum to be used as X-Coordinate
   */
  selectorX: any;

  /**
   * Selector function that returns the prop on the datum to be used as Y-Coordinate
   */
  selectorY: any;

  /**
   * A D3 scale function used for scaling on the X-Axis
   */
  scaleXFn: any;

  /**
   * A D3 scale function used for scaling on the A-Axis
   */
  scaleYFn: any;

  /**
   * A tooltip selector function used to derive tooltip label from datum for X-Coordinate
   */
  tooltipX: any;

  /**
   * A tooltip selector function used to derive tooltip label from datum for Y-Coordinate
   */
  tooltipY: any;

  /**
   * Children to the Chart component. No need to set this property directly as the components that make up
   * the component tree for the Chart component are set to this property by default.
   */
  children: React.ReactNode;
}

class Chart extends React.PureComponent<Props> {
  getScaledDataFromProps(props: Props) {
    const { data, scaleXFn, scaleYFn, selectorX, selectorY } = props;

    const domainX = extent(data.map(datum => selectorX(datum)));
    const domainY = extent(data.map(datum => selectorY(datum)));
    const rangeX = [40, this.props.width - 40];
    const rangeY = [this.props.height - 40, 40];
    const scaleX = scaleXFn()
      .domain(domainX)
      .range(rangeX);
    const scaleY = scaleYFn()
      .domain(domainY)
      .range(rangeY);

    const scaledData = data.map(datum => ({
      x: scaleX(selectorX(datum)),
      y: scaleY(selectorY(datum))
    }));

    return { scaledData, scaleX, scaleY };
  }

  render() {
    const { data, height, width, children, tooltipX, tooltipY } = this.props;
    const { scaledData, scaleX, scaleY } = this.getScaledDataFromProps(
      this.props
    );

    return (
      <>
        <svg height={height.toString()} width={width.toString()}>
          <XAxis scaleX={scaleX} vTransform={height - 20} />
          <YAxis scaleY={scaleY} hTransform={20} />
          {React.Children.map(children, child =>
            React.cloneElement(child as React.ReactElement<any>, {
              // inject the below properties into the child elements at runtime
              data,
              scaledData,
              tooltipX,
              tooltipY
            })
          )}
        </svg>
      </>
    );
  }
}

export default Chart;
export const LineChart = _LineChart;
export const ScatterPlot = _ScatterPlot;
