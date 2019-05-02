import React from 'react';
import * as d3 from 'd3';
import Tooltip from './Tooltip';
import { Point } from './contracts';

interface Props {
  cx: number;
  cy: number;
  r: number;
  datum: Point;
  tooltipX: any;
  tooltipY: any;
}

interface State {
  showTooltip: boolean;
  tooltipCX: number;
  tooltipCY: number;
}

export default class Circle extends React.Component<Props, State> {
  private ref: React.RefObject<any>;

  constructor(props: Props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      showTooltip: false,
      tooltipCX: 0,
      tooltipCY: 0
    };
  }

  onMouseOver = (e: any) => {
    const { x, y } = e.target.getBoundingClientRect();
    this.setState({
      showTooltip: true,
      tooltipCX: x,
      tooltipCY: y
    });
  };

  onMouseLeave = () => {
    this.setState({ showTooltip: false });
  };

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
    const { r, tooltipX, tooltipY, datum } = this.props;
    const { showTooltip, tooltipCX, tooltipCY } = this.state;
    return (
      <>
        {showTooltip && (
          <Tooltip
            cx={tooltipCX + 2 * r}
            cy={tooltipCY + 2 * r}
            x={tooltipX(datum)}
            y={tooltipY(datum)}
          />
        )}
        <circle
          ref={this.ref} // gets ref to the mounted DOMNode
          r={r} // radius
          fill="black" // fill circle with black color
          opacity={0} // initial opacity is 0. this attribute will be manipulated later by d3 in cDM & cDU lifecycles
          onMouseOver={this.onMouseOver}
          onMouseLeave={this.onMouseLeave}
        />
      </>
    );
  }
}
