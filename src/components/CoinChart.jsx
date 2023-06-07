import { ResponsiveLine } from "@nivo/line";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useEffect, useState } from 'react'; 

const CoinChart = ({ selectedId, isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]); 

  useEffect(() => {
    console.log("Fetching data for", selectedId);
    fetch(`https://api.coingecko.com/api/v3/coins/${selectedId}/market_chart?vs_currency=zar&days=365&interval=yearly`)
      .then(response => response.json())
      .then(data => {
        console.log("API response for", selectedId, data);
        const chartData = {
          id: selectedId,
          data: data.prices.map(price => ({
            x: new Date(price[0]).toLocaleDateString(),
            y: price[1],
          }))
        };
        setData([chartData]);
      })
      .catch(error => {
        console.log("Error fetching data:", error);
      });
  }, [selectedId]);

  return (
    <Box style={{ height: '500px', width: '100%'}}>
        <ResponsiveLine
            data={data}
            theme={{
                axis: {
                domain: {
                    line: {
                    stroke: colors.grey[100],
                    },
                },
                legend: {
                    text: {
                    fill: colors.grey[100],
                    },
                },
                ticks: {
                    line: {
                    stroke: colors.grey[100],
                    strokeWidth: 1,
                    },
                    text: {
                    fill: colors.grey[100],
                    },
                },
                },
                legends: {
                text: {
                    fill: colors.grey[100],
                },
                },
                tooltip: {
                container: {
                    color: colors.primary[500],
                },
                },
            }}
            colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} 
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: "bottom",
                tickSize: 3,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Date", 
                legendOffset: 36,
                legendPosition: "middle",
                tickValues: data[0]?.data
                    .map((item, i) => (i % 33 === 0 ? item.x : null))  // Map every 10th date to itself, others to null
                    .filter((x) => x !== null),
            }}
            axisLeft={{
                orient: "left",
                tickValues: 5, 
                tickSize: 3,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Price", 
                legendOffset: -50,
                legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={0}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                    {
                        on: "hover",
                        style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                        },
                    },
                    ],
                },
                ]}
            />
    </Box>
    );
  };
  
  export default CoinChart;