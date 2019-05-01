import React from 'react';
import Circle from './Circle';
import { Point } from './contracts';

interface Props {
  data?: Point[];
}

const ScatterPlot: React.FC<Props> = ({ data = [] }) => (
  <g>
    {data.map((datum, index) => (
      <Circle key={index} r={5} cx={datum.x} cy={datum.y} />
    ))}
  </g>
);

export default ScatterPlot;
