import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const data = [
  {
    x: '2018-04-19T12:45:03+00:00',
    y: 5
  },
  {
    x: '2018-04-19T13:45:03+01:00',
    y: 20
  },
  {
    x: '2018-04-20T12:45:03+04:00',
    y: 3
  },
  {
    x: '2018-04-18T10:45:03.123+00:00',
    y: -1
  }
];

data.sort((d1, d2) => new Date(d1.x).getTime() - new Date(d2.x).getTime());

ReactDOM.render(<App data={data} />, document.getElementById('root'));
