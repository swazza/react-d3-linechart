import React from 'react';

interface Props {
  x: string;
  y: string;
  cx: number;
  cy: number;
}

const Tooltip: React.FC<Props> = ({ x, y, cx, cy }) => (
  <div
    style={{
      border: '1px solid black',
      backgroundColor: 'lightyellow',
      height: '50px',
      width: '250px',
      position: 'fixed',
      top: `${cy}px`,
      left: `${cx}px`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingLeft: '5px',
      fontSize: '0.8em'
    }}
  >
    <span>{`X: ${x}`}</span>
    <span>{`Y: ${y}`}</span>
  </div>
);

export default Tooltip;
