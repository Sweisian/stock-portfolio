import React, { useState } from "react";

function Tickers({ portfolio, setPortfolios, setTicker }) {
  const [curTicker, setCurTicker] = useState(null);

  const handleSubmit = (event) => {
    setPortfolios((ports) => {
      const newPorts = [...ports]
      const toChangePort = newPorts.filter((port) => port.name === portfolio.name)[0]

      if(toChangePort.tickers.includes(curTicker)){
        alert("Could not add Ticker: " + curTicker );
        return ports
      }
      toChangePort.tickers.push(curTicker)
      return newPorts
    })
    event.preventDefault();
  }

  const removeTicker = (tickerName) => {
    setPortfolios((ports) => {
      const newPorts = [...ports]
      const toChangePort = newPorts.filter((port) => port.name === portfolio.name)[0]
      const newTickers = toChangePort.tickers.filter((ticker) => ticker !== tickerName)
      toChangePort.tickers = newTickers
      return newPorts
    })
  }

  return (
    <ul className="portfolio__tickers">
      <li >
        <form className="portfolio__tickers--form" onSubmit={handleSubmit}>
          <label className="portfolio__tickers--label">Add Ticker:</label>
          <input value={curTicker} onChange={(event) => setCurTicker(event.target.value.toUpperCase())}></input>
          <input type="submit" value="Add"></input>
        </form>
      </li>
      {portfolio?.tickers?.map((ticker) => {
        return (
          <li className="portfolio__tickers--item">
            <button onClick={() => setTicker(ticker)}>{ticker}</button>
            <button onClick={() => removeTicker(ticker)}>X</button>
          </li>
        );
      })}
    </ul>
  );
}

export default Tickers;
