"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";

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
  Tooltip,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Storage,
  Person,
  Home,
  LocalOffer,
  Category,
  Logout,
  Dashboard,
} from "@mui/icons-material";

import { useAppSelector } from "@/redux/hooks";
import { setUser, clearUser } from "@/redux/slices/user.slice";
import { clearToken } from "@/redux/slices/token.slice";
import { me } from "@/api/services/user";
import Loading from "@/components/loading/loading.component";
import { styled } from "@mui/material/styles";

const drawerWidth = 220;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1.5),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: open ? drawerWidth : 64,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : 64,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    backgroundColor: "#0B0F17",
    borderColor: "#1E293B",
  },
}));

export default function PanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { token, user } = useAppSelector((state) => state);

  const handleDrawer = () => setOpen((prev) => !prev);

  useEffect(() => {
    if (!token.token) {
      router.push("/auth");
      return;
    }

    const fetchUserData = async () => {
      try {
        const userData = await me();
        dispatch(setUser(userData));
      } catch (error) {
        console.error("Failed to fetch current user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, dispatch, router]);

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearToken());
    router.push("/auth");
  };

  const navItems = [
    { label: "Home", path: "/panel", icon: <Home fontSize="small" /> },
    {
      label: "Hosts",
      path: "/panel/hosts",
      icon: <Storage fontSize="small" />,
    },
    {
      label: "Tags",
      path: "/panel/tags",
      icon: <LocalOffer fontSize="small" />,
    },
    {
      label: "Groups",
      path: "/panel/groups",
      icon: <Category fontSize="small" />,
    },
    {
      label: "Dashboard",
      path: "/panel/dashboard",
      icon: <Dashboard fontSize="small" />,
    },
  ];

  if (loading) {
    return (
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
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open && (
            <Typography
              variant="subtitle1"
              fontWeight={700}
              color="primary.main"
              sx={{ pl: 1 }}
            >
              OpenHubble
            </Typography>
          )}
          <IconButton
            onClick={handleDrawer}
            size="medium"
            sx={{ color: "text.secondary" }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
        </DrawerHeader>

        <Divider sx={{ borderColor: "divider" }} />

        <List sx={{ px: 1, py: 1 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Tooltip
                key={item.path}
                title={!open ? item.label : ""}
                placement="right"
              >
                <ListItemButton
                  onClick={() => router.push(item.path)}
                  selected={isActive}
                  sx={{
                    minHeight: 40,
                    borderRadius: 1,
                    mb: 0.5,
                    px: 1.5,
                    backgroundColor: isActive
                      ? "action.selected"
                      : "transparent",
                    "&.Mui-selected": {
                      backgroundColor: "rgba(59, 130, 246, 0.12)",
                      borderLeft: "3px solid #3B82F6",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 32,
                      color: isActive ? "primary.main" : "text.secondary",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: isActive ? 600 : 400,
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            );
          })}
        </List>

        <Box sx={{ mt: "auto", px: 1, pb: 2 }}>
          <Divider sx={{ borderColor: "divider", mb: 1 }} />

          <Tooltip title={!open ? "Settings" : ""} placement="right">
            <ListItemButton
              onClick={() => router.push("/panel/settings")}
              sx={{ minHeight: 40, borderRadius: 1, px: 1.5, mb: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: "text.secondary" }}>
                <Person fontSize="small" />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={user.user?.first_name || "Account"}
                  primaryTypographyProps={{ fontSize: 13 }}
                />
              )}
            </ListItemButton>
          </Tooltip>

          <Tooltip title={!open ? "Logout" : ""} placement="right">
            <ListItemButton
              onClick={handleLogout}
              sx={{ minHeight: 40, borderRadius: 1, px: 1.5 }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: "error.main" }}>
                <Logout fontSize="small" />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{ fontSize: 13, color: "error.main" }}
                />
              )}
            </ListItemButton>
          </Tooltip>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: "100%", overflowX: "auto" }}
      >
        {children}
      </Box>
    </Box>
  );
}
