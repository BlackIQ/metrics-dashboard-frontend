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
import Confirm from "@/components/confirm/confirm.component";
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
  const [pendingDeleteHost, setPendingDeleteHost] = useState<HostRead | null>(
    null,
  );

  const [selectOptions, setSelectOptions] = useState<{
    groups: SelectOption[];
    tags: SelectOption[];
  }>({
    groups: [],
    tags: [],
  });

  const { isOpen: dialogOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: confirmOpen,
    onOpen: openConfirm,
    onClose: closeConfirm,
  } = useDisclosure();

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

  const handleAdd = async (formData: any) => {
    setLoading(true);
    try {
      const payload: HostCreate = {
        name: formData.name,
        description: formData.description || "",
        ipv4: formData.ipv4 || "",
        dns: formData.dns || "",
        port: Number(formData.port),
        api_key: formData.api_key,
        communication: formData.communication,
        is_active: Boolean(formData.is_active),
        group_id: formData.group_id,
        tag_ids: formData.tag_ids || [],
      };

      await createHost(payload);
      onClose();
      await getData();
    } catch (error) {
      console.error("Failed to create host:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (formData: any) => {
    if (!selectedHost) return;
    setLoading(true);
    try {
      const payload: HostUpdate = {
        name: formData.name,
        description: formData.description,
        ipv4: formData.ipv4,
        dns: formData.dns,
        port: formData.port ? Number(formData.port) : undefined,
        api_key: formData.api_key,
        communication: formData.communication,
        is_active: formData.is_active,
        group_id: formData.group_id,
        tag_ids: formData.tag_ids,
      };

      await updateHost(selectedHost.id, payload);
      onClose();
      await getData();
    } catch (error) {
      console.error("Failed to update host:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (host: HostRead) => {
    setPendingDeleteHost(host);
    openConfirm();
  };

  const handleDelete = async () => {
    if (!pendingDeleteHost) return;

    setLoading(true);
    try {
      await deleteHost(pendingDeleteHost.id);
      closeConfirm();
      setPendingDeleteHost(null);
      await getData();
    } catch (error) {
      console.error("Failed to delete host:", error);
    } finally {
      setLoading(false);
    }
  };

  const defaultFormValues = selectedHost
    ? {
        ...selectedHost,
        group_id: selectedHost.group?.id || "",
        tag_ids: selectedHost.tags?.map((t) => t.id) || [],
      }
    : {};

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
        del={(row) => handleDeleteClick(row)}
      />

      <Confirm
        isOpen={confirmOpen}
        onClose={() => {
          closeConfirm();
          setPendingDeleteHost(null);
        }}
        onConfirm={handleDelete}
        title="Delete Host"
        message={`Are you sure you want to delete "${pendingDeleteHost?.name || "this host"}"? This action cannot be undone.`}
        confirmText="Delete"
        loading={loading}
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
            def={defaultFormValues}
            selectData={selectOptions}
            button={selectedHost ? "Save Changes" : "Register Host"}
            btnStyle={{ disabled: loading }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
