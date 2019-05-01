import { Point } from '../components/Charts/contracts';

export const fetchPoints = async () => {
  const response = await fetch('http://konuxdata.getsandbox.com/data');
  const json = await response.json();
  return json;
};

export const addPoint = async (point: Point) => {
  const response = await fetch('http://konuxdata.getsandbox.com/points', {
    method: 'POST',
    body: JSON.stringify(point)
  });

  const json = await response.json();
  return json;
};
