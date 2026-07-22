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
import { allRoles, deleteRole } from "@/api/services/role";
import { allPermissions } from "@/api/services/permission";

// - - - - - Forms - - - - -
import RoleForm from "@/forms/role";

// Neon glow animation
import { keyframes } from "@mui/system";

// Neon glow animation
const neonGlow = keyframes`
  0% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff; }
  50% { text-shadow: 0 0 8px #00e5ff, 0 0 15px #00e5ff, 0 0 20px #00e5ff; }
  100% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff; }
`;

const Index = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [currentData, setCurrentData] = useState({});

  const { isOpen: confirmOpen, onToggle: handleConfirm } = useDisclosure();
  const { isOpen: dialogOpen, onToggle: handleDialog } = useDisclosure();

  const toast = useToast();

  useEffect(() => {
    getData(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const getData = async (currentPage) => {
    setLoading(true);

    try {
      const { roles, pagination } = await allRoles(currentPage);
      const { permissions } = await allPermissions(1, 100);

      setRoles(roles);
      setPermissions(permissions);

      setTotalPages(pagination.pages);

      toast("Roles and permissions fetched", { severity: "success" });
    } catch (error) {
      toast(error.message, { severity: "error" });
    }

    setLoading(false);
  };

  const deleteData = async () => {
    setLoading(true);

    try {
      await deleteRole(currentData._id);

      toast("Role deleted successfully", { severity: "success" });

      handleConfirm();
      setCurrentData({});

      getData(page);
    } catch (error) {
      toast(error.message, { severity: "error" });
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Roles - OpenHubble Console</title>
      </Head>

      <Box>
        {!loading ? (
          <Table
            table="role"
            data={roles}
            addText={"Add Role"}
            add={() => {
              setCurrentData(null);
              handleDialog();
            }}
            clk={(data) => {
              const d = { ...data };

              d.permissions = data.permissions.map(
                (permission) => permission._id
              );

              setCurrentData(d);
              handleDialog();
            }}
            del={(data) => {
              setCurrentData(data);
              handleConfirm();
            }}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
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
            {currentData ? "Edit Role" : "Add Role"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <RoleForm
            currentData={currentData}
            getData={getData}
            handleClose={handleDialog}
            loading={loading}
            setLoading={setLoading}
            updateMode={!!currentData}
            extraData={{ permissions }}
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
