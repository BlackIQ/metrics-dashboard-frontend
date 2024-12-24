// NextJS ReactJs
import { useState, useEffect } from "react";
import Head from "next/head";

// Material UI
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";

// Redux
import { useSelector } from "react-redux";

// Components
import { Table, Loading } from "@/components";

// Hooks
import { useDisclosure, useToast } from "@/hooks";

// APIs
import { all as allUsers } from "@/api/services/user";
import { all as allRoles } from "@/api/services/role";

// Forms
import UserForm from "@/forms/user";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [currentData, setCurrentData] = useState({});

  const { role } = useSelector((state) => state.user);

  const { isOpen: dialogOpen, onToggle: handleDialog } = useDisclosure();

  const toast = useToast();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);

    try {
      const { users } = await allUsers();
      const { roles } = await allRoles();

      setUsers(users);
      setRoles(roles);

      toast("Users got");
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Users - OpenHubble Console</title>
      </Head>
      <Box>
        {!loading ? (
          <Table
            table="user"
            data={users}
            addText={"Add user"}
            add={
              role?.value === "superuser"
                ? () => {
                    setCurrentData(null);
                    handleDialog();
                  }
                : null
            }
            clk={(data) => {
              const d = { ...data };

              d.role = data.role._id;

              setCurrentData(d);
              handleDialog();
            }}
          />
        ) : (
          <Loading />
        )}
      </Box>

      <Dialog
        open={dialogOpen}
        maxWidth="sm"
        fullWidth
        onClose={handleDialog}
        PaperProps={{ sx: { borderRadius: "15px" } }}
      >
        <DialogTitle>{"User"}</DialogTitle>
        <DialogContent>
          <UserForm
            currentData={currentData}
            getData={getData}
            handleClose={handleDialog}
            loading={loading}
            setLoading={setLoading}
            updateMode={currentData}
            extraData={{ roles }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Index;
