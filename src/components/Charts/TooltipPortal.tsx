import React from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children: React.ReactNode;
}

const TooltipPortal: React.FC<Props> = ({ children }) =>
  ReactDOM.createPortal(children, document.querySelector(
    '#tooltip'
  ) as Element);

export default TooltipPortal;
