import React from 'react';
import * as d3 from 'd3';
import { Point } from './contracts';

interface Props {
  data?: Point[];
  scaledData?: Point[];
}

const lineGenerator = d3
  .line()
  //@ts-ignore
  .x(d => d.x)
  //@ts-ignore
  .y(d => d.y)
  .curve(d3.curveCardinal);

export default class Line extends React.Component<Props> {
  private ref: React.RefObject<any>;
  constructor(props: Props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidUpdate() {
    const path = d3.select(this.ref.current);
    path
      .transition()
      .duration(750)
      .attr('opacity', 1)
      // @ts-ignore
      .attr('d', lineGenerator(this.props.scaledData));
  }

  componentDidMount() {
    const path = d3.select(this.ref.current);
    path
      // @ts-ignore
      .attr('d', lineGenerator(this.props.scaledData))
      .transition()
      .duration(750)
      .attr('opacity', 1);
  }

  render() {
    return (
      <g>
        <path
          ref={this.ref} // Mounted DOMNode ref
          fill="none"
          stroke="black"
          opacity={0} // Initial opacity is set to 0. Subsequent values of this attribute will be modified by d3 (not React)
        />
      </g>
    );
  }
}
