import { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import StaticChild from './StaticChild';

const ExpensiveComponent = memo(
  ({ onClick, count, countLabel, buttonText }) => {
    const renderCount = useRef(0);
    renderCount.current += 1;

    return (
      <div className="demo-box">
        <h3>Memoized Component</h3>
        <p>
          {countLabel}: {count}
        </p>
        <p>Render count: {renderCount.current}</p>
        <button onClick={onClick}>{buttonText}</button>
        <StaticChild />
      </div>
    );
  }
);

ExpensiveComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  countLabel: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

ExpensiveComponent.displayName = 'ExpensiveComponent';

export default ExpensiveComponent;
