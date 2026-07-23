"use client";

// - - - - - React - - - - -
import { useState, useEffect } from "react";

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
import { allHosts, deleteHost } from "@/api/services/host";
import { allGroups } from "@/api/services/group";
import { allTags } from "@/api/services/tag";

// - - - - - Forms - - - - -
import HostForm from "@/forms/host";

const Index = () => {
  const [hosts, setHosts] = useState([]);
  const [groups, setGroups] = useState([]);
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
      const { hosts, pagination } = await allHosts(currentPage);
      const { groups } = await allGroups(1, 100);
      const { tags } = await allTags(1, 100);

      setHosts(hosts);
      setGroups(groups);
      setTags(tags);

      setTotalPages(pagination.pages);
    } catch (error) {}

    setLoading(false);
  };

  const deleteData = async () => {
    setLoading(true);

    try {
      await deleteHost(currentData._id);

      handleConfirm();
      setCurrentData({});

      getData(page);
    } catch (error) {}

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Hosts - OpenHubble Console</title>
      </Head>

      <Box>
        {!loading ? (
          <Table
            table="host"
            data={hosts}
            addText={"Add Host"}
            add={() => {
              setCurrentData(null);
              handleDialog();
            }}
            clk={(data) => {
              const d = { ...data };

              d.groups = data.groups.map((group) => group._id);
              d.tags = data?.tags?.map((tag) => tag._id);

              setCurrentData(d);
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
            {currentData ? "Edit Host" : "Add Host"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <HostForm
            currentData={currentData}
            getData={getData}
            handleClose={handleDialog}
            loading={loading}
            setLoading={setLoading}
            updateMode={currentData}
            extraData={{ groups, tags }}
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
