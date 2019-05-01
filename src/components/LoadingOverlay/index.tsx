import React from 'react';
import './Loading.css';

interface Props {
  isLoading: boolean;
}

const LoadingBars: React.FC = () => (
  <div className="loader">
    <div />
    <div />
    <div />
  </div>
);

const LoadingOverlay: React.FC<Props> = ({ isLoading }) =>
  !isLoading ? null : (
    <div
      style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        top: 0
      }}
    >
      <LoadingBars />
    </div>
  );

export default LoadingOverlay;
