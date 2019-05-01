import React from 'react';
import { connect } from 'react-redux';
import { scaleUtc, scaleLinear } from 'd3-scale';
import moment from 'moment-timezone';
import { Point } from './components/Charts/contracts';
import LoadingOverlay from './components/LoadingOverlay';
import { Store } from './store';
import Chart, { LineChart, ScatterPlot } from './components/Charts';

interface Props {
  data: Point[];
  isFetchingPoints: boolean;
  fetchError: string;
}

const ChartSection: React.FC<Props> = ({
  data,
  isFetchingPoints,
  fetchError
}) => (
  <>
    <span style={{ color: 'red', fontSize: '0.8em' }}>{fetchError}</span>
    <LoadingOverlay isLoading={isFetchingPoints} />
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
