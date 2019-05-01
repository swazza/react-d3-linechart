import { Point } from '../components/Charts/contracts';

export const fetchPoints = async () => {
  try {
    const response = await fetch('http://konuxdata.getsandbox.com/data');
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addPoint = async (point: Point) => {
  try {
    const response = await fetch('http://konuxdata.getsandbox.com/points', {
      method: 'POST',
      body: JSON.stringify(point)
    });

    const json = await response.json();
    if (json.status !== 'ok') {
      throw 'Error saving point.';
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
