import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import TestComponent from "./TestComponent";

function App() {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <TestComponent name={"Jamo"}></TestComponent>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          Check out the count: <span style={{color: 'cyan'}}>{ count }</span>
        </p>
        <button onClick={increaseCount}>Click</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

