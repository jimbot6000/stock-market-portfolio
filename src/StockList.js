import StockListHeader from './StockListHeader';
import StockListItem from './StockListItem';
import StockListTotals from './StockListTotals';

function StockList(props) {
  
  const sortedStockList = props.data.sort((a,b) => a.name < b.name ? -1 : 1); 
  
  return (
    <table className="place-content-center flex-1 m-auto">
      <thead className="">
        <StockListHeader />
      </thead>
      <tbody>
        {
          sortedStockList.map((stock, idx) => <StockListItem key={idx} stock={stock} /> )
        }
      </tbody>
      <tfoot>
        <StockListTotals stocks={props.data} />
      </tfoot>
    </table>
  );
}

export default StockList;