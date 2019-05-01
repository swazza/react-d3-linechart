import React from 'react';
import { select } from 'd3-selection';
import { axisBottom } from 'd3-axis';

interface Props {
  scaleX: any;
  vTransform: number;
}

export default class XAxis extends React.Component<Props> {
  private ref: React.RefObject<any>;

  constructor(props: Props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidUpdate() {
    const axis = axisBottom(this.props.scaleX);
    select(this.ref.current)
      .transition()
      .duration(750)
      .call(axis);
  }

  componentDidMount() {
    const axis = axisBottom(this.props.scaleX);
    select(this.ref.current).call(axis);
  }

  render() {
    return (
      <g ref={this.ref} transform={`translate(0, ${this.props.vTransform})`} />
    );
  }
}
