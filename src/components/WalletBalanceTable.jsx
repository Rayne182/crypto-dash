import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, useTheme } from "@mui/material";
import { tokens } from '../theme';
import Web3 from 'web3';
import axios from 'axios';
import ERC20_ABI from '../erc20abi.json';


const WalletBalanceTable = ({ account }) => {
  const [data, setData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchData = async () => {
      // Get the list of tokens from etherscan.io
      const tokenResponse = await axios.get(`https://api.etherscan.io/api?module=account&action=tokentx&address=${account}&startblock=0&endblock=99999999&sort=asc&apikey=YOUR_ETHERSCAN_API_KEY`);

      const tokens = tokenResponse.data.result;
        // Filter out duplicate tokens and only keep the last transaction of each token
        //.reduce((tokens, tx) => {
        //  tokens[tx.contractAddress] = tx;
         // return tokens;
        //}, {});

        // Get the balance of each token and its price
        const web3 = new Web3(window.ethereum);
        const tokenData = await Promise.all(Object.values(tokens).map(async (token) => {
        const contract = new web3.eth.Contract(ERC20_ABI, token.contractAddress);
        const balance = await contract.methods.balanceOf(account).call();
        // Get the price from CoinGecko
        const priceResponse = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${token.tokenSymbol.toLowerCase()}&vs_currencies=usd`);
        const price = priceResponse.data[token.tokenSymbol.toLowerCase()].usd;

        return {
          id: token.tokenSymbol,
          currency: token.tokenSymbol,
          balance: balance / (10 ** token.tokenDecimal),
          price: price,
          value: price * (balance / (10 ** token.tokenDecimal)),
        };
      }));

      setData(tokenData);
    };

    fetchData();
  }, [account]);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'currency', headerName: 'Currency', flex: 1 },
    { field: 'balance', headerName: 'Balance', flex: 1 },
    { field: 'price', headerName: 'Price (USD)', flex: 1 },
    { field: 'value', headerName: 'Value (USD)', flex: 1 },
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
