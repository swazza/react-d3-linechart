import React from 'react';
import Circle, { TooltipSelector } from './Circle';
import { Point } from './Model';

/**
 * Contains optional properties that are expected to be injected by the containing
 * Chart component at runtime
 */
interface Props {
  /**
   * Original data that is passed to the containing Chart component.
   */
  data?: Point[];

  /**
   * Scaled data derived from Original data by applying scale functions. Scaled data is
   * calculated in the containing Chart component and passed down to the LineChart
   */
  scaledData?: Point[];

  /**
   * Selector function for X-coordinate tooltip label
   */
  tooltipX?: TooltipSelector;

  /**
   * Selector function for Y-Coordinate tooltip label
   */
  tooltipY?: TooltipSelector;
}

const ScatterPlot: React.FC<Props> = ({
  data = [],
  scaledData = [],
  tooltipX,
  tooltipY
}) => (
  <g>
    {scaledData.map((datum, index) => (
      <Circle
        key={index}
        r={5}
        cx={datum.x}
        cy={datum.y}
        datum={data[index]}
        tooltipX={tooltipX as TooltipSelector}
        tooltipY={tooltipY as TooltipSelector}
      />
    ))}
  </g>
);

export default ScatterPlot;
