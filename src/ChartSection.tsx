import React from 'react';
import { connect } from 'react-redux';
import { scaleTime, scaleLinear } from 'd3-scale';
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
      scaleXFn={scaleTime}
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
