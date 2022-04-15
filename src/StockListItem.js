import utilities from './utilities';

function StockListItem(props) {
  
  const { stock } = props;
  const purchaseValueStr = utilities.formatNumber(stock.purchaseValue);
  const currentValueStr = utilities.formatNumber(stock.currentValue);
  
  const purchasePriceStr = utilities.formatNumber(stock.purchasePrice);
  const currentPriceStr = utilities.formatNumber(stock.currentPrice);
  
  const profitStr = utilities.formatNumber(stock.profit);
  const profitClass = stock.profit < 0 ? 'loss' : 'profit';
  
  return (
    <tr className="flex">
      <td>{stock.ticker}</td>
      <td>{stock.name}</td>
      <td>{stock.shares}</td>
      <td className="money flex-1">{purchasePriceStr}</td>
      <td className="money flex-1">{purchaseValueStr}</td>
      <td className="money flex-1">{currentPriceStr}</td>
      <td className="money flex-1">{currentValueStr}</td>
      <td className={"money flex-1 "+profitClass}>{profitStr}</td>
    </tr>
  );
}

export default StockListItem;
