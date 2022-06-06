import { useState, useEffect } from 'react';
import './App.css';
import StockList from './StockList';
import utilities from './utilities';
import Utilities from './utilities';

function AddStockForm(props) {
  
  // Uncomment setMyName if required, for example, if the name
  // is stored in the DynamoDB
  const [myName/*, setMyName*/] = useState('Roger');

  const AWS_API_GATEWAY = 'https://gor5c0brhk.execute-api.us-east-1.amazonaws.com/prod/';
  const AWS_API_GATEWAY_ADD_STOCK = AWS_API_GATEWAY + '/add-stock';
  const AWS_API_GATEWAY_GET_STOCK_PRICE = AWS_API_GATEWAY + '/get-stock-price';

  const [ticker, setTicker] = useState('');
  const [shares, setShares] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [isValid, setIsValid] = useState(false);

  const inputClass = 'bg-slate-700 m-2 border-2 border-slate-50 rounded-md w-full'
  const divClass = 'w-4/12 my-4 flex-0'

  const onChange = (setFcn) => {
    return (evt) => {
      setFcn(evt.currentTarget.value.toUpperCase());
    }
  }

  const addStock = evt => {
    let ticker = evt.currentTarget.getAttribute('data-ticker');
    console.log('add stock clicked: '+ticker);
    return fetch(AWS_API_GATEWAY_ADD_STOCK, {
      method: 'POST',
      cache: 'default',
      body: JSON.stringify({ticker: ticker, shares: shares, purchasePrice: purchasePrice})
    }).then(function (response) {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      props.getPortfolio();
      return response.json();
    });
    props.addStock();
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

  useEffect(() => {
    let isValid = (ticker.length > 0);              // ticker isn't blank
    isValid = isValid && (shares.length > 0);       // shares isn't blank
    isValid = isValid && (purchasePrice.length > 0);// purchasePrice isn't blank
    isValid = isValid && !/[^A-Z]/.test(ticker);    // ticker has letters only
    setIsValid(isValid);
  }, [ticker, shares, purchasePrice]);  

  return (
    <div className="AddStockForm bg-slate-800 text-slate-50 m-4 place-content-center w-full">
      <form className="w-full place-content-center grid grid-cols-1"> 
        <div className={divClass}>
          <label for="ticker">
            Ticker
          </label>
          <input id="ticker" value={ticker} onChange={onChange(setTicker)} className={inputClass}></input>
        </div>
        <div className={divClass}>
          <label for="shares">
            Shares purchased
          </label>
          <input id="shares" value={shares} onChange={onChange(setShares)} className={inputClass}></input>
        </div>
        <div className={divClass}>
          <label for="purchasePrice">
            Purchase price
          </label>
          <input id="purchasePrice" value={purchasePrice} onChange={onChange(setPurchasePrice)} className={inputClass}></input>
        </div>
      </form>
      <div className="w-11/12 relative">
        <button className="bg-red-700 hover:bg-red-600 px-3 py-2 rounded-full border-red-900 border-4 my-4 absolute left-0" onClick={props.addStock}>Cancel</button>
        <button className="bg-green-700 disabled:bg-green-900 hover:bg-green-600 px-3 py-2 rounded-full border-green-900 border-4 my-4 absolute left-24" disabled={!isValid} onClick={addStock}>Add stock</button>
      </div>
    </div>
  );
}

export default AddStockForm;
