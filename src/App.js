import { useState, useEffect } from 'react';
import './App.css';
import StockList from './StockList';

function App() {

  // Uncomment setMyName if required, for example, if the name
  // is stored in the DynamoDB
  const [myName/*, setMyName*/] = useState('Roger');

  const AWS_API_GATEWAY = 'https://gor5c0brhk.execute-api.us-east-1.amazonaws.com/prod/';
  const AWS_API_GATEWAY_GET_PORTFOLIO = AWS_API_GATEWAY + '/get-portfolio';
  const AWS_API_GATEWAY_GET_STOCK_PRICE = AWS_API_GATEWAY + '/get-stock-price';

  const [stocks, setStocks] = useState([]);
  const [stockList, setStockList] = useState([]);
  const [stockPrices, setStockPrices] = useState([]);
  const [tickerList, setTickerList] = useState([]);
  const [portfolioData, setPortfolioData] = useState([]);

  const createTickerList = portfolio => {
    return portfolio.map(val => val.ticker);
  }

  const getStockPrice = ticker => {
    return fetch(AWS_API_GATEWAY_GET_STOCK_PRICE, {
      method: 'POST',
      cache: 'default',
      body: JSON.stringify({ticker: ticker})
    }).then(function (response) {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
  }

  const getPortfolio = () => {
    fetch(AWS_API_GATEWAY_GET_PORTFOLIO, {
      method: 'POST',
      cache: 'default'
    })
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
  }

  const addStock = evt => {
    console.log('add stock clicked');
  }

  useEffect(getPortfolio, []);

  useEffect(() => {setTickerList(createTickerList(stocks))}, [stocks])

  useEffect(() => {
    let promises = tickerList.map(ticker => getStockPrice(ticker));
    Promise.all(promises)
      .then(stocks => {
        console.log(stocks);
        const stockPrices = stocks.reduce((obj, stock) => {
          const info = {
            name: stock.data ? stock.data.longName : null,
            price: stock.data ? stock.data.regularMarketPrice : null
          }
          obj[stock.ticker] = info;
          return obj;
        }, {});  
        setStockPrices(stockPrices);
        console.log(stockPrices);
      })
  }, [tickerList])
  
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
