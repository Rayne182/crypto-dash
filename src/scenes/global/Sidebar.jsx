import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

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
            "$ .pro-sidebar-inner":{
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
            }
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
                            <Box mb="25px" mt="15px">
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

                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;