function StockListHeader() {
  
    return (
      <tr className="border-b-4 border-slate-900">
        <th className="w-1/12">Ticker</th>
        <th>Name</th>
        <th className="w-1/12">Shares</th>
        <th className="money text-right mr-8">Purchase price</th>
        <th className="money text-right mr-8">Purchase value</th>
        <th className="money text-right mr-8">Current price</th>
        <th className="money text-right mr-8">Current value</th>
        <th className="money text-right mr-8">Profit / Loss</th>
      </tr>
    );
  }
  
  export default StockListHeader;
  