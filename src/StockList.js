import StockListHeader from './StockListHeader';
import StockListItem from './StockListItem';
import StockListTotals from './StockListTotals';

function StockList(props) {
  
  const sortedStockList = props.data.sort((a,b) => a.name < b.name ? -1 : 1); 
  
  return (
    <table className="table-fixed w-10/12">
      <thead className="">
        <StockListHeader />
      </thead>
      <tbody>
        {
          sortedStockList.map((stock, idx) => <StockListItem stock={stock} /> )
        }
      </tbody>
      <tfoot>
        <StockListTotals stocks={props.data} />
      </tfoot>
    </table>
  );
}

export default StockList;
