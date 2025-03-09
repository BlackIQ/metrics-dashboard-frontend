import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Badge,
} from "@mui/material";
import { keyframes } from "@mui/system";
import { useToast } from "@/hooks";

// Neon glow animation
const neonGlow = keyframes`
  0% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff; }
  50% { text-shadow: 0 0 8px #00e5ff, 0 0 15px #00e5ff, 0 0 20px #00e5ff; }
  100% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff; }
`;

// Pulse animation for stats
const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const Index = () => {
  const router = useRouter();
  const toast = useToast();
  const { user } = useSelector((state) => state);

  const [checklist, setChecklist] = useState({
    createdTag: false,
    createdGroup: false,
    addedHost: false,
  });
  const [cosmicTip, setCosmicTip] = useState(true);

  // Mock stats and activity (replace with real API calls if available)
  const stats = {
    tags: 5,
    groups: 3,
    hosts: 10,
  };
  const recentActivity = [
    // { id: 1, action: "Tag 'Web' created", time: "5 mins ago" },
    // { id: 2, action: "Host 'Server1' added", time: "10 mins ago" },
    // { id: 3, action: "Group 'Prod' updated", time: "1 hr ago" },
  ];

  const navItems = [
    {
      title: "Tags",
      description: "Create and manage tags to categorize your hosts.",
      path: "/panel/tags",
    },
    {
      title: "Groups",
      description: "Organize hosts into groups for easier management.",
      path: "/panel/groups",
    },
    {
      title: "Hosts",
      description: "Add hosts and assign tags or groups to them.",
      path: "/panel/hosts",
    },
  ];

  const handleChecklist = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
    toast("Nice one!", { severity: "success" });
  };

  const handleCosmicClick = () => {
    setCosmicTip(true);
    setTimeout(() => setCosmicTip(false), 3000); // Hide after 3s
  };

  useEffect(() => {
    // Simulate checklist updates based on stats (replace with real logic)
    if (stats.tags > 0) setChecklist((prev) => ({ ...prev, createdTag: true }));
    if (stats.groups > 0)
      setChecklist((prev) => ({ ...prev, createdGroup: true }));
    if (stats.hosts > 0) setChecklist((prev) => ({ ...prev, addedHost: true }));
  }, []);

  return (
    <>
      <Head>
        <title>Panel - OpenHubble Console</title>
      </Head>
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            fontFamily="Orbitron"
            color="primary.main"
            fontWeight="bold"
            sx={{
              animation: `${neonGlow} 2s ease-in-out infinite`,
              mb: 2,
              textAlign: "center",
            }}
            onClick={handleCosmicClick} // Easter egg trigger
          >
            Welcome to OpenHubble, {user.firstName || "Explorer"}!
          </Typography>
          {cosmicTip && (
            <Typography
              variant="body2"
              color="primary.light"
              sx={{ textAlign: "center", mb: 4 }}
            >
              Cosmic Tip: The universe is 13.8 billion years old—plenty of time
              to explore OpenHubble!
            </Typography>
          )}

          {/* Quick Actions */}
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 6 }}
          >
            {navItems.map((item) => (
              <Button
                key={item.title}
                variant="contained"
                color="primary"
                onClick={() => router.push(item.path)}
                sx={{
                  py: 1,
                  px: 3,
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: "primary.dark",
                    boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
                  },
                }}
              >
                Add {item.title.slice(0, -1)}
              </Button>
            ))}
          </Box>

          {/* Stats */}
          <Grid container spacing={4} sx={{ mb: 6 }}>
            {Object.entries(stats).map(([key, value]) => (
              <Grid item xs={12} sm={4} key={key}>
                <Card
                  sx={{
                    bgcolor: "rgba(30, 30, 30, 0.9)",
                    border: "1px solid rgba(0, 255, 255, 0.3)",
                    borderRadius: 2,
                    backdropFilter: "blur(10px)",
                    textAlign: "center",
                    p: 2,
                    animation: `${pulse} 3s infinite`,
                  }}
                >
                  <Typography
                    variant="h5"
                    color="primary.main"
                    fontFamily="Orbitron"
                  >
                    {value}
                  </Typography>
                  <Typography variant="body1" color="white">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Main Content */}
          <Grid container spacing={4}>
            {/* Navigation Cards */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  bgcolor: "rgba(30, 30, 30, 0.9)",
                  border: "1px solid rgba(0, 255, 255, 0.3)",
                  borderRadius: 2,
                  backdropFilter: "blur(10px)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    color="primary.main"
                    fontFamily="Orbitron"
                    gutterBottom
                  >
                    Explore OpenHubble
                  </Typography>
                  <Grid container spacing={2}>
                    {navItems.map((item) => (
                      <Grid item xs={12} key={item.title}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 1,
                            "&:hover": {
                              bgcolor: "rgba(0, 255, 255, 0.1)",
                              cursor: "pointer",
                            },
                          }}
                          onClick={() => router.push(item.path)}
                        >
                          <Typography variant="subtitle1" color="white">
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="rgba(255, 255, 255, 0.7)"
                          >
                            {item.description}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Checklist & Recent Activity */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  bgcolor: "rgba(30, 30, 30, 0.9)",
                  border: "1px solid rgba(0, 255, 255, 0.3)",
                  borderRadius: 2,
                  backdropFilter: "blur(10px)",
                  mb: 4,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    color="primary.main"
                    fontFamily="Orbitron"
                    gutterBottom
                  >
                    Getting Started TODO
                  </Typography>
                  <List dense>
                    <ListItem>
                      <Checkbox
                        checked={checklist.createdTag}
                        onChange={() => handleChecklist("createdTag")}
                        color="primary"
                      />
                      <ListItemText
                        primary="Create your first tag"
                        primaryTypographyProps={{ color: "white" }}
                      />
                    </ListItem>
                    <ListItem>
                      <Checkbox
                        checked={checklist.createdGroup}
                        onChange={() => handleChecklist("createdGroup")}
                        color="primary"
                      />
                      <ListItemText
                        primary="Add a group"
                        primaryTypographyProps={{ color: "white" }}
                      />
                    </ListItem>
                    <ListItem>
                      <Checkbox
                        checked={checklist.addedHost}
                        onChange={() => handleChecklist("addedHost")}
                        color="primary"
                      />
                      <ListItemText
                        primary="Set up a host"
                        primaryTypographyProps={{ color: "white" }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>

              <Card
                sx={{
                  bgcolor: "rgba(30, 30, 30, 0.9)",
                  border: "1px solid rgba(0, 255, 255, 0.3)",
                  borderRadius: 2,
                  backdropFilter: "blur(10px)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    color="primary.main"
                    fontFamily="Orbitron"
                    gutterBottom
                  >
                    Recent Activity
                  </Typography>
                  <List dense>
                    {recentActivity.map((item) => (
                      <ListItem key={item.id}>
                        <ListItemText
                          primary={item.action}
                          secondary={item.time}
                          primaryTypographyProps={{ color: "white" }}
                          secondaryTypographyProps={{
                            color: "rgba(255, 255, 255, 0.5)",
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Index;
