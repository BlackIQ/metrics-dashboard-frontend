"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Button, Grid } from "@mui/material";
import { Loading } from "@/components";
import { useToast } from "@/hooks";
import { READ as readData } from "@/api/services/metrics";
import { all as allHosts } from "@/api/services/host";
import { useSelector } from "react-redux";
import AreaChart from "@/components/charts/AreaChart";
import LineChart from "@/components/charts/LineChart";

// Process metrics for single or multiple fields
const processMetrics = (metrics, fields) => {
  if (Array.isArray(fields)) {
    const uniqueTimes = [
      ...new Set(metrics.map((m) => new Date(m._time).toLocaleTimeString())),
    ].sort(); // Unique sorted timestamps
    return fields.map((field) => {
      const filteredMetrics = metrics.filter((m) => m._field === field);
      const data = uniqueTimes.map((time) => {
        const metric = filteredMetrics.find(
          (m) => new Date(m._time).toLocaleTimeString() === time
        );
        return metric ? metric._value : null; // Null for missing data
      });
      return { field, data };
    });
  } else {
    const filteredMetrics = metrics.filter((m) => m._field === fields);
    const labels = filteredMetrics.map((m) =>
      new Date(m._time).toLocaleTimeString()
    );
    const data = filteredMetrics.map((m) => m._value);
    return { labels, data };
  }
};

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [initLoading, setInitLoading] = useState(true);

  const { role, _id } = useSelector((state) => state.user);

  const [systemloadData, setSystemloadData] = useState([]);
  const [memoryData, setMemoryData] = useState([]);
  const [diskData, setDiskData] = useState([]);
  const [networkData, setNetworkData] = useState([]);
  const [cpuData, setCpuData] = useState([]);

  const toast = useToast();

  const [hosts, setHosts] = useState([]);
  const [endTimes, setEndTimes] = useState([
    { label: "1 Minute", value: "-1m", selected: false },
    { label: "5 Minutes", value: "-5m", selected: true },
    { label: "10 Minutes", value: "-10m", selected: false },
    { label: "15 Minutes", value: "-15m", selected: false },
    { label: "30 Minutes", value: "-30m", selected: false },
    { label: "45 Minutes", value: "-45m", selected: false },
    { label: "1 Hour", value: "-1h", selected: false },
  ]);

  const changeFilter = (type, value) => {
    if (type === "host") {
      setHosts((prev) =>
        prev.map((host) => ({ ...host, selected: host._id === value }))
      );
    } else if (type === "time") {
      setEndTimes((prev) =>
        prev.map((time) => ({ ...time, selected: time.value === value }))
      );
    }
    getData();
  };

  const getSelected = () => {
    const selectedHost = hosts.find((host) => host.selected);
    const selectedTime = endTimes.find((time) => time.selected);
    return {
      host: selectedHost?._id || null,
      time: selectedTime?.value || null,
    };
  };

  useEffect(() => {
    getHosts();
  }, []);

  const getHosts = async () => {
    setInitLoading(true);
    const filter = role?.value === "user" ? { user: _id } : {};
    try {
      const { hosts } = await allHosts(filter);
      const updatedHosts = hosts.map((host, index) => ({
        ...host,
        selected: index === 0,
      }));
      setHosts(updatedHosts);
      getData();
      toast("Hosts fetched successfully");
    } catch (error) {
      toast(error.message);
    }
    setInitLoading(false);
  };

  const getData = async () => {
    const filter = getSelected();
    if (!filter.host || !filter.time) return;

    setLoading(true);
    const hostID = filter.host;
    const measurements = [
      "host_system_load_metrics",
      "host_memory_metrics",
      "host_cpu_metrics",
      "host_disk_io_metrics",
      "host_network_io_metrics",
    ];
    const params = { start: filter.time, end: "now()" };

    try {
      const { metrics } = await readData(
        hostID,
        measurements,
        params.start,
        params.end
      );
      setSystemloadData(
        metrics.filter((m) => m._measurement === "host_system_load_metrics")
      );
      setMemoryData(
        metrics.filter((m) => m._measurement === "host_memory_metrics")
      );
      setDiskData(
        metrics.filter((m) => m._measurement === "host_disk_io_metrics")
      );
      setNetworkData(
        metrics.filter((m) => m._measurement === "host_network_io_metrics")
      );
      setCpuData(metrics.filter((m) => m._measurement === "host_cpu_metrics"));
      toast("Metrics fetched successfully");
    } catch (error) {
      toast(error.message);
    }
    setLoading(false);
  };

  // Prepare chart data
  const cpuUsage = processMetrics(cpuData, "total_usage");
  const memoryPercent = processMetrics(memoryData, "percent");
  const systemLoadMetrics = processMetrics(systemloadData, [
    "1_min",
    "5_min",
    "15_min",
  ]);
  const diskMetrics = processMetrics(diskData, ["read_bytes", "write_bytes"]);
  const networkMetrics = processMetrics(networkData, [
    "bytes_sent",
    "bytes_received",
  ]);

  const diskDatasets = diskMetrics.map((metric, index) => ({
    label: `${metric.field.replace("_", " ")} Load`,
    data: metric.data,
    borderColor: ["#d32f2f", "#388e3c", "#0288d1"][index], // Red, Green, Blue
  }));
  const diskLabels = [
    ...new Set(
      systemloadData.map((m) => new Date(m._time).toLocaleTimeString())
    ),
  ].sort();

  const networkDatasets = networkMetrics.map((metric, index) => ({
    label: `${metric.field.replace("_", " ")} Load`,
    data: metric.data,
    borderColor: ["#d32f2f", "#388e3c", "#0288d1"][index], // Red, Green, Blue
  }));
  const networkLabels = [
    ...new Set(
      systemloadData.map((m) => new Date(m._time).toLocaleTimeString())
    ),
  ].sort();

  const systemLoadDatasets = systemLoadMetrics.map((metric, index) => ({
    label: `${metric.field.replace("_", " ")} Load`,
    data: metric.data,
    borderColor: ["#d32f2f", "#388e3c", "#0288d1"][index], // Red, Green, Blue
  }));
  const systemLoadLabels = [
    ...new Set(
      systemloadData.map((m) => new Date(m._time).toLocaleTimeString())
    ),
  ].sort();

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
            <Box mb={2}>
              {hosts.map((item, index) => (
                <Button
                  key={item._id}
                  variant={item.selected ? "contained" : "outlined"}
                  color="primary"
                  size="medium"
                  sx={{ mr: index + 1 !== hosts.length ? 1 : 0 }}
                  onClick={() => changeFilter("host", item._id)}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
            <Box mb={4}>
              {endTimes.map((item, index) => (
                <Button
                  key={item.value}
                  variant={item.selected ? "contained" : "outlined"}
                  color="primary"
                  size="medium"
                  sx={{ mr: index + 1 !== endTimes.length ? 1 : 0 }}
                  onClick={() => changeFilter("time", item.value)}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </>
        )}
        {loading ? (
          <Loading />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <AreaChart
                title="CPU Total Usage (%)"
                data={cpuUsage.data}
                labels={cpuUsage.labels}
                backgroundColor="rgba(25, 118, 210, 0.5)"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <AreaChart
                title="Memory Usage (%)"
                data={memoryPercent.data}
                labels={memoryPercent.labels}
                backgroundColor="rgba(25, 118, 210, 0.5)"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LineChart
                title="Disk IO"
                datasets={diskDatasets}
                labels={diskLabels}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LineChart
                title="Network IO"
                datasets={networkDatasets}
                labels={networkLabels}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <LineChart
                title="System Load"
                datasets={systemLoadDatasets}
                labels={systemLoadLabels}
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Index;
