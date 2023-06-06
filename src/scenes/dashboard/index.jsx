import { Box, Typography } from "@mui/material";
//import { tokens } from "../../theme";
import Header from "../../components/Header";
import CryptoTable from "../../components/CryptoTable";

const Dashboard = () => {
    //const theme = useTheme();
    //const colors = tokens(theme.palette.mode);
  
    return (
      <Box ml="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        </Box>

        {/* CRYPTO TABLE */}
        <Box textAlign="center" alignItems="center">
          <Typography mb="30px" variant="h4" fontWeight="bold">Top Crypto Currencies</Typography>
          <CryptoTable/>
        </Box>
      </Box>
    );
  };
  
  export default Dashboard;