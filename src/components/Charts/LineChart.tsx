import React from 'react';
import { transition } from 'd3-transition';
import { line, curveLinear } from 'd3-shape';
import { Point } from './Model';

interface Props {
  /**
   * Original data that is passed to the containing Chart component
   */
  data?: Point[];

  /**
   * Scaled data derived from Original data by applying scale functions. Scaled data is
   * calculated in the containing Chart component and passed down to the LineChart
   */
  scaledData?: Point[];
}

/**
 * line function from d3-shapes that generates the SVG path string
 */
const lineGenerator = line()
  //@ts-ignore
  .x(d => d.x) // d -> datum from scaled data
  //@ts-ignore
  .y(d => d.y) // d -> datum from scaled data
  .curve(curveLinear);

export default class Line extends React.Component<Props> {
  private ref: React.RefObject<any>;
  constructor(props: Props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidUpdate() {
    const path = transition().select(() => this.ref.current); // selection on transition requires a function to be passed to it instead of the DOMNode
    path
      .transition()
      .duration(750)
      .attr('opacity', 1)
      // @ts-ignore
      .attr('d', lineGenerator(this.props.scaledData));
  }

  componentDidMount() {
    const path = transition().select(() => this.ref.current); // selection on transition requires a function to be passed to it instead of the DOMNode
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
