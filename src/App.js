import { useState, useEffect } from 'react';
import './App.css';
import sampleData from './sampleData';
import StockList from './StockList';

function App() {
  
  // Uncomment setMyName if required, for example, if the name
  // is stored in the DynamoDB
  const [myName/*, setMyName*/] = useState('Roger');
  
  const [stocks, setStocks] = useState([]);
  const [stockList, setStockList] = useState([]);
  
  // Retrieve the current stock information when the page first loads
  useEffect(() => {
    setStocks(sampleData);
  }, []);
  
  // With the stock data add purchase value, current price
  // and current value to the stock record
  useEffect(() => {
    const enhancedStocks = stocks.map(stock => {
      stock.purchaseValue = stock.shares * stock.purchasePrice;
      stock.currentPrice = Math.random()*200 + 50;
      stock.currentValue = stock.shares * stock.currentPrice;
      stock.profit = stock.currentValue - stock.purchaseValue;
      return stock;
    })
    setStockList(enhancedStocks);
  }, [stocks])
  
  const addStock = evt => {
    console.log('add stock clicked');
  }

  return (
    <div className="App bg-slate-800 text-slate-50">
      <div className="">
        <div className="card-header-color">
          <h4>{myName}'s Stock Portfolio</h4>
        </div>
        <div className="flex place-content-center">
          <StockList data={stockList} />
        </div>
        <div>
          <button size="sm" onClick={addStock}>Add stock</button>
        </div>
      </div>
    </div>
  );
}

export default App;
