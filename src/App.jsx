import { useEffect, useState } from "react";
import { HashRouter as Router } from "react-router-dom";
import "./index.css";
import "./reset.css";

export default function App() {
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState(1);

  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  return (
    <div>
      <Nav theme={theme} setTheme={setTheme} />
      <Output input={input} />
      <Keyboard input={input} setInput={setInput} />{" "}
    </div>
  );
}

function Nav({ theme, setTheme }) {
  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === 3 ? 1 : prevTheme + 1)); // Cycle through themes
  };

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
            <div className="toggle" onClick={handleThemeChange}>
              <div
                className="circle"
                style={{ transform: `translateX(${(theme - 1) * 1.8}rem)` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Output({ input }) {
  const formatNumber = (num) => {
    if (!num) return "";
    const parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };
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
      if (!input || /[\+\-\/X.]$/.test(input)) {
        return;
      }
      try {
        setInput(eval(input.replace(/X/g, "*")).toString());
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
    "X",
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
               ${btn === "=" ? "btn-equal" : ""}
               ${btn === "DEL" ? "btn-del" : ""}`}
            onClick={() => handleClick(btn)}
            disabled={btn === "=" && (!input || /[\+\-\/X.]$/.test(input))}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
