"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, Paper, Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ title, datasets, labels }) => {
  const chartData = {
    labels: labels,
    datasets: datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: dataset.borderColor,
      backgroundColor: dataset.backgroundColor || "rgba(0, 0, 0, 0)",
      fill: false,
      tension: 0.3,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "rgba(0, 0, 0, 0.1)" } },
    },
  };

  return (
    <Box component={Paper} p={2} elevation={3} sx={{ height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ height: "300px" }}>
        <Line data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default LineChart;
