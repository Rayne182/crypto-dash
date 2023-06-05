import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import CryptoTable from "../../components/CryptoTable";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    return (
      <Box ml="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        </Box>

        {/* CRYPTO TABLE */}
        <Box mt="20px">
          <CryptoTable />
        </Box>
      </Box>
    );
  };
  
  export default Dashboard;