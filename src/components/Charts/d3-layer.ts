import { scaleLinear, scaleTime } from 'd3-scale';
import { extent } from 'd3-array';
import { Point } from './contracts';

export const scaleX = (
  data: Point[],
  chartWidth: number,
  chartHeight: number
) => (date: String) =>
  scaleTime()
    // @ts-ignore
    .domain(extent(data.map(d => new Date(d.x))))
    .range([]);
