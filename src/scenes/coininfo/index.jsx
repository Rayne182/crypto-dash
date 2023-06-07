import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import CoinChart from "../../components/CoinChart";
import { useLocation } from 'react-router-dom';

const CoinInfo = () => {
  const location = useLocation();
  const apiId = location.state.selectedId;

    return (
      <Box ml="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="INFO" subtitle="Live crypto data" />

        </Box>

        {/* CHART */}
        <Box textAlign="center" alignItems="center">
          <CoinChart selectedId={apiId}/>
        </Box>
      </Box>
    );
  };
  
  export default CoinInfo;