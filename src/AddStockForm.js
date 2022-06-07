import { useState, useEffect } from 'react';
import './App.css';
import StockList from './StockList';
import utilities from './utilities';
import Utilities from './utilities';

function AddStockForm(props) {
	// Uncomment setMyName if required, for example, if the name
	// is stored in the DynamoDB
	const [myName /*, setMyName*/] = useState('Roger');

	const AWS_API_GATEWAY = 'https://gor5c0brhk.execute-api.us-east-1.amazonaws.com/prod/';
	const AWS_API_GATEWAY_ADD_STOCK = AWS_API_GATEWAY + '/add-stock';
	const AWS_API_GATEWAY_GET_STOCK_PRICE = AWS_API_GATEWAY + '/get-stock-price';

	const [ticker, setTicker] = useState('');
	const [shares, setShares] = useState('');
	const [purchasePrice, setPurchasePrice] = useState('');
	const [isValid, setIsValid] = useState(false);

	const inputClass = 'bg-slate-700 m-2 border-2 border-slate-50 rounded-md w-full';
	const divClass = 'w-4/12 my-4 flex-0 mx-auto';

	const onChange = (setFcn) => {
		return (evt) => {
			setFcn(evt.currentTarget.value.toUpperCase());
		};
	};

	const addStock = (evt) => {
		console.log('add stock clicked: ' + ticker + ', ' + shares + ', ' + purchasePrice);
		return fetch(AWS_API_GATEWAY_ADD_STOCK, {
			method: 'POST',
			cache: 'default',
			body: JSON.stringify({ ticker: ticker, shares: shares, purchasePrice: purchasePrice })
		}).then(function (response) {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			props.getPortfolio();
			props.addStock();
			return response.json();
		});
	};

	const getStockPrice = (ticker) => {
		return fetch(AWS_API_GATEWAY_GET_STOCK_PRICE, {
			method: 'POST',
			cache: 'default',
			body: JSON.stringify({ ticker: ticker })
		}).then(function (response) {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		});
	};

	useEffect(() => {
		let isValid = ticker.length > 0; // ticker isn't blank
		isValid = isValid && shares.length > 0; // shares isn't blank
		isValid = isValid && purchasePrice.length > 0; // purchasePrice isn't blank
		isValid = isValid && !/[^A-Z]/.test(ticker); // ticker has letters only
		setIsValid(isValid);
	}, [ticker, shares, purchasePrice]);

	return (
		<div className='AddStockForm bg-slate-800 text-slate-50 m-4 place-content-center w-full'>
			<form className='w-full place-content-center'>
				<div className={divClass}>
					<label htmlFor='ticker'>Ticker</label>
					<input id='ticker' value={ticker} onChange={onChange(setTicker)} className={inputClass}></input>
				</div>
				<div className={divClass}>
					<label htmlFor='shares'>Shares purchased</label>
					<input id='shares' value={shares} onChange={onChange(setShares)} className={inputClass}></input>
				</div>
				<div className={divClass}>
					<label htmlFor='purchasePrice'>Purchase price</label>
					<input id='purchasePrice' value={purchasePrice} onChange={onChange(setPurchasePrice)} className={inputClass}></input>
				</div>
			</form>
			<div className='w-full relative flex place-content-center my-4'>
				<button className='bg-red-700 hover:bg-red-600 px-3 py-2 rounded-full border-red-900 border-4 mx-4' onClick={props.addStock}>
					Cancel
				</button>
				<button className='bg-green-700 disabled:bg-green-900 hover:bg-green-600 px-3 py-2 rounded-full border-green-800 border-4 mx-4' disabled={!isValid} onClick={addStock}>
					Add stock
				</button>
			</div>
		</div>
	);
}

export default AddStockForm;
