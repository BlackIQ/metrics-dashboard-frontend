// - - - - - React - - - - -
import { useState, useEffect, useMemo } from "react";

// - - - - - Next - - - - -
import Head from "next/head";
import { useRouter } from "next/router";

// - - - - - MUI - - - - -
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

// - - - - - Components - - - - -
import { Loading } from "@/components";

// - - - - - Hooks - - - - -
import { useToast } from "@/hooks";

// - - - - - API - - - - -
import { readMetrics as readData } from "@/api/services/metrics";
import { allHosts } from "@/api/services/host";

// - - - - - Charts - - - - -
import AreaChart from "@/components/charts/AreaChart";
import LineChart from "@/components/charts/LineChart";

const processMetrics = (metrics, fields) => {
  if (!metrics) return { labels: [], data: [] };

  if (Array.isArray(fields)) {
    const datasets = fields.map((field, index) => {
      const fieldData = metrics[field] || [];
      const data = fieldData.map((d) => d.value);
      const labels = fieldData.map((d) =>
        new Date(d.time).toLocaleTimeString()
      );
      return {
        label: `${field.replace("_", " ")}`,
        data,
        borderColor: ["#d32f2f", "#388e3c", "#0288d1"][index % 3],
      };
    });
    const labels = datasets[0]?.data.length
      ? datasets[0].data.map((_, i) =>
          new Date(metrics[fields[0]][i].time).toLocaleTimeString()
        )
      : [];
    return { labels, datasets };
  } else {
    const fieldData = metrics[fields] || [];
    const labels = fieldData.map((d) => new Date(d.time).toLocaleTimeString());
    const data = fieldData.map((d) => d.value);
    return { labels, data };
  }
};

const Index = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [initLoading, setInitLoading] = useState(true);
  const [metrics, setMetrics] = useState({});
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const toast = useToast();

  const [hosts, setHosts] = useState([]);
  const [selectedHost, setSelectedHost] = useState("");
  const [selectedTime, setSelectedTime] = useState("-5m");

  const limit = 100;

  const timeOptions = [
    { label: "1 Minute", value: "-1m" },
    { label: "5 Minutes", value: "-5m" },
    { label: "10 Minutes", value: "-10m" },
    { label: "15 Minutes", value: "-15m" },
    { label: "30 Minutes", value: "-30m" },
    { label: "45 Minutes", value: "-45m" },
    { label: "1 Hour", value: "-1h" },
    { label: "2 Hour", value: "-2h" },
    { label: "3 Hour", value: "-3h" },
    { label: "6 Hour", value: "-6h" },
    { label: "9 Hour", value: "-9h" },
    { label: "12 Hour", value: "-12h" },
    { label: "24 Hour", value: "-24h" },
  ];

  const handleHostChange = (event) => {
    setSelectedHost(event.target.value);
    setOffset(0);
    getData(event.target.value, selectedTime, 0);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
    setOffset(0);
    getData(selectedHost, event.target.value, 0);
  };

  useEffect(() => {
    getHosts();
  }, []);

  const getHosts = async () => {
    setInitLoading(true);
    try {
      const { hosts } = await allHosts(1, 100);
      const updatedHosts = hosts.map((host, index) => ({
        ...host,
        selected: index === 0,
      }));
      setHosts(updatedHosts);
      setSelectedHost(updatedHosts[0]?._id || "");
      getData(updatedHosts[0]?._id, selectedTime, 0);
      toast("Hosts fetched successfully");
    } catch (error) {
      toast(error.message);
    }
    setInitLoading(false);
  };

  const getData = async (
    hostId = selectedHost,
    time = selectedTime,
    offsetVal = offset
  ) => {
    if (!hostId || !time) return;

    setLoading(true);
    const measurements = [
      "host_system_load_metrics",
      "host_memory_metrics",
      "host_cpu_metrics",
      "host_disk_io_metrics",
      "host_network_io_metrics",
    ];
    const params = { start: time, end: "now()", limit, offset: offsetVal };

    try {
      const { metrics: newMetrics } = await readData(
        hostId,
        measurements,
        params.start,
        params.end,
        limit,
        offsetVal
      );

      setMetrics((prev) => {
        if (offsetVal === 0) return newMetrics;
        const merged = { ...prev };
        Object.keys(newMetrics).forEach((measurement) => {
          if (!merged[measurement]) merged[measurement] = {};
          Object.keys(newMetrics[measurement]).forEach((field) => {
            merged[measurement][field] = [
              ...(merged[measurement][field] || []),
              ...newMetrics[measurement][field],
            ];
          });
        });
        return merged;
      });

      const totalPoints = Object.values(newMetrics).reduce(
        (sum, fields) =>
          sum + Object.values(fields).reduce((s, arr) => s + arr.length, 0),
        0
      );
      setHasMore(totalPoints >= limit);

      toast("Metrics fetched successfully");
    } catch (error) {
      toast(error.message);
    }
    setLoading(false);
  };

  const cpuUsage = useMemo(
    () => processMetrics(metrics.host_cpu_metrics, "total_usage"),
    [metrics]
  );
  const memoryPercent = useMemo(
    () => processMetrics(metrics.host_memory_metrics, "percent"),
    [metrics]
  );
  const systemLoadMetrics = useMemo(
    () =>
      processMetrics(metrics.host_system_load_metrics, [
        "1_min",
        "5_min",
        "15_min",
      ]),
    [metrics]
  );
  const diskMetrics = useMemo(
    () =>
      processMetrics(metrics.host_disk_io_metrics, [
        "read_bytes",
        "write_bytes",
      ]),
    [metrics]
  );
  const networkMetrics = useMemo(
    () =>
      processMetrics(metrics.host_network_io_metrics, [
        "bytes_sent",
        "bytes_received",
      ]),
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
        ) : (
          <>
            {hosts.length === 0 ? (
              <Box textAlign="center" py={4}>
                <Typography variant="h5" color="primary.main" gutterBottom>
                  No Hosts Available
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  It looks like you haven’t added any hosts yet. Add a host to
                  start monitoring metrics!
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => router.push("/panel/hosts")}
                  sx={{
                    mt: 4,
                    py: 1.5,
                    px: 4,
                    borderRadius: 2,
                    boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)",
                    "&:hover": {
                      bgcolor: "primary.dark",
                      boxShadow: "0 0 18px rgba(0, 255, 255, 0.7)",
                    },
                  }}
                >
                  Add your first host
                </Button>
              </Box>
            ) : (
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

                {hasMore && (
                  <Button
                    variant="contained"
                    size="large"
                    disabled={loading}
                    onClick={() => getData(selectedHost, selectedTime)}
                  >
                    Refresh
                  </Button>
                )}
              </Box>
            )}
          </>
        )}

        {loading && initLoading ? (
          <Loading />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <AreaChart
                title="CPU Total Usage (%)"
                data={cpuUsage.data}
                labels={cpuUsage.labels}
                borderColor="#1976d2"
                unit="%"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <AreaChart
                title="Memory Usage (%)"
                data={memoryPercent.data}
                labels={memoryPercent.labels}
                borderColor="#1976d2"
                unit="%"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LineChart
                title="Disk IO"
                datasets={diskMetrics.datasets}
                labels={diskMetrics.labels}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LineChart
                title="Network IO"
                datasets={networkMetrics.datasets}
                labels={networkMetrics.labels}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <LineChart
                title="System Load"
                datasets={systemLoadMetrics.datasets}
                labels={systemLoadMetrics.labels}
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Index;
