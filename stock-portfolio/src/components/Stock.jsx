import React, { useState, useEffect } from "react";

import "../sass/main.scss";

import useFetch from "use-http";
import { Sparklines, SparklinesLine } from "react-sparklines";

export default function Stock({ ticker }) {
  const [stockInfo, setStockInfo] = useState(null);

  const { get, post, response, loading, error } = useFetch(
    "https://api.polygon.io"
  );

  useEffect(() => {
    initializeStock();
  }, [ticker]);

  async function initializeStock() {
    const tickerData = await get(
      `/v3/reference/tickers?ticker=${ticker}&active=true&sort=ticker&order=asc&limit=10&apiKey=JbMeclYFilSTmIh3NykzZKMthCvYvv2h`
    );
    const priceData = await get(
      `/v2/snapshot/locale/us/markets/stocks/tickers/${ticker}?apiKey=JbMeclYFilSTmIh3NykzZKMthCvYvv2h`
    );

    const dateOffset = 24 * 60 * 60 * 1000 * 20; //20 days back
    const lastSevenDaysData = await get(
      `/v2/aggs/ticker/${ticker}/range/1/day/${
        Date.now() - dateOffset
      }/${Date.now()}?adjusted=true&sort=asc&limit=7&apiKey=JbMeclYFilSTmIh3NykzZKMthCvYvv2h`
    );

    const sparklineData = lastSevenDaysData.results.map((day) => day.c);

    const lastPrice = priceData.ticker.lastQuote.P;
    const companyName = tickerData.results[0].name;
    const prevClose = priceData.ticker.prevDay.c;

    if (response.ok)
      setStockInfo({ lastPrice, companyName, prevClose, sparklineData });
  }

  return (
    <div className="stock">
      <Sparklines
        data={stockInfo?.sparklineData}
        limit={7}
        width={200}
        height={40}
        margin={5}
      >
        <SparklinesLine style={{ stroke: "black" }} />
      </Sparklines>
      <div>
        <span className="stock__label">Company Name: </span>
        <span className="stock__info">{stockInfo?.companyName}</span>
      </div>

      <div>
        <span className="stock__label">Previous Close: </span>
        <span className="stock__info">${stockInfo?.prevClose}</span>
      </div>

      <div>
        <span className="stock__label">Current Price: </span>
        <span className="stock__info">${stockInfo?.lastPrice}</span>
      </div>
    </div>
  );
}
