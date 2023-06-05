import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from "@mui/material";

const CryptoTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(response => response.json())
      .then(data => {
        const newData = data.map((item, index) => ({
          id: index + 1, // rank
          logo: item.image,
          symbol: item.symbol.toUpperCase(),
          marketCap: `$${Number(item.market_cap).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
          currentPrice: `$${Number(item.current_price).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
          totalVolume: `$${Number(item.total_volume).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        }));
        setData(newData);
      })
      .catch(err => console.log(err));
  }, []);

  const columns = [
    { field: 'id', headerName: 'Rank', flex: 1 },
    { 
      field: 'symbol', 
      headerName: 'Coin', 
      flex: 1, 
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          <img src={params.row.logo} alt="logo" style={{ height: '25px', width: '25px', marginRight: '10px' }} />
          <span>{params.value}</span>
        </Box>
      ), 
    },
    { field: 'marketCap', headerName: 'Market Cap', flex: 1 },
    { field: 'currentPrice', headerName: 'Current Price', flex: 1 },
    { field: 'totalVolume', headerName: 'Total Volume', flex: 1 },
  ];

  return (
    <Box style={{ height: 300, width: '60%', margin: 'auto' }}>
      <DataGrid rows={data} columns={columns} autoHeight autoPageSize />
    </Box>
  );
};

export default CryptoTable;
