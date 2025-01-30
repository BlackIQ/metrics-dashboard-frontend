// NextJS ReactJs
import { useState, useEffect } from "react";
import Head from "next/head";

// Material UI
import { Box, Button, Grid2 as Grid } from "@mui/material";

// Components
import { Loading } from "@/components";

// Hooks
import { useToast } from "@/hooks";

// APIs
import { READ as readData } from "@/api/services/metrics";
import { all as allHosts } from "@/api/services/host";

// Redux
import { useSelector } from "react-redux";

// Charts
import {
  SystemloadChart,
  MemoryChart,
  CpuChart,
  NetworkChart,
  DiskChart,
} from "@/charts";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [initLoading, setInitLoading] = useState(true);

  const { role, _id } = useSelector((state) => state.user);

  const [systemloadData, setSystemloadData] = useState([]);
  const [memoryData, setMemoryData] = useState([]);
  const [cpuData, setCpuData] = useState([]);
  // const [swapData, setSwapData] = useState([]);
  const [diskData, setDiskData] = useState([]);
  const [networkData, setNetworkData] = useState([]);

  const toast = useToast();

  const [hosts, setHosts] = useState([]);

  const [endTimes, setEndTimes] = useState([
    {
      label: "1 Minute",
      value: "-1m",
      selected: false,
    },
    {
      label: "5 Minutes",
      value: "-5m",
      selected: true,
    },
    {
      label: "10 Minutes",
      value: "-10m",
      selected: false,
    },
    {
      label: "15 Minutes",
      value: "-15m",
      selected: false,
    },
    {
      label: "30 Minutes",
      value: "-30m",
      selected: false,
    },
    {
      label: "45 Minutes",
      value: "-45m",
      selected: false,
    },
    {
      label: "1 Hour",
      value: "-1h",
      selected: false,
    },
  ]);

  const changeFilter = (type, value) => {
    if (type === "host") {
      setHosts((prevHosts) =>
        prevHosts.map((host) =>
          host._id === value
            ? { ...host, selected: true }
            : { ...host, selected: false }
        )
      );
    } else if (type === "time") {
      setEndTimes((prevEndTimes) =>
        prevEndTimes.map((time) =>
          time.value === value
            ? { ...time, selected: true }
            : { ...time, selected: false }
        )
      );
    }

    getData();
  };

  const getSelected = () => {
    const selectedHost = hosts.find((host) => host.selected);

    const selectedTime = endTimes.find((time) => time.selected);

    return {
      host: selectedHost ? selectedHost._id : null,
      time: selectedTime ? selectedTime.value : null,
    };
  };

  useEffect(() => {
    getHosts();
  }, []);

  const getHosts = async () => {
    setInitLoading(true);

    const filter = {};

    if (role?.value === "user") {
      filter["user"] = _id;
    }

    try {
      const { hosts } = await allHosts(filter);

      const updatedHosts = hosts.map((host, index) => ({
        ...host,
        selected: index === 0,
      }));

      setHosts(updatedHosts);

      getData();

      toast("Hosts got");
    } catch (error) {
      toast(error.message);
    }

    setInitLoading(false);
  };

  const getData = async () => {
    const filter = getSelected();

    setLoading(true);

    const hostID = filter.host;
    const measurements = [
      "host_system_load_metrics",
      "host_memory_metrics",
      "host_cpu_metrics",
      "host_swap_metrics",
      "host_disk_io_metrics",
      "host_network_io_metrics",
    ];
    const params = {
      start: filter.time,
      end: "now()",
    };

    try {
      const { metrics } = await readData(
        hostID,
        measurements,
        params.start,
        params.end
      );

      // const uniqueMeasurements = [
      //   ...new Set(metrics.map((item) => item._measurement)),
      // ];

      const systemloadMetrics = metrics.filter(
        (item) => item._measurement === "host_system_load_metrics"
      );
      const memoryMetrics = metrics.filter(
        (item) => item._measurement === "host_memory_metrics"
      );
      const cpuMetrics = metrics.filter(
        (item) => item._measurement === "host_cpu_metrics"
      );
      // const swapMetrics = metrics.filter(
      //   (item) => item._measurement === "host_cpu_metrics"
      // );
      const diskMetrics = metrics.filter(
        (item) => item._measurement === "host_disk_io_metrics"
      );
      const networkMetrics = metrics.filter(
        (item) => item._measurement === "host_network_io_metrics"
      );

      setSystemloadData(systemloadMetrics);
      setMemoryData(memoryMetrics);
      setCpuData(cpuMetrics);
      // setSwapData(swapMetrics);
      setDiskData(diskMetrics);
      setNetworkData(networkMetrics);

      console.log(metrics);

      toast("Metrics got");
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Dashboards - OpenHubble Console</title>
      </Head>
      <Box width="100%">
        {!initLoading ? (
          <Box>
            {hosts.map((item, index) => (
              <Button
                key={item._id}
                variant={item.selected ? "contained" : "outlined"}
                color="primary"
                size="medium"
                sx={{
                  mr: index + 1 !== hosts.length,
                  color: item.selected ? "white" : "primary.main",
                }}
                onClick={() => changeFilter("host", item._id)}
              >
                {item.name}
              </Button>
            ))}
            <br />
            <br />
            {endTimes.map((item, index) => (
              <Button
                key={item.value}
                variant={item.selected ? "contained" : "outlined"}
                color="primary"
                size="medium"
                sx={{
                  mr: index + 1 !== endTimes.length,
                  color: item.selected ? "white" : "primary.main",
                }}
                onClick={() => changeFilter("time", item.value)}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        ) : (
          <Loading />
        )}
        <br />
        <br />
        {!loading ? (
          <Box>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Box>
                  <MemoryChart metrics={memoryData} height="60px" />
                </Box>
              </Grid>
              <Grid size={6}>
                <Box>
                  <CpuChart metrics={cpuData} height="60px" />
                </Box>
              </Grid>
              <Grid size={6}>
                <Box>
                  <NetworkChart metrics={networkData} height="60px" />
                </Box>
              </Grid>
              <Grid size={6}>
                <Box>
                  <DiskChart metrics={diskData} height="60px" />
                </Box>
              </Grid>
              <Grid size={12}>
                <Box>
                  <SystemloadChart metrics={systemloadData} height="30px" />
                </Box>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Loading />
        )}
      </Box>
    </>
  );
};

export default Index;
