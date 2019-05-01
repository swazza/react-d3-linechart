import React from 'react';
import Circle from './Circle';
import { Point } from './contracts';

interface Props {
  data?: Point[];
  scaledData?: Point[];
  tooltipX?: any;
  tooltipY?: any;
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
        tooltipX={tooltipX}
        tooltipY={tooltipY}
      />
    ))}
  </g>
);

export default ScatterPlot;
