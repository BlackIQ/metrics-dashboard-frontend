import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { Loading, Confirm } from "@/components";
import PageForm from "@/forms/page";
import GraphForm from "@/forms/graph";
import { useToast, useDisclosure } from "@/hooks";
import { allPages, deletePage } from "@/api/services/page";
import { allGraphs } from "@/api/services/graph";
import { readMetrics as readData } from "@/api/services/metrics";
import AreaChart from "@/components/charts/AreaChart";
import LineChart from "@/components/charts/LineChart";

// Chart Components Map
const CHART_COMPONENTS = {
  AreaChart: AreaChart,
  LineChart: LineChart,
};

// Process metrics data
const processMetrics = (metrics, fields, colors) => {
  if (!metrics || !Object.keys(metrics).length) {
    return { labels: [], datasets: [] };
  }

  const normalizedFields = Array.isArray(fields) ? fields : [fields];
  const datasets = normalizedFields.map((field) => ({
    label: field.replace("_", " "),
    data: (metrics[field] || []).map((d) => d.value || 0),
    borderColor: colors[field] || "#000000",
  }));

  const labels = datasets[0]?.data.length
    ? metrics[normalizedFields[0]].map((d) =>
        new Date(d.time).toLocaleTimeString()
      )
    : [];

  return { labels, datasets };
};

// Custom Components
const PageTabs = ({ pages, tabValue, handleTabChange, handleMenuOpen }) => (
  <Tabs
    value={tabValue}
    onChange={handleTabChange}
    aria-label="page tabs"
    sx={{ borderBottom: 1, borderColor: "divider" }}
  >
    {pages.map((page, index) => (
      <Tab
        key={page._id}
        label={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {page.title}
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleMenuOpen(e, page._id);
              }}
              sx={{ ml: 1 }}
            >
              <MoreVert fontSize="small" />
            </IconButton>
          </Box>
        }
        id={`tab-${index}`}
        aria-controls={`tabpanel-${index}`}
      />
    ))}
    <Tab
      label="Add New Page"
      id="tab-add-page"
      sx={{ fontWeight: "bold", color: "primary.main" }}
    />
  </Tabs>
);

const GraphsDisplay = ({
  graphs,
  metrics,
  setDialogGraphOpen,
  handleGraphEdit,
}) => (
  <Box sx={{ p: 3 }}>
    {!graphs.length ? (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box>
          <Typography variant="h5" color="primary.main" gutterBottom>
            No Graphs Available
          </Typography>
          <Typography variant="body1" color="textSecondary">
            There are no graphs on this page. Add your first graph!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setDialogGraphOpen(true)}
            sx={{ mt: 4, py: 1.5, px: 4, borderRadius: 2 }}
          >
            Add a graph
          </Button>
        </Box>
      </Box>
    ) : (
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setDialogGraphOpen(true)}
          sx={{ mb: 2 }}
        >
          Add New Graph
        </Button>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {graphs.map((graph) => {
            const ChartComponent = CHART_COMPONENTS[graph.chart];
            const data = processMetrics(
              metrics[graph.measurement] || {},
              graph.fields,
              graph.colors
            );
            return (
              <Box key={graph._id} sx={{ width: { xs: "100%", md: "48%" } }}>
                <Box sx={{ position: "relative" }}>
                  <ChartComponent
                    title={graph.title}
                    datasets={data.datasets}
                    labels={data.labels}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleGraphEdit(graph)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "rgba(30, 30, 30, 0.8)",
                    }}
                  >
                    <MoreVert fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    )}
  </Box>
);

