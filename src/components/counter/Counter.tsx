import React, { useEffect, useState } from "react";

export interface ICounterProps {
  description: string;
  defaultCount: number;
}

const Counter = ({ defaultCount, description }: ICounterProps) => {
  const [count, setCount] = useState(defaultCount);
  const [incrementor, setIncrementor] = useState(1);
  const [loading, setLoading] = useState(defaultCount >= 15);

  useEffect(() => {
    let time: NodeJS.Timeout;
    if (count >= 15) {
      time = setTimeout(() => setLoading(true), 300);
    }

    return () => clearTimeout(time);
  }, [count]);
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
          onChange={(e) => setIncrementor(parseInt(e.target.value) || 1)}
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
        onClick={() => setTimeout(() => setCount(count + incrementor), 200)}
      >
        +
      </button>

      {!loading && <div>Some Data</div>}
    </div>
  );
};

export default Counter;
