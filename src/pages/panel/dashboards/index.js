// - - - - - React - - - - -
import { useState, useEffect } from "react";

// - - - - - Next - - - - -
import Head from "next/head";
import { useRouter } from "next/router";

// - - - - - MUI - - - - -
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import { MoreVert } from "@mui/icons-material";

// - - - - - Components - - - - -
import { Loading, Confirm } from "@/components";

// - - - - - Forms - - - - -
import PageForm from "@/forms/page";

// - - - - - Hooks - - - - -
import { useToast, useDisclosure } from "@/hooks";

// - - - - - APIs - - - - -
import { allPages, deletePage } from "@/api/services/page";

const Index = () => {
  const router = useRouter();
  const toast = useToast();

  // Loadings
  const [pagesLoading, setPagesLoading] = useState(true); // Page

  // States
  const [pages, setPages] = useState([]); // Page

  // Dialogs Data
  const [currentPageData, setCurrentPageData] = useState({}); // Page

  // Dialog State
  const { isOpen: dialogPageOpen, onToggle: handleDialogPage } =
    useDisclosure(); // Page

  const { isOpen: confirmPageOpen, onToggle: handlePageConfirm } =
    useDisclosure(); // Confirm

  // Functions

  const getPagse = async () => {
    setPagesLoading(true);

    try {
      const { pages } = await allPages(1, 100);

      setPages(pages);

      toast("Pages retrieved", { severity: "success" });
    } catch (error) {
      toast(error.message, { severity: "error" });
    }

    setPagesLoading(false);
  };
  const deleteOnePage = async () => {
    setPagesLoading(true);

    try {
      await deletePage(currentPageData._id);

      toast("Page deleted", { severity: "success" });

      handlePageConfirm();
      setCurrentPageData({});

      getPagse();
    } catch (error) {
      toast(error.message, { severity: "error" });
    }

    setPagesLoading(false);
  };

  // Tabs
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    if (newValue === pages.length) {
      setCurrentPageData(null);
      handleDialogPage();

      setTabValue(0);
    } else {
      setTabValue(newValue);
    }
  };

  // Menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(null);

  const handleMenuOpen = (event, pageId) => {
    setAnchorEl(event.currentTarget);
    setSelectedPageId(pageId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPageId(null);
  };

  const handleMenuItemClick = (action) => {
    const selectedPage = pages.find((page) => page._id === selectedPageId);

    if (selectedPage) {
      if (action === "rename") {
        setCurrentPageData(selectedPage);
        handleDialogPage();
      }

      if (action === "delete") {
        setCurrentPageData(selectedPage);
        handlePageConfirm();
      }
    } else {
      toast("Error :(", {
        severity: "error",
      });
    }

    handleMenuClose();
  };

  // UseEffect
  useEffect(() => {
    getPagse();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboards - OpenHubble Console</title>
      </Head>

      <Box width="100%">
        {!pagesLoading ? (
          <>
            {pages.length !== 0 ? (
              <Box>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label="page tabs"
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                >
                  {pages.map((page, index) => (
                    <Tab
                      key={page._id}
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {page.title}
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMenuOpen(e, page._id);
                            }}
                            sx={{ ml: 1 }}
                          >
                            <MoreVert fontSize="small" />
                          </IconButton>
                        </Box>
                      }
                      id={`tab-${index}`}
                      aria-controls={`tabpanel-${index}`}
                    />
                  ))}
                  <Tab
                    label="Add New Page"
                    id="tab-add-page"
                    sx={{ fontWeight: "bold", color: "primary.main" }}
                  />
                </Tabs>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      bgcolor: "rgba(30, 30, 30, 0.9)",
                      border: "1px solid rgba(0, 255, 255, 0.3)",
                    },
                  }}
                >
                  <MenuItem onClick={() => handleMenuItemClick("rename")}>
                    Rename
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick("delete")}>
                    Delete
                  </MenuItem>
                </Menu>
                <Box sx={{ p: 3 }}>
                  {pages.map((page, index) => (
                    <div
                      key={page._id}
                      role="tabpanel"
                      hidden={tabValue !== index}
                      id={`tabpanel-${index}`}
                      aria-labelledby={`tab-${index}`}
                    >
                      {tabValue === index && (
                        <Box>
                          <Typography variant="h6">{page.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Created by: {page.user.firstName} ({page.user.email}
                            )
                          </Typography>
                          <Typography variant="body1" sx={{ mt: 2 }}>
                            {page.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Created: {new Date(page.createdAt).toLocaleString()}
                          </Typography>
                        </Box>
                      )}
                    </div>
                  ))}
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Box>
                  <Typography variant="h5" color="primary.main" gutterBottom>
                    No page Available
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    It looks like you haven’t added any pages yet. Add a page to
                    add graphs!
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => {
                      setCurrentPageData(null);
                      handleDialogPage();
                    }}
                    sx={{ mt: 4, py: 1.5, px: 4, borderRadius: 2 }}
                  >
                    Add a page
                  </Button>
                </Box>
              </Box>
            )}
          </>
        ) : (
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Box>
              <Typography variant="body1" color="textSecondary">
                Loading pages
              </Typography>

              <Loading />
            </Box>
          </Box>
        )}
      </Box>

      <Dialog
        open={dialogPageOpen}
        onClose={handleDialogPage}
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
            {currentPageData ? "Edit page" : "Add page"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <PageForm
            currentData={currentPageData}
            getData={getPagse}
            handleClose={handleDialogPage}
            loading={pagesLoading}
            setLoading={setPagesLoading}
            updateMode={!!currentPageData}
          />
        </DialogContent>
      </Dialog>

      <Confirm
        onConfirm={deleteOnePage}
        isOpen={confirmPageOpen}
        handleOpen={handlePageConfirm}
      />
    </>
  );
};

export default Index;
