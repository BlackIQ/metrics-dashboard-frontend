// NextJS ReactJs
import { useState, useEffect } from "react";
import Head from "next/head";

// Material UI
import { Box, Grid2 as Grid } from "@mui/material";

// Components
import { Loading } from "@/components";

// Hooks
import { useToast } from "@/hooks";

// APIs
import { READ as readData } from "@/api/services/metrics";

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

  const [systemloadData, setSystemloadData] = useState([]);
  const [memoryData, setMemoryData] = useState([]);
  const [cpuData, setCpuData] = useState([]);
  // const [swapData, setSwapData] = useState([]);
  const [diskData, setDiskData] = useState([]);
  const [networkData, setNetworkData] = useState([]);

  const toast = useToast();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);

    const hostID = "675a7603673d505e643b33ab";
    const measurements = [
      "system_load_metrics",
      "memory_metrics",
      "cpu_metrics",
      "swap_metrics",
      "disk_io_metrics",
      "network_io_metrics",
    ];
    const params = {
      start: "-1h",
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
        (item) => item._measurement === "system_load_metrics"
      );
      const memoryMetrics = metrics.filter(
        (item) => item._measurement === "memory_metrics"
      );
      const cpuMetrics = metrics.filter(
        (item) => item._measurement === "cpu_metrics"
      );
      // const swapMetrics = metrics.filter(
      //   (item) => item._measurement === "cpu_metrics"
      // );
      const diskMetrics = metrics.filter(
        (item) => item._measurement === "disk_io_metrics"
      );
      const networkMetrics = metrics.filter(
        (item) => item._measurement === "network_io_metrics"
      );

      setSystemloadData(systemloadMetrics);
      setMemoryData(memoryMetrics);
      setCpuData(cpuMetrics);
      // setSwapData(swapMetrics);
      setDiskData(diskMetrics);
      setNetworkData(networkMetrics);

      toast("Metrics got");
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>{"Dashboards"}</title>
      </Head>
      <Box width="100%">
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
