import React, { useState } from "react";

function Sidebar({ portfolios, setPortfolios, setCurPortfolio }) {
  const [portName, setPortName] = useState("");

  function handleSubmit(event) {
    setPortfolios((oldPorts) => {
      if (
        portName.length > 0 &&
        !oldPorts.find((port) => port.name === portName)
      ) {
        return [...oldPorts, { name: portName, tickers: [] }];
      } else {
        alert("Could not add Portfolio: " + portName);
        return oldPorts;
      }
    });

    event.preventDefault();
  }

  return (
    <nav className="sidebar">
      <ul className="side-nav">
        <li className="side-nav__item ">
          <form className="side-nav__form" onSubmit={handleSubmit}>
            <label>Add Portfolio:</label>
            <input
              value={portName}
              onChange={(event) => setPortName(event.target.value)}
            ></input>
            <input type="submit" value="Add"></input>
          </form>
        </li>
        {portfolios.map((port) => {
          return (
            <li className="side-nav__item">
              <button onClick={() => setCurPortfolio(port)}>{port.name}</button>
              <button
                onClick={() =>
                  setPortfolios((oldPorts) =>
                    oldPorts.filter((oldPort) => oldPort.name != port.name)
                  )
                }
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Sidebar;
