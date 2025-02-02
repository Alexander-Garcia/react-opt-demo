import { useRef } from 'react';

const StaticChild = () => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="static-child">
      <p>I am a component with no props or state</p>
      <p>Render count: {renderCount.current}</p>
    </div>
  );
};

export default StaticChild;
