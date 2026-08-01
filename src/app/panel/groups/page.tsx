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
  allGroups,
  createGroup,
  updateGroup,
  deleteGroup,
} from "@/api/services/group";
import { GroupRead, GroupCreate, GroupUpdate } from "@/types/group";

export default function GroupsPage() {
  const [groups, setGroups] = useState<GroupRead[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<GroupRead | undefined>();
  const [loading, setLoading] = useState(true);
  const [pendingDeleteGroup, setPendingDeleteGroup] =
    useState<GroupRead | null>(null);

  const { isOpen: dialogOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: confirmOpen,
    onOpen: openConfirm,
    onClose: closeConfirm,
  } = useDisclosure();

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await allGroups();
      setGroups(data);
    } catch (error) {
      console.error("Failed to fetch groups:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleOpenCreate = () => {
    setSelectedGroup(undefined);
    onOpen();
  };

  const handleOpenEdit = (group: GroupRead) => {
    setSelectedGroup(group);
    onOpen();
  };

  const handleAdd = async (data: GroupCreate) => {
    setLoading(true);
    try {
      await createGroup(data);
      onClose();
      await getData();
    } catch (error) {
      console.error("Failed to create group:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: GroupUpdate) => {
    if (!selectedGroup) return;
    setLoading(true);
    try {
      await updateGroup(selectedGroup.id, data);
      onClose();
      await getData();
    } catch (error) {
      console.error("Failed to update group:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (group: GroupRead) => {
    setPendingDeleteGroup(group);
    openConfirm();
  };

  const handleDelete = async () => {
    if (!pendingDeleteGroup) return;

    setLoading(true);
    try {
      await deleteGroup(pendingDeleteGroup.id);
      closeConfirm();
      setPendingDeleteGroup(null);
      await getData();
    } catch (error) {
      console.error("Failed to delete group:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      <Table
        table="group"
        data={groups}
        loading={loading}
        addText="Add Group"
        add={handleOpenCreate}
        clk={handleOpenEdit}
        upd={handleOpenEdit}
        del={(row) => handleDeleteClick(row)}
      />

      <Confirm
        isOpen={confirmOpen}
        onClose={() => {
          closeConfirm();
          setPendingDeleteGroup(null);
        }}
        onConfirm={handleDelete}
        title="Delete Group"
        message={`Are you sure you want to delete "${pendingDeleteGroup?.name || "this group"}"? This action cannot be undone.`}
        confirmText="Delete"
        loading={loading}
      />

      <Dialog open={dialogOpen} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Typography
            variant="h6"
            color="primary.main"
            sx={{
              fontWeight: 600,
            }}
          >
            {selectedGroup ? "Edit Group" : "Add Group"}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Form
            name="group"
            callback={selectedGroup ? handleUpdate : handleAdd}
            def={selectedGroup || {}}
            button={selectedGroup ? "Update Group" : "Create Group"}
            btnStyle={{ disabled: loading }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
