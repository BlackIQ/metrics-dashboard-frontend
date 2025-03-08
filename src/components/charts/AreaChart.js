"use client"; // Required for Next.js client-side rendering

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

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AreaChart = ({
  title,
  data,
  labels,
  backgroundColor = "rgba(63, 81, 181, 0.5)",
}) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        borderColor: "#3f51b5",
        backgroundColor: backgroundColor,
        fill: true, // Filled area confirmed
        tension: 0.3,
      },
    ],
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

export default AreaChart;
