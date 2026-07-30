"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import Table from "@/components/table/table.component";
import Form from "@/components/form/form.component";
import { useDisclosure } from "@/hooks/useDisclosure/useDisclosure.hook";

import {
  allHosts,
  createHost,
  updateHost,
  deleteHost,
} from "@/api/services/host";
import { allGroups } from "@/api/services/group";
import { allTags } from "@/api/services/tag";

import { HostRead, HostCreate, HostUpdate } from "@/types/host";
import { SelectOption } from "@/core/form/form.config";

export default function HostsPage() {
  const [hosts, setHosts] = useState<HostRead[]>([]);
  const [selectedHost, setSelectedHost] = useState<HostRead | undefined>();
  const [loading, setLoading] = useState(true);

  const [selectOptions, setSelectOptions] = useState<{
    groups: SelectOption[];
    tags: SelectOption[];
  }>({
    groups: [],
    tags: [],
  });

  const { isOpen: dialogOpen, onOpen, onClose } = useDisclosure();

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const [hostsData, groupsData, tagsData] = await Promise.all([
        allHosts(),
        allGroups(),
        allTags(),
      ]);

      setHosts(hostsData);

      setSelectOptions({
        groups: groupsData.map((g) => ({ id: g.id, label: g.name })),
        tags: tagsData.map((t) => ({ id: t.id, label: t.name })),
      });
    } catch (error) {
      console.error("Failed to load hosts dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleOpenCreate = () => {
    setSelectedHost(undefined);
    onOpen();
  };

  const handleOpenEdit = (host: HostRead) => {
    setSelectedHost(host);
    onOpen();
  };

  const handleAdd = async (data: HostCreate) => {
    setLoading(true);
    try {
      await createHost(data);
      onClose();
      await getData();
    } catch (error) {
      console.error("Failed to create host:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: HostUpdate) => {
    if (!selectedHost) return;
    setLoading(true);
    try {
      await updateHost(selectedHost.id, data);
      onClose();
      await getData();
    } catch (error) {
      console.error("Failed to update host:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteHost(id);
      await getData();
    } catch (error) {
      console.error("Failed to delete host:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      <Table
        table="host"
        data={hosts}
        loading={loading}
        addText="Add Host"
        add={handleOpenCreate}
        clk={handleOpenEdit}
        upd={handleOpenEdit}
        del={(row) => handleDelete(row.id)}
      />

      <Dialog open={dialogOpen} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>
          <Typography
            variant="h6"
            color="primary.main"
            sx={{
              fontWeight: 600,
            }}
          >
            {selectedHost ? "Edit Host Configuration" : "Add New Host"}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Form
            name="host"
            callback={selectedHost ? handleUpdate : handleAdd}
            def={selectedHost || {}}
            selectData={selectOptions}
            button={selectedHost ? "Save Changes" : "Register Host"}
            btnStyle={{ disabled: loading }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
