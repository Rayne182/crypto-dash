import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, useTheme } from "@mui/material";
import { tokens } from '../theme';


const WalletBalanceTable = ({ account }) => { // Update the prop name from `balances` to `account`
  const [data, setData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    // Replace the following mock data with your logic to fetch wallet balances for the specified account
    const balances = [
      { currency: 'ETH', balance: '10' },
      { currency: 'BTC', balance: '0.5' },
      { currency: 'LTC', balance: '5' },
    ];

    const newData = balances.map((item, index) => ({
      id: index + 1,
      currency: item.currency,
      balance: item.balance,
    }));
    setData(newData);
  }, [account]);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'currency', headerName: 'Currency', flex: 1 },
    { field: 'balance', headerName: 'Balance', flex: 1 },
  ];

  return (
    <Box 
      sx={{ 
        height: 'auto', 
        width: '60%', 
        margin: 'auto', 
        '.MuiDataGrid-root .MuiDataGrid-footer': { display: 'none' },
        '.MuiDataGrid-colCell': { fontWeight: 'bold' }
      }}
    >
      <DataGrid sx={{background: `${colors.primary[400]}`}} rows={data} columns={columns} hideFooter/>
    </Box>
  );
};

export default WalletBalanceTable;
