import { useState, useCallback, useMemo, useEffect } from "react";
import "./App.css";
import ExpensiveComponent from "./components/ExpensiveComponent";

// Expensive calculation to demonstrate useMemo
const calculateExpensiveValue = (num) => {
  // Simulate expensive operation
  let result = 0;
  for (let i = 0; i < 1000; i++) {
    result += num;
  }
  return result;
};

function App() {
  const [timer1, setTimer1] = useState(0);
  const [timer2, setTimer2] = useState(0);
  const [isRunning1, setIsRunning1] = useState(false);
  const [isRunning2, setIsRunning2] = useState(false);

  // Timer effects
  useEffect(() => {
    let interval;
    if (isRunning1) {
      interval = setInterval(() => {
        setTimer1((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning1]);

  useEffect(() => {
    let interval;
    if (isRunning2) {
      interval = setInterval(() => {
        setTimer2((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning2]);

  // useCallback example
  const handleClickWithCallback = useCallback(() => {
    setIsRunning1((current) => !current);
  }, []);

  // Regular function for comparison
  const handleClickNormal = () => {
    setIsRunning2((current) => !current);
  };

  // useMemo example
  const expensiveValue = useMemo(() => {
    return calculateExpensiveValue(timer1);
  }, [timer1]);

  return (
    <div className="container">
      <h1>React Performance Optimization Demo</h1>

      <div className="demo-section">
        <h2>useCallback Demo</h2>
        <ExpensiveComponent
          countLabel="Timer 1"
          count={timer1}
          onClick={handleClickWithCallback}
          label="Memoized Component"
          buttonText={isRunning1 ? "Stop" : "Start"}
        />
        <p>Using memoized callback</p>
      </div>

      <div className="demo-section">
        <h2>No useCallback Demo</h2>
        <ExpensiveComponent
          countLabel="Timer 2"
          count={timer2}
          onClick={handleClickNormal}
          label="Non-memoized Component"
          buttonText={isRunning2 ? "Stop" : "Start"}
        />
        <p>Using regular function</p>
      </div>

      <div className="demo-section">
        <h2>useMemo Demo</h2>
        <p>Expensive Calculation Result: {expensiveValue}</p>
        <p>The calculation only runs when Timer 1 changes</p>
      </div>
    </div>
  );
}

export default App;
