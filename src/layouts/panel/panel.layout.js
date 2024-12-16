import {
  Drawer as MuiDrawer,
  List,
  ListItemText,
  ListItemButton,
  Box,
  IconButton,
  ListItemIcon,
  CssBaseline,
} from "@mui/material";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { setUser, unsetUser } from "@/redux/actions/user";
import { unsetSession } from "@/redux/actions/session";

import API from "@/api";

import { single } from "@/api/services/user";
import { Loading } from "@/components";

import { styled } from "@mui/material/styles";

import {
  Menu as MenuIcon,
  Storage,
  Person,
  Home,
  LocalOffer,
  Category,
  LocalPolice,
  Key,
  Groups,
  Warning,
  Logout,
} from "@mui/icons-material";

import { useToast } from "@/hooks";

const openedMixin = (theme, dw) => ({
  width: dw,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  borderWidth: 0,
  overflowX: "hidden",
});

const closedMixin = (theme, dw) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  borderWidth: 0,
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 0px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 0px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, dw }) => ({
  width: dw,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme, dw),
    "& .MuiDrawer-paper": openedMixin(theme, dw),
    width: dw,
    boxSizing: "border-box",
    backgroundColor: "red",
  }),
  ...(!open && {
    ...closedMixin(theme, dw),
    "& .MuiDrawer-paper": closedMixin(theme, dw),
    width: dw,
    boxSizing: "border-box",
    backgroundColor: "white",
  }),
}));

const AppLayout = ({ children }) => {
  const history = useRouter();
  const dispatch = useDispatch();

  const toast = useToast();

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };

  const [permissions, setPermissions] = useState([]);

  const { session: token, user } = useSelector((state) => state);

  const getData = async () => {
    try {
      const data = await single(user._id);

      const nuser = { ...data.user, docs: data.docs };

      setPermissions(data.user.role.permissions);

      dispatch(setUser(nuser));

      setLoading(false);
    } catch (error) {
      toast(error.message);

      logout();
    }
  };

  useEffect(() => {
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      getData();
    } else {
      history.push("/auth");
    }
  }, []);

  const logout = () => {
    dispatch(unsetUser());
    dispatch(unsetSession());

    history.push("/");
  };

  const getIcon = (value) => {
    switch (value) {
      case "home":
        return <Home />;
      case "me":
        return (
          // <Box
          //   sx={{
          //     borderRadius: 1,
          //     border: "solid 1px black",
          //     height: "100%",
          //     justifyContent: "center",
          //     alignItems: "center",
          //     display: "flex",
          //     p: 0.1,
          //   }}
          // >
          <Person />
          // </Box>
        );
      case "logout":
        return <Logout sx={{ color: "error.main" }} />;
      case "hosts":
        return <Storage />;
      case "tags":
        return <LocalOffer />;
      case "groups":
        return <Category />;
      case "roles":
        return <LocalPolice />;
      case "permissions":
        return <Key />;
      case "users":
        return <Groups />;
      default:
        return <Warning />;
    }
  };

  return loading ? (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loading />
    </Box>
  ) : (
    <Box width="100%">
      <Box sx={{ display: "flex", width: "100%" }}>
        <CssBaseline />
        <Drawer
          dw={open ? 240 : 50}
          variant="permanent"
          open={open}
          // onMouseMove={() => setOpen(true)}
          // onMouseLeave={() => setOpen(false)}
          anchor={"left"}
        >
          <DrawerHeader>
            <Box
              sx={{
                display: "flex",
                height: "160%",
                justifyContent: "center",
                alignItems: "center",
                px: open && 1,
              }}
            >
              {/* {open && (
                <Typography color="primary" variant="h4">AMCE</Typography>
              )} */}
              <IconButton onClick={handleDrawer} sx={{ borderRadius: 2 }}>
                <MenuIcon color="primary" />
              </IconButton>
            </Box>
          </DrawerHeader>

          <List sx={{ px: 0 }}>
            <ListItemButton
              onClick={() => history.push("/panel")}
              sx={{
                m: open && 1,
                borderRadius: open ? 2 : 0,
                backgroundColor: history.pathname === "/panel" && "#444",
              }}
            >
              <ListItemIcon>{getIcon("home")}</ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
            {permissions ? (
              permissions
                .filter((permission) => permission.value !== "settings")
                .map((permission) => (
                  <ListItemButton
                    key={permission._id}
                    onClick={() => {
                      history.push(`/panel/${permission.value}`);
                      setOpen(false);
                    }}
                    sx={{
                      m: open && 1,
                      borderRadius: open ? 2 : 0,
                      backgroundColor:
                        history.pathname === `/panel/${permission.value}` &&
                        "#444",
                    }}
                  >
                    <ListItemIcon>{getIcon(permission.value)}</ListItemIcon>
                    <ListItemText primary={permission.label} />
                  </ListItemButton>
                ))
            ) : (
              <Loading />
            )}
            <ListItemButton
              onClick={() => history.push("/panel/settings")}
              sx={{
                borderRadius: open ? 2 : 0,
                m: open && 1,
                backgroundColor:
                  history.pathname === "/panel/settings" && "#444",
              }}
            >
              <ListItemIcon>{getIcon("me")}</ListItemIcon>
              <ListItemText primary={user.firstName} />
            </ListItemButton>
            <ListItemButton
              onClick={logout}
              sx={{
                m: open && 1,
                borderRadius: open ? 2 : 0,
              }}
            >
              <ListItemIcon>{getIcon("logout")}</ListItemIcon>
              <ListItemText
                sx={{
                  color: "error.main",
                }}
                primary={"Logout"}
              />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            px: 4,
            py: 3,
          }}
        >
          <Box width="100%">{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
