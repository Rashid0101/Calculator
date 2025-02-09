import { useState } from "react";
import "./index.css";
import "./reset.css";

export default function App() {
  const [input, setInput] = useState("");

  return (
    <div>
      <Nav />
      <Output input={input} />
      <Keyboard input={input} setInput={setInput} />{" "}
    </div>
  );
}

function Nav() {
  return (
    <div className="container-nav">
      <div className="nav-flex">
        <h1>calc</h1>
        <div className="container-swation">
          <span>THEME</span>
          <div className="swation">
            <div className="swation-number">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
            <div className="toggle">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Output({ input }) {
  return (
    <form className="form-output">
      <input type="text" value={input} readOnly />
    </form>
  );
}

function Keyboard({ setInput, input }) {
  const handleClick = (value) => {
    if (value === "RESET") {
      setInput("");
    } else if (value === "DEL") {
      setInput((prev) => prev.slice(0, -1));
    } else if (value === "=") {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    "7",
    "8",
    "9",
    "DEL",
    "4",
    "5",
    "6",
    "+",
    "1",
    "2",
    "3",
    "-",
    ".",
    "0",
    "/",
    "*",
    "RESET",
    "=",
  ];

  return (
    <div className="container-keyboard">
      <div className="grid">
        {buttons.map((btn) => (
          <button
            key={btn}
            className={`btn 
              ${btn === "RESET" ? "btn-clear" : ""}
               ${btn === "=" ? "btn-equal" : ""}`}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
