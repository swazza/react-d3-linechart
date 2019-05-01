import React from 'react';
import { extent } from 'd3-array';
import { Point } from './contracts';
import XAxis from './XAxis';
import YAxis from './YAxis';
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
  tooltipX: any;
  tooltipY: any;
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
