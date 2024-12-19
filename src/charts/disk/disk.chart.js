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

const DiskChart = ({ metrics, height }) => {
  const formatChartData = (data) => {
    const labels = [
      ...new Set(data.map((item) => new Date(item._time).toLocaleString())),
    ];

    const datasets = [
      {
        label: "Read Bytes",
        data: data
          .filter((item) => item._field === "read_bytes")
          .map((item) => item._value),
        borderColor: colors.red[500],
        backgroundColor: `${colors.red[200]}40`,
        borderWidth: 1,
        fill: true,
        tension: 0,
      },
      {
        label: "Write Bytes",
        data: data
          .filter((item) => item._field === "write_bytes")
          .map((item) => item._value),
        borderColor: colors.yellow[500],
        backgroundColor: `${colors.yellow[200]}40`,
        borderWidth: 1,
        fill: true,
        tension: 0,
      },
      {
        label: "Read Count",
        data: data
          .filter((item) => item._field === "read_count")
          .map((item) => item._value),
        borderColor: colors.lightBlue[500],
        backgroundColor: `${colors.lightBlue[200]}40`,
        borderWidth: 1,
        fill: true,
        tension: 0,
      },
      {
        label: "Write Count",
        data: data
          .filter((item) => item._field === "write_count")
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

  // const [delayed, setDelayed] = useState(false);

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
        Disk I/O
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
          // animation: {
          //   onComplete: () => {
          //     setDelayed(true);
          //   },
          //   delay: (context) => {
          //     let delay = 0;

          //     if (
          //       context.type === "data" &&
          //       context.mode === "default" &&
          //       !delayed
          //     ) {
          //       delay =
          //         context.dataIndex * 300 +
          //         context.datasetIndex * 100;
          //     }

          //     return delay;
          //   },
          // },
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

export default DiskChart;
