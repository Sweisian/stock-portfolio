import "./sass/main.scss";
import Sidebar from "./components/Sidebar";
import Portfolio from "./components/Portfolio";
import { useState } from "react";

const testingPorts = [
  { name: "My First Port", tickers: ["AAPL", "MSFT"] },
  { name: "My Second Port", tickers: ["TGB", "RWO", "CLSK", "GMAB", "IVEG"] },
];

function App() {
  const [portfolios, setPortfolios] = useState(testingPorts);
  const [curPortfolio, setCurPortfolio] = useState(portfolios[0]);

  return (
    <div className="container">
      <Sidebar
        setPortfolios={setPortfolios}
        portfolios={portfolios}
        setCurPortfolio={setCurPortfolio}
      ></Sidebar>
      <Portfolio
        curPortfolio={curPortfolio}
        setPortfolios={setPortfolios}
      ></Portfolio>
    </div>
  );
}

export default App;
