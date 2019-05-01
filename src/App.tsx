import React, { FormEvent } from 'react';
import { scaleTime, scaleLinear } from 'd3-scale';
import Chart, { LineChart, ScatterPlot } from './components/Charts';
import Button from './components/Button';
import Input from './components/Input';
import { Point } from './components/Charts/contracts';
import './App.css';
import AddPointForm from './AddPointForm';

interface Props {
  data: Point[];
}

interface State {
  data: Point[];
  newX: string;
  newY: string;
}

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  onNewPoint = (newPoint: Point) => {
    this.setState({
      data: [...this.state.data, newPoint].sort(
        (d1, d2) => new Date(d1.x).getTime() - new Date(d2.x).getTime()
      )
    });
  };

  render() {
    const { data } = this.state;

    return (
      <main>
        <section className="add-point">
          <AddPointForm onSubmit={this.onNewPoint} />
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

export default App;
