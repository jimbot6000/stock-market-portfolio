import utilities from './utilities';

function StockListItem(props) {
  
  const { stock } = props;
  
  const profitClass = stock.profit < 0 ? 'loss' : 'profit';
  
  return (
    <tr className="">
      <td className="text-left mr-8">{stock.ticker}</td>
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
