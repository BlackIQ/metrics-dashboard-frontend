// NextJS ReactJs
import { useState, useEffect } from "react";
import Head from "next/head";

// Material UI
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";

// Components
import { Table, Loading, Confirm } from "@/components";

// Hooks
import { useDisclosure, useToast } from "@/hooks";

// APIs
import { all as allRoles, deleteOne as deleteRole } from "@/api/services/role";
import { all as allPermissions } from "@/api/services/permission";

// Forms
import RoleForm from "@/forms/role";

const Index = () => {
  const [roles, setRoles] = useState([]);
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
      const { roles } = await allRoles();
      const { permissions } = await allPermissions();

      setRoles(roles);
      setPermissions(permissions);

      toast("Roles got");
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  const deleteData = async () => {
    setLoading(true);

    try {
      await deleteRole(currentData._id);

      toast("Role deleted");

      handleConfirm();
      setCurrentData({});
      getData();
    } catch (error) {
      toast(error.message);
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
            addText={"Add role"}
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
          />
        ) : (
          <Loading />
        )}
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={handleDialog}
        PaperProps={{ sx: { borderRadius: "20px" } }}
      >
        <DialogTitle>{"Role"}</DialogTitle>
        <DialogContent>
          <RoleForm
            currentData={currentData}
            getData={getData}
            handleClose={handleDialog}
            loading={loading}
            setLoading={setLoading}
            updateMode={currentData}
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
