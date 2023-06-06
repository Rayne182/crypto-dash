import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, Typography, useTheme } from '@mui/material';
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutline";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };
  
const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Box sx={{
            "& .pro-sidebar-inner":{
                background: `${colors.primary[400]} !important`,
            },
            "& .pro-icon-wrapper":{
                backgroundColor: "transparent !important",
            },
            "& .pro-inner-item":{
                padding: "5px 35px 5px 20px !important",
            },
            "& .pro-inner-item:hover":{
                color: "#868dfb !important",
            },
            "& .pro-menu-item-active":{
                color: "#6870fa !important",
            },
        }}>
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    <MenuItem 
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        
                        {/* LOGO */}
                        {!isCollapsed && (
                            <Box mb="25px">
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <img alt="logo" width="100px" height="100px" src={`../../assets/logo.png`} style={{ cursor: PointerEvent, borderRadius:"50%"}}/>
                                    
                                </Box>
                                <Box textAlign="center">
                                    <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0"}}>BlindSpot</Typography>
                                    <Typography variant="h5" color={colors.greenAccent[500]}>Crypto Dashboard</Typography>
                                </Box>
                            </Box>
                        )}
                    </MenuItem>

                    {/* MENU ITEMS */}       
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Wallet"
                            to="/Wallet"
                            icon={<AccountBalanceWalletOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        /> 
                        <Item
                            title="Recipients"
                            to="/Recipients"
                            icon={<PersonOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        /> 
                        <Item
                            title="Transactions"
                            to="/Transactions"
                            icon={<ReceiptOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Help"
                            to="/Help"
                            icon={<HelpOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />    
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;