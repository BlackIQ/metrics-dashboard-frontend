"use client";

// - - - - - MUI - - - - -
import {
  Drawer as MuiDrawer,
  List,
  ListItemText,
  ListItemButton,
  Box,
  IconButton,
  ListItemIcon,
  CssBaseline,
  Divider,
  Typography,
} from "@mui/material";

// - - - - - MUI Icons - - - - -
import {
  Menu as MenuIcon,
  Storage,
  Person,
  Home,
  LocalOffer,
  Category,
  Warning,
  Logout,
  Dashboard,
} from "@mui/icons-material";

// - - - - - Next - - - - -
import { useRouter } from "next/navigation";

// - - - - - Redux - - - - -
import { useDispatch, useSelector } from "react-redux";

// - - - - - React - - - - -
import { useEffect, useState } from "react";

// - - - - - Store - - - - -
import { setUser, clearUser } from "@/redux/slices/user.slice";
import { clearSession } from "@/redux/slices/session.slice";

// - - - - - API - - - - -
import { API } from "@/api";
import { me } from "@/api/services/user";

// - - - - - Components - - - - -
import Loading from "@/components/loading/loading.component";

import { styled } from "@mui/material/styles";

// - - - - - Config - - - - -
import { appConfig } from "@/config";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: open ? drawerWidth : `calc(${theme.spacing(8)} + 1px)`,
    },
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: open
        ? theme.transitions.duration.enteringScreen
        : theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
  },
}));

export default function PanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    session: { token },
    user,
  } = useSelector((state) => state);

  console.log(user.user);

  const handleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const getData = async () => {
    try {
      const user = await me();

      dispatch(setUser(user));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      getData();
    } else {
      router.push("/auth");
    }
  }, [token]);

  const logout = async () => {
    dispatch(clearUser());
    dispatch(clearSession());

    router.push("/");
  };

  const getIcon = (value) => {
    switch (value) {
      case "home":
        return <Home />;
      case "me":
        return <Person />;
      case "hosts":
        return <Storage />;
      case "tags":
        return <LocalOffer />;
      case "groups":
        return <Category />;
      case "dashboard":
        return <Dashboard />;
      case "logout":
        return <Logout sx={{ color: "error.main" }} />;
      default:
        return <Warning />;
    }
  };

  const menu = [
    {
      name: "hosts",
      label: "Hosts",
    },
    {
      name: "tags",
      label: "Tags",
    },
    {
      name: "groups",
      label: "Groups",
    },
    {
      name: "dashboard",
      label: "Dashboard",
    },
  ];

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
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open && (
            <Typography
              variant="h6"
              color="primary.main"
              sx={{
                flexGrow: 1,
                pl: 1,
              }}
            >
              OpenHubble
            </Typography>
          )}
          <IconButton onClick={handleDrawer} sx={{ borderRadius: 2 }}>
            <MenuIcon color="primary" />
          </IconButton>
        </DrawerHeader>

        <List sx={{ px: open ? 1 : 0 }}>
          <ListItemButton
            onClick={() => {
              router.push("/panel");
            }}
            sx={{
              m: open ? 1 : 0,
              borderRadius: open ? 1 : 0,
            }}
          >
            <ListItemIcon sx={{ color: "primary.main" }}>
              {getIcon("home")}
            </ListItemIcon>
            {open && <ListItemText primary="Home" />}
          </ListItemButton>
          {menu.map((item) => (
            <ListItemButton
              key={item.name}
              onClick={() => {
                router.push(`/panel/${item.name}`);
                setOpen(false);
              }}
              sx={{
                m: open ? 1 : 0,
                borderRadius: open ? 1 : 0,
              }}
            >
              <ListItemIcon sx={{ color: "primary.main" }}>
                {getIcon(item.name)}
              </ListItemIcon>
              {open && <ListItemText primary={item.label} />}
            </ListItemButton>
          ))}
          <ListItemButton
            onClick={() => {
              router.push("/panel/settings");
            }}
            sx={{
              m: open ? 1 : 0,
              borderRadius: open ? 1 : 0,
            }}
          >
            <ListItemIcon sx={{ color: "primary.main" }}>
              {getIcon("me")}
            </ListItemIcon>
            {open && <ListItemText primary={user.user.first_name} />}
          </ListItemButton>
          <ListItemButton
            onClick={logout}
            sx={{
              m: open ? 1 : 0,
              borderRadius: open ? 1 : 0,
            }}
          >
            <ListItemIcon>{getIcon("logout")}</ListItemIcon>
            {open && (
              <ListItemText primary="Logout" sx={{ color: "error.main" }} />
            )}
          </ListItemButton>
        </List>

        {open && (
          <Box sx={{ mt: "auto", pb: 2 }}>
            <Divider
              sx={{
                mx: 2,
                bgcolor: "primary.main",
                height: "2px",
              }}
            />
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="h6" color="primary.main">
                OpenHubble
              </Typography>
              <Typography variant="body2" color="white">
                Cloud Metrics
              </Typography>
              <Typography variant="caption" color="rgba(255, 255, 255, 0.7)">
                {appConfig.version}
              </Typography>
            </Box>
          </Box>
        )}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          position: "relative",
          "& > *": { position: "relative", zIndex: 1 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
