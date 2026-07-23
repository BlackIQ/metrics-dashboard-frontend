"use client";

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
import Table from "@/components/table/table.component";
import Confirm from "@/components/confirm/confirm.component";
import Loading from "@/components/loading/loading.component";

// - - - - - Hooks - - - - -
import { useDisclosure } from "@/hooks/useDisclosure/useDisclosure.hook";

// - - - - - API - - - - -
import { allTags, deleteTag } from "@/api/services/tag";

// - - - - - Forms - - - - -
import TagForm from "@/forms/tag";

const Index = () => {
  const [tags, setTags] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [currentData, setCurrentData] = useState({});

  const { isOpen: confirmOpen, onToggle: handleConfirm } = useDisclosure();
  const { isOpen: dialogOpen, onToggle: handleDialog } = useDisclosure();

  useEffect(() => {
    getData(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const getData = async (currentPage) => {
    setLoading(true);

    try {
      const { tags, pagination } = await allTags(currentPage);

      setTags(tags);

      setTotalPages(pagination.pages);
    } catch (error) {}
    setLoading(false);
  };

  const deleteData = async () => {
    setLoading(true);

    try {
      await deleteTag(currentData._id);

      handleConfirm();
      setCurrentData({});

      getData(page);
    } catch (error) {}

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Tags - OpenHubble Console</title>
      </Head>

      <Box>
        {!loading ? (
          <Table
            table="tag"
            data={tags}
            addText="Add Tag"
            add={() => {
              setCurrentData(null);
              handleDialog();
            }}
            clk={(data) => {
              setCurrentData(data);
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

      <Dialog open={dialogOpen} onClose={handleDialog}>
        <DialogTitle>
          <Typography variant="h6" color="primary.main">
            {currentData ? "Edit Tag" : "Add Tag"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TagForm
            currentData={currentData}
            getData={getData}
            handleClose={handleDialog}
            loading={loading}
            setLoading={setLoading}
            updateMode={!!currentData}
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
