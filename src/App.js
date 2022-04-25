import { useState, useEffect } from 'react';
import './App.css';
import sampleData from './sampleData';
import StockList from './StockList';

function App() {

  // Uncomment setMyName if required, for example, if the name
  // is stored in the DynamoDB
  const [myName/*, setMyName*/] = useState('Roger');

  const AWS_API_GATEWAY = 'https://gor5c0brhk.execute-api.us-east-1.amazonaws.com/prod/';
  const AWS_API_GATEWAY_GET_PORTFOLIO = AWS_API_GATEWAY + '/get-portfolio';

  const [stocks, setStocks] = useState([]);
  const [stockList, setStockList] = useState([]);

  // Retrieve the current stock information when the page first loads
  const options = {
    method: 'POST',
    cache: 'default'
  };

  fetch(AWS_API_GATEWAY_GET_PORTFOLIO, options)
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      let stockList = response.Items.map(item => {
        return {
          "name": item.name.S,
          "ticker": item.ticker.S,
          "purchasePrice": item.purchasePrice.N,
          "shares": item.shares.N
        };
      });
    
      setStocks(stockList)
    })
    .catch(function (error) {
      console.log(error);
    })

  

  // With the stock data add purchase value, current price
  // and current value to the stock record
  useEffect(() => {
    const enhancedStocks = stocks.map(stock => {
      stock.purchaseValue = stock.shares * stock.purchasePrice;
      stock.currentPrice = Math.random() * 200 + 50;
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
        <div className="card-header-color text-xl my-4">
          <h4>{myName}'s Stock Portfolio</h4>
        </div>
        <div className="flex place-content-center">
          <StockList data={stockList} />
        </div>
        <div className="w-11/12 relative">
          <button className="bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-full border-slate-900 border-4 my-4 absolute right-0" onClick={addStock}>Add stock</button>
        </div>
      </div>
    </div>
  );
}

export default App;
