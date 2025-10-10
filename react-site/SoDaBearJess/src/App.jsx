import { useState, useEffect } from "react";
import "./App.css";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";

function App() {
  SyntaxHighlighter.registerLanguage("jsx", jsx);
  const [count, setCount] = useState(0);

  // State to store the code content
  const [code, setCode] = useState("");
  // State to handle potential loading state
  const [isLoading, setIsLoading] = useState(true);
  // State to handle potential errors
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an async function to handle the fetch call
    const fetchCode = async () => {
      try {
        const response = await fetch("/App.jsx"); // Use the public path to your file
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        setCode(text);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCode();
  }, []); // The empty dependency array ensures this effect runs only once

  if (isLoading) {
    return <p>Loading code...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const customStyle = {
    lineHeight: "1",
    fontSize: ".8rem",
    borderRadius: "5px",
  };

  return (
    <>
      <h1>Jessna Rodriguez</h1>
      <div className="card">
        <p>
          Some included elements: Contact info, bio and photo, embeded source
          code if possible. Education and experience/awards, and ofc resume.
        </p>
        {/* <h1 className="font-fugaz-one">Heading</h1> */}

        <h1 className="font-dm-serif-display">Jessna Rodriguez</h1>
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
        <div
          style={{
            width: "60vw",
            height: "50vh",
            overflow: "auto",
            margin: "0 auto",
          }}
        >
          <SyntaxHighlighter
            language="jsx"
            style={oneDark}
            customStyle={customStyle}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </>
  );
}

export default App;
