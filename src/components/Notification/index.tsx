import React from 'react';
import ReactDOM from 'react-dom';

interface NotificationProps {
  message: string;
}

interface NotificationPortalProps {
  children: React.ReactNode;
}

const Notification: React.FC<NotificationProps> = ({ message }) => (
  <NotificationPortal>
    <span>{message}</span>
  </NotificationPortal>
);

const NotificationPortal: React.FC<NotificationPortalProps> = ({ children }) =>
  ReactDOM.createPortal(
    <div style={{ position: 'absolute', top: '5px', left: '50%' }}>
      {children}
    </div>,
    //@ts-ignore
    document.querySelector('#notification')
  );

export default Notification;
