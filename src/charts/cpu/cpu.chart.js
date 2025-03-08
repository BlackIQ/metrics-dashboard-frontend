import React from "react";
import { Box, Typography, colors } from "@mui/material";
import { Line } from "react-chartjs-2";
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

const CpuChart = ({ metrics, height }) => {
  const formatChartData = (data) => {
    const labels = [
      ...new Set(
        data.map((item) =>
          new Date(item._time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        )
      ),
    ];

    const datasets = [
      {
        label: "CPU Usage (%)",
        data: data
          .filter((item) => item._field === "total_usage")
          .map((item) => item._value),
        borderColor: colors.teal[500],
        backgroundColor: `${colors.teal[200]}30`,
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointRadius: 0,
      },
    ];

    return { labels, datasets };
  };

  return (
    <Box>
      <Typography
        variant="h6"
        color={colors.common["white"]}
        sx={{ textAlign: "center", pb: 1 }}
        gutterBottom
      >
        CPU Usage
      </Typography>
      <Box height="100%">
        <Line
          width="100%"
          height="100%"
          data={formatChartData(metrics)}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.raw}%`,
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  maxRotation: 0,
                  minRotation: 0,
                  autoSkip: true,
                  maxTicksLimit: 6,
                },
                grid: {
                  display: false,
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => `${value}%`,
                },
                grid: {
                  color: "#444",
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default CpuChart;
