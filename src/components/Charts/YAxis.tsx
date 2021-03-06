import React from 'react';
import { select } from 'd3-selection';
import { axisLeft } from 'd3-axis';

interface Props {
  scaleY: any;
  hTransform: number;
}

export default class YAxis extends React.Component<Props> {
  private ref: React.RefObject<any>;

  constructor(props: Props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidUpdate() {
    const axis = axisLeft(this.props.scaleY);
    select(this.ref.current)
      .transition()
      .duration(750)
      .call(axis);
  }

  componentDidMount() {
    const axis = axisLeft(this.props.scaleY);
    select(this.ref.current)
      .call(axis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('fill', 'black')
      .attr('y', -40)
      .attr('x', -150)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Value');
  }

  render() {
    return (
      <g
        ref={this.ref}
        transform={`translate(${this.props.hTransform + 20}, 0)`}
      />
    );
  }
}
