import React, { useState } from "react";

export interface ICounterProps {
  description: string;
  defaultCount: number;
}

const Counter = ({ defaultCount, description }: ICounterProps) => {
  const [count, setCount] = useState(defaultCount);
  const [incrementor, setIncrementor] = useState(1);

  return (
    <div>
      <h2>
        Description: {description} - DefaultCount: {defaultCount}
      </h2>

      <label htmlFor="Incrementor">
        Incrementor:{" "}
        <input
          type="number"
          id="Incrementor"
          value={incrementor}
          onChange={(e) => setIncrementor(parseInt(e.target.value) || 0)}
        />
      </label>

      <button
        aria-label="Decrement"
        onClick={() => setCount(count - incrementor)}
      >
        -
      </button>
      <span>Current Count: {count}</span>
      <button
        aria-label="Increment"
        onClick={() => setCount(count + incrementor)}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
