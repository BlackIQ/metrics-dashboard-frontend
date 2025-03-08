import React from "react";

// MUI
import { Box, Typography, colors } from "@mui/material";

// React ChartJs
import { Line } from "react-chartjs-2";

// ChartJs
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

// Register ChartJs
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const MemoryChart = ({ metrics, height }) => {
  const formatChartData = (data) => {
    const labels = [
      ...new Set(data.map((item) => new Date(item._time).toLocaleString())),
    ];

    const datasets = [
      {
        label: "Percentage",
        data: data
          .filter((item) => item._field === "percent")
          .map((item) => item._value),
        borderColor: colors.pink[500],
        backgroundColor: `${colors.pink[200]}26`,
        borderWidth: 1,
        fill: true,
        tension: 0,
      },
    ];

    return { labels, datasets };
  };

  return (
    <Box>
      <Typography
        variant="h6"
        color={colors.common["white"]}
        sx={{
          textAlign: "center",
          pb: 2,
        }}
        gutterBottom
      >
        Memory Usage
      </Typography>
      <Line
        width="100%"
        height={height}
        data={formatChartData(metrics)}
        options={{
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Time",
              },
            },
            y: {
              title: {
                display: true,
                text: "Value",
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default MemoryChart;
