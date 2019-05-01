import React from 'react';
import * as d3 from 'd3';

interface Props {
  cx: number;
  cy: number;
  r: number;
}

export default class Circle extends React.Component<Props> {
  private ref: React.RefObject<any>;

  constructor(props: Props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidUpdate() {
    const circle = d3.select(this.ref.current);
    circle
      .transition()
      .duration(750)
      .attr('cx', this.props.cx)
      .attr('cy', this.props.cy);
  }

  componentDidMount() {
    const circle = d3.select(this.ref.current);
    circle
      .attr('cx', this.props.cx)
      .attr('cy', this.props.cy)
      .transition()
      .duration(750)
      .attr('opacity', 1);
  }

  render() {
    const { r } = this.props;
    return (
      // cx & cy attributes not specified intentionally as they will be manipulated by d3 for transitions
      <circle
        ref={this.ref} // gets ref to the mounted DOMNode
        r={r} // radius
        fill="black" // fill circle with black color
        opacity={0} // initial opacity is 0. this attribute will be manipulated later by d3 in cDM & cDU lifecycles
      />
    );
  }
}
