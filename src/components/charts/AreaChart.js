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
  backgroundColor = "rgba(63, 81, 181, 0.5)", // Default semi-transparent blue
  borderColor = "#3f51b5", // Default solid blue line
  unit = "", // Optional unit for tooltips (e.g., "%", "MB")
}) => {
  const chartData = {
    labels: labels || [],
    datasets: [
      {
        label: title,
        data: data || [],
        borderColor, // Line color
        backgroundColor, // Fill color under the line
        fill: true, // Ensures the area under the line is filled
        tension: 0.3, // Smooth curve
        pointRadius: 0, // No points to emphasize the filled area
        borderWidth: 2, // Slightly thicker line for visibility
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${context.parsed.y} ${unit}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          maxTicksLimit: 10, // Limit x-axis labels for readability
        },
      },
      y: {
        grid: { color: "rgba(0, 0, 0, 0.1)" },
        beginAtZero: true, // Start y-axis at 0
        suggestedMax: Math.max(...(data || [100])) * 1.1, // Dynamic max with 10% buffer
      },
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
