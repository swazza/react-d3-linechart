import React from 'react';
import ReactDOM from 'react-dom';

interface TooltipProps {
  /**Tooltip text that represents the X-value of the coordinate */
  x: string;

  /**Tooltip text that represents the Y-value of the coordinate */
  y: string;

  /**X Coordinate at which the tooltip will be displayed */
  cx: number;

  /**Y Coordinate at which the tooltip will be displayed */
  cy: number;
}

interface TooltipPortalProps {
  /**Children passed to the Tooltip component. No need to pass children explicitly via props.
   * Components that make up TooltipPortal's component tree will automatically be assigned to 'children'
   */
  children: React.ReactNode;
}

const TooltipPortal: React.FC<TooltipPortalProps> = ({ children }) =>
  ReactDOM.createPortal(children, document.querySelector(
    '#tooltip'
  ) as Element);

const Tooltip: React.FC<TooltipProps> = ({ x, y, cx, cy }) => (
  <TooltipPortal>
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
  </TooltipPortal>
);

export default Tooltip;
