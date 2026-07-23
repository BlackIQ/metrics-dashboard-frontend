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
import { allGroups, deleteGroup } from "@/api/services/group";

// - - - - - Forms - - - - -
import GroupForm from "@/forms/group";

const Index = () => {
  const [groups, setGroups] = useState([]);

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
      const { groups, pagination } = await allGroups(currentPage);

      setGroups(groups);

      setTotalPages(pagination.pages);

    } catch (error) {
    }

    setLoading(false);
  };

  const deleteData = async () => {
    setLoading(true);

    try {
      await deleteGroup(currentData._id);

      handleConfirm();
      setCurrentData({});

      getData(page);
    } catch (error) {}

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Groups - OpenHubble Console</title>
      </Head>

      <Box>
        {!loading ? (
          <Table
            table="group"
            data={groups}
            addText="Add Group"
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
            {currentData ? "Edit Group" : "Add Group"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <GroupForm
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
