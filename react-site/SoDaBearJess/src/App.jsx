import { useState, useEffect } from "react";
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
          Some included elements: Contact info, bio and photo, embedded source
          code if possible. Education and experience/awards, and ofc resume.
        </p>
        {/* <h1 className="font-fugaz-one">Heading</h1> */}

        <h1
          className="font-dm-serif-display"
          style={{ color: "var(--secondary-color)" }}
        >
          raspberry
        </h1>
        <p className="font-farsan">
          Some included elements: Contact info, bio and photo, embedded source
          code if possible. Education and experience/awards, and ofc resume.
        </p>
        <div className="polaroid-container">
          <div className="polaroid-frame rotate-right">
            <div className="polaroid-image">
              <img
                src="/vite.svg"
                className="polaroid-image"
                alt="Polaroid Image"
              />
            </div>
            <p className="polaroid-text">Polaroid Text</p>
          </div>
          <div className="polaroid-frame rotate-left">
            <div className="polaroid-image">
              <img
                src="/flowers.jpg"
                className="polaroid-image"
                alt="Polaroid Image"
              />
            </div>
            <p className="polaroid-text">Polaroid Text</p>
          </div>
          <div className="polaroid-frame rotate-right">
            <div className="polaroid-image">
              <img
                src="/flowers.jpg"
                className="polaroid-image"
                alt="Polaroid Image"
              />
            </div>
            <p className="polaroid-text">Polaroid Text</p>
          </div>
          <div className="polaroid-frame rotate-left">
            <div className="polaroid-image">
              <img
                src="/flowers.jpg"
                className="polaroid-image"
                alt="Polaroid Image"
              />
            </div>
            <p className="polaroid-text">Polaroid Text</p>
          </div>
        </div>
        <button>Button</button>
        <div
          style={{
            width: "60vw",
            height: "50vh",
            overflow: "auto",
            margin: "0 auto",
          }}
        >
          {/* <SyntaxHighlighter
            language="jsx"
            style={oneDark}
            customStyle={customStyle}
          >
            {code}
          </SyntaxHighlighter> */}
        </div>
      </div>
    </>
  );
}

export default App;
