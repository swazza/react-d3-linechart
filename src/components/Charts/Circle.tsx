import React from 'react';
import { select } from 'd3-selection';
import Tooltip from './Tooltip';
import { Point } from './Model';

/**
 * Function representing the tooltip selector
 */
export type TooltipSelector = (datum: Point) => string;

interface Props {
  //**X-Coordinate of the Circle */
  cx: number;

  /**Y-Coordinate of the Circle */
  cy: number;

  /** Radius of the Circle */
  r: number;

  /**Data Point from the original Data Collection passed to the
   * Chart. This is required to derive information from the original data.
   */
  datum: Point;

  /**
   * A function that is used to derive the tooltip label for the X-Coordinate
   */
  tooltipX: TooltipSelector;

  /**
   * A function that is used to derive the tooltip label for the Y-Coordinate
   */
  tooltipY: TooltipSelector;
}

interface State {
  /**Flag controling display of tooltip. Flag is for duration of MouseHover. It is off on MouseExit */
  showTooltip: boolean;

  /**X-Coordinate of where the tooltip has to be displayed for the circle */
  tooltipCX: number;

  /**Y-Coordinate of where the tooltip has to be displayed for the circle */
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
      // Display tooltip to bottom right of the circle in a way that it does not overlap on the circle
      tooltipCX: x + 2 * this.props.r,
      tooltipCY: y + 2 * this.props.r
    });
  };

  onMouseLeave = () => {
    this.setState({ showTooltip: false });
  };

  componentDidUpdate() {
    const circle = select(this.ref.current);

    // Transitions the circle to new coordinates specified by props.cs & props.cy
    circle
      .transition()
      .duration(750)
      .attr('cx', this.props.cx)
      .attr('cy', this.props.cy);
  }

  componentDidMount() {
    const circle = select(this.ref.current);

    // Renders circle at coordinates specified by props.cx & props.cy
    // & transitions opacity from 0 (as specified in the JSX) to 1.
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
            cx={tooltipCX}
            cy={tooltipCY}
            x={tooltipX(datum)}
            y={tooltipY(datum)}
          />
        )}

        {/* {cx & cy - coordinates are intentionally not specified 
          as they need to be manipulated by d3 both during initial render and subsequent updates.} */}
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
