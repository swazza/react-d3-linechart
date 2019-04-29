import React from 'react';
import * as d3 from 'd3';
import moment from 'moment';

const data = {
  values: [
    {
      x: '2018-04-19T12:45:03+00:00',
      y: 5
    },
    {
      x: '2018-04-19T13:45:03+01:00',
      y: 20
    },
    {
      x: '2018-04-20T12:45:03+04:00',
      y: 3
    },
    {
      x: '2018-04-18T10:45:03.123+00:00',
      y: -1
    }
  ]
};

data.values = data.values.sort(
  (d1, d2) => new Date(d1.x).getTime() - new Date(d2.x).getTime()
);

class LineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data.values
    };
    this.svgRef = React.createRef();
  }

  addDatapoint = () => {
    const point = {
      x: '2018-04-17T10:45:03.123+00:00',
      y: 7
    };

    const newData = [...this.state.data, point];
    newData.sort(
      (d1, d2) => new Date(d1.x).getTime() - new Date(d2.x).getTime()
    );

    this.setState({
      data: newData
    });
  };

  componentWillUpdate(props, state) {
    const { data } = state;
    const pxX = this.svg.attr('width');
    const pxY = this.svg.attr('height');
    const margin = 25;
    this.scX = d3
      .scaleTime()
      .domain(d3.extent(data.map(d => new Date(d.x))))
      .range([margin, pxX - margin]);

    this.scY = d3
      .scaleUtc()
      .domain(d3.extent(data.map(d => d.y)))
      .range([pxY - margin, margin]);

    const circles = this.svg.selectAll('circle').data(data, d => d.x);

    circles
      .transition()
      .duration(750)
      .attr('r', 5)
      .attr('cx', d => this.scX(new Date(d.x)))
      .attr('cy', d => this.scY(d.y))
      .attr('fill', 'black');

    circles
      .enter()
      .append('circle')
      .transition()
      .duration(750)
      .attr('r', 5)
      .attr('cx', d => this.scX(new Date(d.x)))
      .attr('cy', d => this.scY(d.y))
      .attr('fill', 'red');

    const lineGenerator = d3
      .line()
      .x(d => this.scX(new Date(d.x)))
      .y(d => this.scY(d.y))
      .curve(d3.curveNatural);

    this.svg
      .select('#line')
      .transition()
      .duration(750)
      .attr('d', lineGenerator(data));
  }

  componentDidMount() {
    this.svg = d3.select(this.svgRef.current);
    const pxX = this.svg.attr('width');
    const pxY = this.svg.attr('height');
    const margin = 25;
    const data = this.state.data;

    this.scX = d3
      .scaleTime()
      .domain(d3.extent(data.map(d => new Date(d.x))))
      .range([margin, pxX - margin]);

    this.scY = d3
      .scaleUtc()
      .domain(d3.extent(data.map(d => d.y)))
      .range([pxY - margin, margin]);

    this.svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('fill', 'black')
      .attr('cx', d => this.scX(new Date(d.x)))
      .attr('cy', d => this.scY(d.y));

    const lineGenerator = d3
      .line()
      .x(d => this.scX(new Date(d.x)))
      .y(d => this.scY(d.y))
      .curve(d3.curveNatural);

    this.svg
      .append('g')
      .append('path')
      .attr('id', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('d', lineGenerator(data));
  }

  render() {
    return (
      <>
        <button onClick={this.addDatapoint}>Add</button>
        <svg ref={this.svgRef} width="600" height="300" />
      </>
    );
  }
}

export default LineGraph;
