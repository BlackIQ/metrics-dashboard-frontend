"use client";

// - - - - - ChartJS  - - - - -
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

// - - - - - MUI  - - - - -
import { Box, Paper, Typography } from "@mui/material";

// Dashboard Colors
import { dashboardColors } from "@/theme/dashboard-colors";

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
    labels: labels || [],
    datasets: (datasets || []).map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data || [],
      borderColor:
        dataset.borderColor || dashboardColors[index % dashboardColors.length],
      backgroundColor:
        (dataset.borderColor ||
          dashboardColors[index % dashboardColors.length]) + "33",
      borderWidth: 2,
      fill: false,
      tension: 0,
      pointRadius: 1,
      pointHoverRadius: 1,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 12, family: "Arial" },
          color: "#666",
        },
      },
      title: { display: false },
      tooltip: {
        backgroundColor: "#333",
        titleFont: { size: 12 },
        bodyFont: { size: 12 },
        padding: 8,
      },
    },
    scales: {
      x: {
        grid: { color: "#444", borderDash: [2, 2] },
        ticks: { color: "#666", maxTicksLimit: 8 },
      },
      y: {
        grid: { color: "#444", borderDash: [2, 2] },
        ticks: { color: "#666" },
        beginAtZero: true,
      },
    },
  };

  return (
    <Box
      component={Paper}
      p={2}
      elevation={2}
      sx={{
        height: "100%",
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontSize: "14px" }}>
        {title}
      </Typography>
      <Box sx={{ height: "300px" }}>
        <Line data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default LineChart;
