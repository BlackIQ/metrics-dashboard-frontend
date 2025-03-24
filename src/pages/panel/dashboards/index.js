import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import { Loading } from "@/components";
import { useToast } from "@/hooks";
import { readMetrics as readData } from "@/api/services/metrics";
import { allHosts } from "@/api/services/host";
import AreaChart from "@/components/charts/AreaChart";
import LineChart from "@/components/charts/LineChart";

// Dashboard Colors
import { dashboardColors } from "@/theme/dashboard-colors";

const processMetrics = (metrics, fields, config) => {
  if (!metrics || !Object.keys(metrics).length) {
    console.log("No metrics provided:", metrics);
    return { labels: [], datasets: [] };
  }

  const normalizedFields = Array.isArray(fields) ? fields : [fields];
  const datasets = normalizedFields.map((field) => {
    const fieldData = metrics[field] || [];
    if (!fieldData.length) {
      console.log(`No data for field: ${field}`);
    }
    return {
      label: field.replace("_", " "),
      data: fieldData.map((d) => d.value || 0),
      borderColor: config.colors[field] || dashboardColors[9],
    };
  });

  const labels = datasets[0]?.data.length
    ? metrics[normalizedFields[0]].map((d) =>
        new Date(d.time).toLocaleTimeString()
      )
    : [];

  return { labels, datasets };
};

const CHART_CONFIGS = {
  cpu: {
    measurement: "host_cpu_metrics",
    fields: ["total_usage"],
    title: "CPU Total Usage (%)",
    chart: AreaChart,
    unit: "%",
    colors: {
      total_usage: dashboardColors[6],
    },
  },
  memory: {
    measurement: "host_memory_metrics",
    fields: ["percent"],
    title: "Memory Usage (%)",
    chart: AreaChart,
    unit: "%",
    colors: {
      percent: dashboardColors[5],
    },
  },
  disk: {
    measurement: "host_disk_io_metrics",
    fields: ["read_bytes", "write_bytes"],
    title: "Disk IO",
    chart: LineChart,
    colors: {
      read_bytes: dashboardColors[3],
      write_bytes: dashboardColors[7],
    },
  },
  network: {
    measurement: "host_network_io_metrics",
    fields: ["bytes_sent", "bytes_received"],
    title: "Network IO",
    chart: LineChart,
    colors: {
      bytes_sent: dashboardColors[4],
      bytes_received: dashboardColors[8],
    },
  },
  systemLoad: {
    measurement: "host_system_load_metrics",
    fields: ["1_min", "5_min", "15_min"],
    title: "System Load",
    chart: LineChart,
    colors: {
      "1_min": dashboardColors[0],
      "5_min": dashboardColors[1],
      "15_min": dashboardColors[2],
    },
  },
};

const Index = () => {
  const router = useRouter();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [metrics, setMetrics] = useState({});
  const [hosts, setHosts] = useState([]);
  const [selectedHost, setSelectedHost] = useState("");
  const [selectedTime, setSelectedTime] = useState("-5m");

  const timeOptions = [
    { label: "1 Minute", value: "-1m" },
    { label: "5 Minutes", value: "-5m" },
    { label: "10 Minutes", value: "-10m" },
    { label: "15 Minutes", value: "-15m" },
    { label: "30 Minutes", value: "-30m" },
    { label: "1 Hour", value: "-1h" },
    { label: "24 Hours", value: "-24h" },
  ];

  useEffect(() => {
    const fetchHosts = async () => {
      setInitLoading(true);
      try {
        const { hosts } = await allHosts(1, 100);
        const updatedHosts = hosts.map((host, index) => ({
          ...host,
          selected: index === 0,
        }));
        setHosts(updatedHosts);
        setSelectedHost(updatedHosts[0]?._id || "");
        await fetchMetrics(updatedHosts[0]?._id, selectedTime);
        toast("Hosts fetched successfully");
      } catch (error) {
        toast(error.message);
      }
      setInitLoading(false);
    };
    fetchHosts();
  }, []);

  const fetchMetrics = async (hostId, timeRange) => {
    if (!hostId || !timeRange) return;

    setLoading(true);
    try {
      const measurements = Object.values(CHART_CONFIGS).map(
        (config) => config.measurement
      );
      const fields = Object.fromEntries(
        Object.entries(CHART_CONFIGS).map(([_, config]) => [
          config.measurement,
          config.fields,
        ])
      );

      const query = { measurements, fields };
      const { metrics: newMetrics } = await readData(
        hostId,
        query,
        timeRange,
        "now()"
      );

      setMetrics(newMetrics || {});
      toast("Metrics fetched successfully");
    } catch (error) {
      toast(error.message);
    }
    setLoading(false);
  };

  const handleHostChange = (event) => {
    const hostId = event.target.value;
    setSelectedHost(hostId);
    fetchMetrics(hostId, selectedTime);
  };

  const handleTimeChange = (event) => {
    const timeRange = event.target.value;
    setSelectedTime(timeRange);
    fetchMetrics(selectedHost, timeRange);
  };

  const chartData = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(CHART_CONFIGS).map(([key, config]) => [
          key,
          processMetrics(metrics[config.measurement], config.fields, config),
        ])
      ),
    [metrics]
  );

  return (
    <>
      <Head>
        <title>Dashboards - OpenHubble Console</title>
      </Head>

      <Box width="100%" p={2}>
        {initLoading ? (
          <Loading />
        ) : hosts.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Typography variant="h5" color="primary.main" gutterBottom>
              No Hosts Available
            </Typography>
            <Typography variant="body1" color="textSecondary">
              It looks like you haven’t added any hosts yet. Add a host to start
              monitoring metrics!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => router.push("/panel/hosts")}
              sx={{ mt: 4, py: 1.5, px: 4, borderRadius: 2 }}
            >
              Add your first host
            </Button>
          </Box>
        ) : (
          <>
            <Box mb={4} display="flex" gap={2} alignItems="center">
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Host</InputLabel>
                <Select
                  value={selectedHost}
                  label="Host"
                  onChange={handleHostChange}
                >
                  {hosts.map((host) => (
                    <MenuItem key={host._id} value={host._id}>
                      {host.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Time Range</InputLabel>
                <Select
                  value={selectedTime}
                  label="Time Range"
                  onChange={handleTimeChange}
                >
                  {timeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {loading && <Loading py={0} />}
            </Box>

            <Grid container spacing={2}>
              {Object.entries(CHART_CONFIGS).map(([key, config]) => {
                const ChartComponent = config.chart;
                const data = chartData[key];
                return (
                  <Grid item xs={12} md={6} key={key}>
                    <ChartComponent
                      title={config.title}
                      datasets={data.datasets}
                      labels={data.labels}
                      unit={config.unit}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
      </Box>
    </>
  );
};

export default Index;
