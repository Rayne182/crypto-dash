import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, useTheme } from "@mui/material";
import { tokens } from '../theme';

const CryptoTable = () => {
  const [data, setData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&order=market_cap_desc&per_page=10&sparkline=false`)
      .then(response => response.json())
      .then(data => {
        const newData = data.map((item, index) => ({
          id: index + 1, // rank
          logo: item.image,
          symbol: item.symbol.toUpperCase(),
          marketCap: `ZAR ${Number(item.market_cap).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
          currentPrice: `ZAR ${Number(item.current_price).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
          totalVolume: `ZAR ${Number(item.total_volume).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
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
    <Box 
      sx={{ 
        height: 500, 
        width: '60%', 
        margin: 'auto', 
        '.MuiDataGrid-root .MuiDataGrid-footer': { display: 'none' },
        '.MuiDataGrid-colCell': { fontWeight: 'bold' }
      }}
    >
      <DataGrid sx={{background: `${colors.primary[400]}`}} rows={data} columns={columns} hideFooter />
    </Box>
  );
};

export default CryptoTable;
