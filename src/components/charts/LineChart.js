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

const LineChart = ({
  title,
  datasets,
  labels,
  unit = "", // Optional unit for tooltips
}) => {
  const chartData = {
    labels: labels || [],
    datasets: (datasets || []).map((dataset) => ({
      label: dataset.label,
      data: dataset.data || [],
      borderColor: dataset.borderColor || "#3f51b5",
      backgroundColor: dataset.borderColor || "#3f51b5", // For points
      fill: false, // No fill for LineChart
      tension: 0.3,
      pointRadius: 2, // Small points for visibility
    })),
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
        beginAtZero: true,
        suggestedMax:
          Math.max(...(datasets || []).flatMap((d) => d.data || [100])) * 1.1, // Dynamic max with 10% buffer
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

export default LineChart;
