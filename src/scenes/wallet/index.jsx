/*import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Button, Box, Typography, useTheme } from "@mui/material";
import WalletBalanceTable from '../../components/WalletBalanceTable'; 
import Header from '../../components/Header';
import { tokens } from '../../theme';
import axios from 'axios';

const Wallet = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [tokenData, setTokenData] = useState([]);

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable(); // prompts user to connect their MetaMask
        } else {
            window.alert('Non-Ethereum browser detected. Consider trying MetaMask!');
        }
    };

    const loadBlockchainData = async () => {
            const web3 = window.web3;
            // Load account
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
            const balance = await web3.eth.getBalance(accounts[0]);
            setBalance(web3.utils.fromWei(balance));

            // Fetch the list of tokens and their balances
            const response = await axios.get(`https://api.etherscan.io/api?module=account&action=tokentx&address=${accounts[0]}&startblock=0&endblock=999999999&sort=asc&apikey=YOUR_ETHERSCAN_API_KEY`);
            const tokenAddresses = [...new Set(response.data.result.map(tx => tx.contractAddress))];
            const tokenData = await Promise.all(tokenAddresses.map(async (address) => {
            const tokenContract = new web3.eth.Contract(ERC20_ABI, address);
            const symbol = await tokenContract.methods.symbol().call();
            const decimals = await tokenContract.methods.decimals().call();
            const balance = await tokenContract.methods.balanceOf(accounts[0]).call();
            return {
                symbol,
                balance: balance / (10 ** decimals),
                contractAddress: address
            };
        }));
        setTokenData(tokenData);
    };

    const connectWallet = async () => {
        await loadWeb3();
        await loadBlockchainData();
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', () => {
                loadBlockchainData();
            });
            window.ethereum.on('chainChanged', () => {
                loadBlockchainData();
            });
        }
    }, []);

    return (
        <Box ml="20px">
            {/* HEADER }
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="WALLET" subtitle="Your balances" />
            </Box>
            <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '50vh' 
            }}
            >
                {!account ? (
                    <Button variant="contained" onClick={connectWallet}>Connect Wallet</Button>
                ) : (
                    <>
                    <Typography variant="h4" fontWeight={'bold'}>Your Balances:</Typography>
                    <Typography color={colors.greenAccent[400]}>{account}</Typography>
                    <h2>{balance} ETH</h2>
                    <WalletBalanceTable  account={account} tokenData={tokenData} />
                    </>
                )}
            </Box>
        </Box>
    );
};

export default Wallet;*/