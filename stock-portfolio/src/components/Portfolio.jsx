import React, { useState } from "react";
import "../sass/main.scss";

import Stock from "./Stock";
import Tickers from "./Tickers";

export default function Portfolio({ curPortfolio, setPortfolios }) {
  const [ticker, setTicker] = useState("AAPL");

  return (
    <>
      <div className="port-container">
        <header className="portfolio__header">{curPortfolio.name}</header>
        <Tickers
          setTicker={setTicker}
          portfolio={curPortfolio}
          setPortfolios={setPortfolios}
        ></Tickers>
        <Stock className="portfolio__stock" ticker={ticker}></Stock>
      </div>
    </>
  );
}
