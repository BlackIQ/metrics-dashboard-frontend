import { useState, useEffect } from "react";
import Head from "next/head";

// Material UI
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

// Components
import { Table, Loading, Confirm } from "@/components";

// Hooks
import { useDisclosure, useToast } from "@/hooks";

// APIs
import {
  all as allPermissions,
  deleteOne as deletePermission,
} from "@/api/services/permission";

// Forms
import PermissionForm from "@/forms/permission";

// Neon glow animation
import { keyframes } from "@mui/system";

// Neon glow animation
const neonGlow = keyframes`
  0% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff; }
  50% { text-shadow: 0 0 8px #00e5ff, 0 0 15px #00e5ff, 0 0 20px #00e5ff; }
  100% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff; }
`;

const Index = () => {
  const [permissions, setPermissions] = useState([]);

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
      const { permissions } = await allPermissions();

      setPermissions(permissions);

      toast("Permissions retrieved", { severity: "success" });
    } catch (error) {
      toast(error.message, { severity: "error" });
    }

    setLoading(false);
  };

  const deleteData = async () => {
    setLoading(true);

    try {
      await deletePermission(currentData._id);

      toast("Permission deleted", { severity: "success" });

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
        <title>Permissions - OpenHubble Console</title>
      </Head>
      <Box>
        {!loading ? (
          <Table
            table="permission"
            data={permissions}
            addText={"Add Permission"}
            add={() => {
              setCurrentData(null);
              handleDialog();
            }}
            clk={(data) => {
              setCurrentData(data);
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
            borderRadius: "20px",
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
            sx={{ animation: `${neonGlow} 2s ease-in-out infinite` }}
          >
            {currentData ? "Edit Permission" : "Add Permission"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <PermissionForm
            currentData={currentData}
            getData={getData}
            handleClose={handleDialog}
            loading={loading}
            setLoading={setLoading}
            updateMode={!!currentData}
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
