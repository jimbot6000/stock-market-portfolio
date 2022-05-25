import { MdDeleteForever } from 'react-icons/md';
import utilities from './utilities';

function StockListItem(props) {
  
  const AWS_API_GATEWAY = 'https://gor5c0brhk.execute-api.us-east-1.amazonaws.com/prod/';
  const AWS_API_GATEWAY_DELETE_STOCK = AWS_API_GATEWAY + '/delete-stock';

  const deleteStock = evt => {
    let ticker = evt.currentTarget.getAttribute('data-ticker');
    console.log('delete stock clicked: '+ticker);
    return fetch(AWS_API_GATEWAY_DELETE_STOCK, {
      method: 'POST',
      cache: 'default',
      body: JSON.stringify({ticker: ticker})
    }).then(function (response) {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      props.getPortfolio();
      return response.json();
    });
  }

  const { stock } = props;
  
  const profitClass = stock.profit < 0 ? 'loss' : 'profit';
  
  return (
    <tr className="">
      <td className="content-center">
        <div className="bg-red-700 hover:bg-red-600 rounded-full border-2 border-red-900" onClick={deleteStock} data-ticker={stock.ticker}>
          <MdDeleteForever className="mx-auto"></MdDeleteForever>
        </div>
      </td>
      <td className="text-left absolute ml-2 my-auto">{stock.ticker}</td>
      <td>{stock.name}</td>
      <td>{stock.shares}</td>
      <td className="money text-right mr-8">{stock.purchasePrice}</td>
      <td className="money text-right mr-8">{stock.formattedPurchaseValue}</td>
      <td className="money text-right mr-8">{stock.currentPrice}</td>
      <td className="money text-right mr-8">{stock.formattedCurrentValue}</td>
      <td className={"money text-right mr-8 "+profitClass}>{stock.formattedProfit}</td>
    </tr>
  );
}

export default StockListItem;
