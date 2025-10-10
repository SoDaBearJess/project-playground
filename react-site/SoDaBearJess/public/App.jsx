import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  // State to store the code content
  const [code, setCode] = useState("");
  // State to handle potential loading state
  const [isLoading, setIsLoading] = useState(false);
  // State to handle potential errors
  const [error, setError] = useState(null);

  if (isLoading) {
    return <p>Loading code...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <h1>Heading</h1>
      <div className="card">
        <p>
          Some included elements: Contact info, bio and photo, embeded source
          code if possible. Education and experience/awards, and ofc resume.
        </p>
        {/* <h1 className="font-fugaz-one">Heading</h1> */}

        <h1 className="font-dm-serif-display">Heading</h1>
        <p className="font-farsan">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <button>Button</button>
      </div>
    </>
  );
}

export default App;
