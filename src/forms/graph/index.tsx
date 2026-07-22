import { Form } from "@/components";
import { useToast } from "@/hooks";
import { useState, useEffect } from "react";
import { createGraph, updateGraph } from "@/api/services/graph";
import { getKeys } from "@/api/services/metrics";
import { allHosts } from "@/api/services/host";
import { Box } from "@mui/material";

// updateGraph has 2 params: id of graph, data

const GraphForm = ({
  pageId,
  setLoading,
  getData,
  loading,
  handleClose,
  currentGraph = null, // Add prop for existing graph data
  updateMode = false, // Add prop to indicate update mode
}) => {
  const toast = useToast();
  const [formLoading, setFormLoading] = useState(true);
  const [hosts, setHosts] = useState([]);
  const [items, setItems] = useState({});
  const [measurements, setMeasurements] = useState([]);
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState(currentGraph || {});
  const [prevHost, setPrevHost] = useState(currentGraph?.host || "");
  const [prevMeasurement, setPrevMeasurement] = useState(
    currentGraph?.measurement || ""
  );

  const handleFormChange = (changes) => {
    if (changes.host !== prevHost) {
      setPrevHost(changes.host);
      getHostKeys(changes.host);
    }

    if (changes.measurement !== prevMeasurement) {
      setPrevMeasurement(changes.measurement);
      setFields(
        items[changes.measurement]?.map((field) => ({
          _id: field,
          label: field,
        })) || []
      );
    }

    console.log(changes);
    setFormData(changes);
  };

  useEffect(() => {
    getHosts();
    if (updateMode && currentGraph?.host) {
      getHostKeys(currentGraph.host);
    }
  }, []);

  const getHostKeys = async (hostID) => {
    if (!hostID) return;
    setFormLoading(true);
    try {
      const { keys: items } = await getKeys(hostID);
      setItems(items);
      setMeasurements(
        Object.keys(items).map((measurement) => ({
          _id: measurement,
          label: measurement,
        }))
      );

      // If in update mode, set fields for current measurement
      if (updateMode && currentGraph?.measurement) {
        setFields(
          items[currentGraph.measurement]?.map((field) => ({
            _id: field,
            label: field,
          })) || []
        );
      }

      toast("Keys fetched successfully", { severity: "success" });
    } catch (error) {
      toast(error.message, { severity: "error" });
    }
    setFormLoading(false);
  };

  const getHosts = async () => {
    setFormLoading(true);
    try {
      const { hosts } = await allHosts(1, 99);
      setHosts(hosts);
      toast("Hosts fetched successfully", { severity: "success" });
    } catch (error) {
      toast(error.message, { severity: "error" });
    }
    setFormLoading(false);
  };

  const handleSubmit = async (data) => {
    console.log(data);

    setLoading(true);
    try {
      if (updateMode && currentGraph?._id) {
        await updateGraph(currentGraph._id, { ...data, page: pageId });
        toast("Graph updated", { severity: "success" });
      } else {
        await createGraph({ ...data, page: pageId });
        toast("Graph created", { severity: "success" });
      }
      handleClose();
      getData();
    } catch (error) {
      toast(error.message, { severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Form
        name="graph"
        callback={handleSubmit}
        change={(changes) => handleFormChange(changes)}
        disables={[]}
        btnStyle={{
          fullWidth: false,
          disabled: loading,
          color: "primary",
        }}
        def={formData}
        button={updateMode ? "Update Graph" : "Create Graph"}
        selectData={{
          host: hosts.map((host) => ({
            _id: host._id,
            label: host.name,
          })),
          measurement: measurements,
          fields: fields,
        }}
      />
    </Box>
  );
};

export default GraphForm;
