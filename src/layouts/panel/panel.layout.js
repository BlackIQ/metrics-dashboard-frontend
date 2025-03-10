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
  Dashboard,
} from "@mui/icons-material";
import { useToast } from "@/hooks";
import { appConfig } from "@/config";
import { keyframes } from "@mui/system";

// Neon glow animation
const neonGlow = keyframes`
  0% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff; }
  50% { text-shadow: 0 0 8px #00e5ff, 0 0 15px #00e5ff, 0 0 20px #00e5ff; }
  100% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff; }
`;

// Divider glow animation
const dividerGlow = keyframes`
  0% { box-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff; }
  50% { box-shadow: 0 0 10px #00e5ff, 0 0 15px #00e5ff; }
  100% { box-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff; }
`;

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
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    backdropFilter: "blur(10px)",
    borderRight: "1px solid rgba(0, 255, 255, 0.2)",
  },
}));

const PanelLayout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const toast = useToast();

  const [open, setOpen] = useState(false); // Start open for testing
  const [loading, setLoading] = useState(true);

  const { session: token, user } = useSelector((state) => state);

  const handleDrawer = () => {
    setOpen((prev) => {
      console.log("Drawer toggled, new state:", !prev);
      return !prev;
    });
  };

  const [permissions, setPermissions] = useState([]);

  const getData = async () => {
    try {
      const data = await single(user._id);
      const nuser = { ...data.user, docs: data.docs };
      setPermissions(data.user.role.permissions);
      dispatch(setUser(nuser));
      setLoading(false);
    } catch (error) {
      toast(error.message, { severity: "error" });
      logout();
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

  const logout = () => {
    console.log("Logout clicked");
    dispatch(unsetUser());
    dispatch(unsetSession());
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
      case "roles":
        return <LocalPolice />;
      case "permissions":
        return <Key />;
      case "users":
        return <Groups />;
      case "dashboards":
        return <Dashboard />;
      case "logout":
        return <Logout sx={{ color: "error.main" }} />;
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
        background: "linear-gradient(135deg, #1a1a1a 0%, #222 100%)",
      }}
    >
      <Loading />
    </Box>
  ) : (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        open={open}
        // onMouseEnter={() => {
        //   setOpen(true);
        // }}
        // onMouseLeave={() => {
        //   setOpen(false);
        // }}
      >
        <DrawerHeader>
          {open && (
            <Typography
              variant="h6"
              fontFamily="Orbitron"
              color="primary.main"
              sx={{
                flexGrow: 1,
                pl: 2,
                animation: open
                  ? `${neonGlow} 2s ease-in-out infinite`
                  : "none",
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
              console.log("Home clicked");
              router.push("/panel");
            }}
            sx={{
              m: open ? 1 : 0,
              borderRadius: open ? 2 : 0,
              bgcolor:
                router.pathname === "/panel"
                  ? "rgba(0, 255, 255, 0.1)"
                  : "transparent",
              "&:hover": { bgcolor: "rgba(0, 255, 255, 0.2)" },
            }}
          >
            <ListItemIcon sx={{ color: "primary.main" }}>
              {getIcon("home")}
            </ListItemIcon>
            {open && <ListItemText primary="Home" sx={{ color: "white" }} />}
          </ListItemButton>
          {permissions.length > 0 ? (
            permissions
              .filter((permission) => permission.value !== "settings")
              .map((permission) => (
                <ListItemButton
                  key={permission._id}
                  onClick={() => {
                    console.log(`${permission.label} clicked`);
                    router.push(`/panel/${permission.value}`);
                    setOpen(false);
                  }}
                  sx={{
                    m: open ? 1 : 0,
                    borderRadius: open ? 2 : 0,
                    bgcolor:
                      router.pathname === `/panel/${permission.value}`
                        ? "rgba(0, 255, 255, 0.1)"
                        : "transparent",
                    "&:hover": { bgcolor: "rgba(0, 255, 255, 0.2)" },
                  }}
                >
                  <ListItemIcon sx={{ color: "primary.main" }}>
                    {getIcon(permission.value)}
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={permission.label}
                      sx={{ color: "white" }}
                    />
                  )}
                </ListItemButton>
              ))
          ) : (
            <Box sx={{ textAlign: "center", py: 2 }}>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                No permissions
              </Typography>
            </Box>
          )}
          <ListItemButton
            onClick={() => {
              console.log("Settings clicked");
              router.push("/panel/settings");
            }}
            sx={{
              m: open ? 1 : 0,
              borderRadius: open ? 2 : 0,
              bgcolor:
                router.pathname === "/panel/settings"
                  ? "rgba(0, 255, 255, 0.1)"
                  : "transparent",
              "&:hover": { bgcolor: "rgba(0, 255, 255, 0.2)" },
            }}
          >
            <ListItemIcon sx={{ color: "primary.main" }}>
              {getIcon("me")}
            </ListItemIcon>
            {open && (
              <ListItemText primary={user.firstName} sx={{ color: "white" }} />
            )}
          </ListItemButton>
          <ListItemButton
            onClick={logout}
            sx={{
              m: open ? 1 : 0,
              borderRadius: open ? 2 : 0,
              "&:hover": { bgcolor: "rgba(255, 0, 0, 0.2)" },
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
                animation: `${dividerGlow} 2s ease-in-out infinite`,
              }}
            />
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography
                variant="h6"
                fontFamily="Orbitron"
                fontWeight="bold"
                color="primary.main"
                sx={{ animation: `${neonGlow} 2s ease-in-out infinite` }}
              >
                OpenHubble
              </Typography>
              <Typography variant="body2" color="white">
                Cloud Console
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
          bgcolor: "background.default",
          background: "linear-gradient(135deg, #1a1a1a 0%, #222 100%)",
          p: 3,
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            // top: "-50%",
            // left: "-50%",
            // width: "100%",
            // height: "100%",
            background:
              "radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)",
            animation: "pulse 8s infinite",
            zIndex: 0,
          },
          "& > *": { position: "relative", zIndex: 1 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

// Pulse animation
const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 0.3; }
  100% { transform: scale(1); opacity: 0.5; }
`;

export default PanelLayout;
