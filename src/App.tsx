import React, { FormEvent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { scaleTime, scaleLinear } from 'd3-scale';
import Chart, { LineChart, ScatterPlot } from './components/Charts';
import { Point } from './components/Charts/contracts';
import './App.css';
import AddPointForm from './AddPointForm';
import { addPoint, fetchPoints } from './store/actions';

interface Props {
  data: Point[];
  addPoint: typeof addPoint;
  fetchPoints: typeof fetchPoints;
}

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchPoints();
  }

  render() {
    const { data, addPoint } = this.props;

    return (
      <main>
        <section className="add-point">
          <AddPointForm onSubmit={addPoint} />
        </section>
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
      </main>
    );
  }
}

const mapStateToProps = (state: any) => ({
  data: state.points
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ addPoint, fetchPoints }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
