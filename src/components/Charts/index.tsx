import React from 'react';
import { extent } from 'd3-array';
import { Point } from './contracts';
import _LineChart from './LineChart';
import _ScatterPlot from './ScatterPlot';

interface Props {
  data: Point[];
  height: number;
  width: number;
  selectorX: any;
  selectorY: any;
  scaleXFn: any;
  scaleYFn: any;
  children: React.ReactNode;
}

class Chart extends React.PureComponent<Props> {
  getScaledDataFromProps(props: Props) {
    const { data, scaleXFn, scaleYFn, selectorX, selectorY } = props;

    const domainX = extent(data.map(datum => selectorX(datum)));
    const domainY = extent(data.map(datum => selectorY(datum)));
    const rangeX = [20, this.props.width - 20];
    const rangeY = [this.props.height - 20, 20];
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

    return scaledData;
  }

  render() {
    const { height, width, children } = this.props;
    const scaledData = this.getScaledDataFromProps(this.props);

    return (
      <>
        <svg height={height.toString()} width={width.toString()}>
          {React.Children.map(children, child =>
            React.cloneElement(child as React.ReactElement<any>, {
              data: scaledData
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
