import { MdDeleteForever } from 'react-icons/md';
import utilities from './utilities';

function StockListItem(props) {
  
  const { stock } = props;
  
  const profitClass = stock.profit < 0 ? 'loss' : 'profit';
  
  return (
    <tr className="">
      <td className="content-center">
        <div className="bg-red-700 hover:bg-red-600 rounded-full border-2 border-red-900" onClick={deleteStock}>
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