const Index = () => {
  const router = useRouter();
  const toast = useToast();

  // State Management
  const [pagesLoading, setPagesLoading] = useState(true);
  const [graphsLoading, setGraphsLoading] = useState(true);
  const [pages, setPages] = useState([]);
  const [graphs, setGraphs] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [currentPageData, setCurrentPageData] = useState({});
  const [currentGraph, setCurrentGraph] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [selectedTime, setSelectedTime] = useState("-5m");
  const [dialogGraphOpen, setDialogGraphOpen] = useState(false);

  // Dialog Controls
  const { isOpen: dialogPageOpen, onToggle: handleDialogPage } =
    useDisclosure();
  const { isOpen: confirmPageOpen, onToggle: handlePageConfirm } =
    useDisclosure();

  // Time Options
  const timeOptions = [
    { label: "1 Minute", value: "-1m" },
    { label: "5 Minutes", value: "-5m" },
    { label: "10 Minutes", value: "-10m" },
    { label: "15 Minutes", value: "-15m" },
    { label: "30 Minutes", value: "-30m" },
    { label: "1 Hour", value: "-1h" },
    { label: "24 Hours", value: "-24h" },
  ];

  // API Calls
  const fetchPages = async () => {
    setPagesLoading(true);
    try {
      const { pages } = await allPages();
      setPages(pages);
      if (pages.length) {
        setTabValue(0);
        fetchGraphsAndMetrics(pages[0]._id);
      }
      toast("Pages retrieved", { severity: "success" });
    } catch (error) {
      toast(error.message, { severity: "error" });
    } finally {
      setPagesLoading(false);
    }
  };

  const fetchGraphsAndMetrics = async (pageId) => {
    setGraphsLoading(true);
    try {
      const { graphs } = await allGraphs(pageId);
      setGraphs(graphs);

      if (graphs.length) {
        const measurements = graphs.map((graph) => graph.measurement);
        const fields = Object.fromEntries(
          graphs.map((graph) => [graph.measurement, graph.fields])
        );
        const hostId = graphs[0].host;

        const query = { measurements, fields };
        const { metrics: newMetrics } = await readData(
          hostId,
          query,
          selectedTime,
          "now()"
        );

        setMetrics(newMetrics || {});
      }
      toast("Graphs and metrics retrieved", { severity: "success" });
    } catch (error) {
      toast(error.message, { severity: "error" });
    } finally {
      setGraphsLoading(false);
    }
  };

  const handleDeletePage = async () => {
    setPagesLoading(true);
    try {
      await deletePage(currentPageData._id);
      toast("Page deleted", { severity: "success" });
      handlePageConfirm();
      setCurrentPageData({});
      fetchPages();
    } catch (error) {
      toast(error.message, { severity: "error" });
    } finally {
      setPagesLoading(false);
    }
  };

  // Event Handlers
  const handleTabChange = (event, newValue) => {
    if (newValue === pages.length) {
      setCurrentPageData(null);
      handleDialogPage();
    } else {
      setTabValue(newValue);
      fetchGraphsAndMetrics(pages[newValue]._id);
    }
  };

  const handleMenuOpen = (event, pageId) => {
    setAnchorEl(event.currentTarget);
    setSelectedPageId(pageId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPageId(null);
  };

  const handleGraphEdit = (graph) => {
    setCurrentGraph(graph);
    setDialogGraphOpen(true);
  };

  const handleMenuItemClick = (action) => {
    const selectedPage = pages.find((page) => page._id === selectedPageId);
    if (!selectedPage) {
      toast("Error :(", { severity: "error" });
      return handleMenuClose();
    }

    if (action === "rename") {
      setCurrentPageData(selectedPage);
      handleDialogPage();
    } else if (action === "delete") {
      setCurrentPageData(selectedPage);
      handlePageConfirm();
    }
    handleMenuClose();
  };

  // Effects
  // Effects
  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    if (pages.length && !graphsLoading) {
      fetchGraphsAndMetrics(pages[tabValue]._id);
    }
  }, [selectedTime]);

  // Render
  return (
    <>
      <Head>
        <title>Dashboards - OpenHubble Console</title>
      </Head>
      <Box width="100%" p={2}>
        {pagesLoading ? (
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Box>
              <Typography variant="body1" color="textSecondary">
                Loading pages
              </Typography>
              <Loading />
            </Box>
          </Box>
        ) : (
          <>
            <Box mb={2} display="flex" gap={2} alignItems="center">
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Time Range</InputLabel>
                <Select
                  value={selectedTime}
                  label="Time Range"
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  {timeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {pages.length ? (
              <Box>
                <PageTabs
                  pages={pages}
                  tabValue={tabValue}
                  handleTabChange={handleTabChange}
                  handleMenuOpen={handleMenuOpen}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      bgcolor: "rgba(30, 30, 30, 0.9)",
                      border: "1px solid rgba(0, 255, 255, 0.3)",
                    },
                  }}
                >
                  <MenuItem onClick={() => handleMenuItemClick("rename")}>
                    Rename
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick("delete")}>
                    Delete
                  </MenuItem>
                </Menu>
                <GraphsDisplay
                  graphs={graphs}
                  metrics={metrics}
                  setDialogGraphOpen={setDialogGraphOpen}
                  handleGraphEdit={handleGraphEdit}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Box>
                  <Typography variant="h5" color="primary.main" gutterBottom>
                    No page Available
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    It looks like you haven’t added any pages yet. Add a page to
                    add graphs!
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => {
                      setCurrentPageData(null);
                      handleDialogPage();
                    }}
                    sx={{ mt: 4, py: 1.5, px: 4, borderRadius: 2 }}
                  >
                    Add a page
                  </Button>
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>

      <Dialog
        open={dialogPageOpen}
        onClose={handleDialogPage}
        PaperProps={{
          sx: {
            bgcolor: "rgba(30, 30, 30, 0.9)",
            border: "1px solid rgba(0, 255, 255, 0.3)",
            borderRadius: 2,
            backdropFilter: "blur(10px)",
            boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)",
            minWidth: { xs: "90%", sm: 400 },
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" color="primary.main">
            {currentPageData ? "Edit page" : "Add page"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <PageForm
            currentData={currentPageData}
            getData={fetchPages}
            handleClose={handleDialogPage}
            loading={pagesLoading}
            setLoading={setPagesLoading}
            updateMode={!!currentPageData}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={dialogGraphOpen}
        onClose={() => {
          setDialogGraphOpen(false);
          setCurrentGraph(null);
        }}
        PaperProps={{
          sx: {
            bgcolor: "rgba(30, 30, 30, 0.9)",
            border: "1px solid rgba(0, 255, 255, 0.3)",
            borderRadius: 2,
            backdropFilter: "blur(10px)",
            boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)",
            minWidth: { xs: "90%", sm: 400 },
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" color="primary.main">
            {currentGraph ? "Edit Graph" : "Add New Graph"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <GraphForm
            pageId={pages[tabValue]?._id}
            setLoading={setGraphsLoading}
            getData={() => fetchGraphsAndMetrics(pages[tabValue]._id)}
            loading={graphsLoading}
            handleClose={() => {
              setDialogGraphOpen(false);
              setCurrentGraph(null);
            }}
            currentGraph={currentGraph}
            updateMode={!!currentGraph}
          />
        </DialogContent>
      </Dialog>

      <Confirm
        onConfirm={handleDeletePage}
        isOpen={confirmPageOpen}
        handleOpen={handlePageConfirm}
      />
    </>
  );
};

export default Index;
