import React from 'react';
import { connect } from 'react-redux';
import { scaleUtc, scaleLinear } from 'd3-scale';
import moment from 'moment-timezone';
import { Point } from './components/Charts/Model';
import LoaderOverlay from './components/LoaderOverlay';
import { Store } from './store';
import Chart, { LineChart, ScatterPlot } from './components/Charts';

interface Props {
  /**
   * Data needs to be displayed on the chart
   */
  data: Point[];

  /**
   * Flag indicates if data is being fetched. If true, will display a LoaderOverlay on top of Chart. If false,
   * will display the Chart.
   */
  isFetchingPoints: boolean;

  /**
   * A non-empty string indicates an erro while fetching the data. Any error message will
   * be displayed on top of the chart.
   */
  fetchError: string;
}

const ChartSection: React.FC<Props> = ({
  data,
  isFetchingPoints,
  fetchError
}) => (
  <>
    <span style={{ color: 'red', fontSize: '0.8em' }}>{fetchError}</span>
    <LoaderOverlay isLoading={isFetchingPoints} />
    <Chart
      width={600}
      height={300}
      data={data}
      selectorX={(d: any) => new Date(d.x).getTime()}
      selectorY={(d: any) => d.y}
      tooltipX={(d: any) =>
        moment(d.x)
          .tz('UTC') // This ensures that time on tooltip is displayed in UTC time (not local time)
          .format('Do MMM, YYYYTHH:mm:ss.sss')
      }
      tooltipY={(d: any) => d.y}
      scaleXFn={scaleUtc}
      scaleYFn={scaleLinear}
    >
      <LineChart />
      <ScatterPlot />
    </Chart>
  </>
);

const mapStateToProps = (state: Store): Props => ({
  data: state.points,
  isFetchingPoints: state.isFetchingPoints,
  fetchError: state.fetchError
});

export default connect(mapStateToProps)(ChartSection);
