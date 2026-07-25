"use client";

import { useState, useEffect } from "react";

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import Table from "@/components/table/table.component";
import Form from "@/components/form/form.component";
import Loading from "@/components/loading/loading.component";

import { useDisclosure } from "@/hooks/useDisclosure/useDisclosure.hook";

import {
  allHosts,
  createHost,
  updateHost,
  deleteHost,
} from "@/api/services/host";

import { HostRead, HostCreate, HostUpdate } from "@/types/host";

export default function Host() {
  const [hosts, setHosts] = useState<HostRead[]>([]);
  const [selectedHost, setSelectedHost] = useState<HostRead>(undefined);

  const [loading, setLoading] = useState(true);

  const { isOpen: dialogOpen, onToggle: handleDialog } = useDisclosure();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);

    try {
      const hosts = await allHosts();

      setHosts(hosts);
    } catch (error) {}

    setLoading(false);
  };

  const addData = async (data: HostCreate) => {
    setLoading(true);

    try {
      await createHost(data);

      setSelectedHost(undefined);
      handleDialog();

      getData();
    } catch (error) {}

    setLoading(false);
  };

  const updateData = async (data: HostUpdate) => {
    setLoading(true);

    try {
      await updateHost(selectedHost.id, data);

      setSelectedHost(undefined);
      handleDialog();

      getData();
    } catch (error) {}

    setLoading(false);
  };

  const deleteData = async (id: string) => {
    setLoading(true);

    try {
      await deleteHost(id);

      getData();
    } catch (error) {}

    setLoading(false);
  };

  return (
    <>
      <Box>
        {!loading ? (
          <Table
            table="host"
            data={hosts}
            addText="Add Host"
            add={() => {
              setSelectedHost(undefined);
              handleDialog();
            }}
            clk={(data) => {
              setSelectedHost(data);
              handleDialog();
            }}
            upd={(data) => {
              setSelectedHost(data);
              handleDialog();
            }}
            del={(data) => {
              deleteData(data.id);
            }}
          />
        ) : (
          <Loading />
        )}
      </Box>

      <Dialog open={dialogOpen} onClose={handleDialog}>
        <DialogTitle>
          <Typography variant="h6" color="primary.main">
            {selectedHost ? "Edit Add Host" : "Add Host"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Form
            name="host"
            callback={selectedHost ? updateData : addData}
            disables={[]}
            btnStyle={{
              fullWidth: false,
              disabled: loading,
              color: "primary",
            }}
            def={selectedHost ? selectedHost : {}}
            button={selectedHost ? "Update" : "Create"}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
