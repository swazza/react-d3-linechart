import React from 'react';
import { scaleTime, scaleLinear } from 'd3-scale';
import Chart, { LineChart, ScatterPlot } from './components/Charts';
import { Point } from './components/Charts/contracts';

interface Props {
  data: Point[];
}

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  add = () => {
    const p = {
      x: '2018-04-17T12:45:03+04:00',
      y: 15
    };

    const newData = [...this.state.data, p].sort(
      (d1, d2) => new Date(d1.x).getTime() - new Date(d2.x).getTime()
    );
    this.setState({ data: newData });
  };

  render() {
    const { data } = this.state;

    return (
      <>
        <button onClick={this.add}>Add</button>
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
  }
}

export default App;
