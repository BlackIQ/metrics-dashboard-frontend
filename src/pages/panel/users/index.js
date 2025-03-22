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
import { Table, Loading } from "@/components";

// - - - - - Hooks - - - - -
import { useDisclosure, useToast } from "@/hooks";

// - - - - - API - - - - -
import { allUsers } from "@/api/services/user";
import { allRoles } from "@/api/services/role";

// - - - - - Forms - - - - -
import UserForm from "@/forms/user";

// - - - - - Redux - - - - -
import { useSelector } from "react-redux";

// Neon glow animation
import { keyframes } from "@mui/system";

// Neon glow animation
const neonGlow = keyframes`
  0% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff; }
  50% { text-shadow: 0 0 8px #00e5ff, 0 0 15px #00e5ff, 0 0 20px #00e5ff; }
  100% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff; }
`;

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

      toast("Users and roles fetched successfully", { severity: "success" });
    } catch (error) {
      toast(error.message, { severity: "error" });
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
            addText={"Add User"}
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
            {currentData ? "Edit User" : "Add User"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <UserForm
            currentData={currentData}
            getData={getData}
            handleClose={handleDialog}
            loading={loading}
            setLoading={setLoading}
            updateMode={!!currentData}
            extraData={{ roles }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Index;
