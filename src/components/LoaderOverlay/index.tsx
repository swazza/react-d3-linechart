import React from 'react';
import './Loader.css';

interface Props {
  isLoading: boolean;
}

const LoaderBars: React.FC = () => (
  <div className="loader">
    <div />
    <div />
    <div />
  </div>
);

const LoaderOverlay: React.FC<Props> = ({ isLoading }) =>
  !isLoading ? null : (
    <div className="loader-container">
      <LoaderBars />
    </div>
  );

export default LoaderOverlay;
