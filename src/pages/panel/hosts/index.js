// - - - - - React - - - - -
import { useState, useEffect } from "react";

// - - - - - Next - - - - -
import Head from "next/head";

// - - - - - MUI - - - - -
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

// - - - - - Components - - - - -
import { Table, Loading, Confirm } from "@/components";

// - - - - - Hooks - - - - -
import { useDisclosure, useToast } from "@/hooks";

// - - - - - API - - - - -
import { allHosts, deleteHost } from "@/api/services/host";
import { allGroups } from "@/api/services/group";
import { allTags } from "@/api/services/tag";

// - - - - - Forms - - - - -
import HostForm from "@/forms/host";

// Neon glow animation
import { keyframes } from "@mui/system";

// Neon glow animation
const neonGlow = keyframes`
  0% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff; }
  50% { text-shadow: 0 0 8px #00e5ff, 0 0 15px #00e5ff, 0 0 20px #00e5ff; }
  100% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff; }
`;

const Index = () => {
  const [hosts, setHosts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [tags, setTags] = useState([]);

  const [loading, setLoading] = useState(true);
  const [currentData, setCurrentData] = useState({});

  const { isOpen: confirmOpen, onToggle: handleConfirm } = useDisclosure();
  const { isOpen: dialogOpen, onToggle: handleDialog } = useDisclosure();

  const toast = useToast();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);

    try {
      const { hosts } = await allHosts();
      const { groups } = await allGroups();
      const { tags } = await allTags();

      setHosts(hosts);
      setGroups(groups);
      setTags(tags);

      toast("Hosts fetched successfully", { severity: "success" });
    } catch (error) {
      toast(error.message, { severity: "error" });
    }

    setLoading(false);
  };

  const deleteData = async () => {
    setLoading(true);

    try {
      await deleteHost(currentData._id);

      toast("Host deleted successfully", { severity: "success" });

      handleConfirm();
      setCurrentData({});
      getData();
    } catch (error) {
      toast(error.message, { severity: "error" });
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Hosts - OpenHubble Console</title>
      </Head>
      
      <Box>
        {!loading ? (
          <Table
            table="host"
            data={hosts}
            addText={"Add Host"}
            add={() => {
              setCurrentData(null);
              handleDialog();
            }}
            clk={(data) => {
              const d = { ...data };

              d.groups = data.groups.map((group) => group._id);
              d.tags = data?.tags?.map((tag) => tag._id);

              setCurrentData(d);
              handleDialog();
            }}
            del={(data) => {
              setCurrentData(data);
              handleConfirm();
            }}
          />
        ) : (
          <Loading />
        )}
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={handleDialog}
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
          <Typography
            variant="h6"
            // fontFamily="Orbitron"
            color="primary.main"
            // sx={{ animation: `${neonGlow} 2s ease-in-out infinite` }}
          >
            {currentData ? "Edit Host" : "Add Host"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <HostForm
            currentData={currentData}
            getData={getData}
            handleClose={handleDialog}
            loading={loading}
            setLoading={setLoading}
            updateMode={currentData}
            extraData={{ groups, tags }}
          />
        </DialogContent>
      </Dialog>

      <Confirm
        onConfirm={deleteData}
        isOpen={confirmOpen}
        handleOpen={handleConfirm}
      />
    </>
  );
};

export default Index;
