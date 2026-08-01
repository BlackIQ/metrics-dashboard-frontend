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

import { allTags, createTag, updateTag, deleteTag } from "@/api/services/tag";
import { TagRead, TagCreate, TagUpdate } from "@/types/tag";

export default function TagsPage() {
  const [tags, setTags] = useState<TagRead[]>([]);
  const [selectedTag, setSelectedTag] = useState<TagRead | undefined>();
  const [loading, setLoading] = useState(true);
  const [pendingDeleteTag, setPendingDeleteTag] = useState<TagRead | null>(
    null,
  );

  const { isOpen: dialogOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: confirmOpen,
    onOpen: openConfirm,
    onClose: closeConfirm,
  } = useDisclosure();

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await allTags();
      setTags(data);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleOpenCreate = () => {
    setSelectedTag(undefined);
    onOpen();
  };

  const handleOpenEdit = (tag: TagRead) => {
    setSelectedTag(tag);
    onOpen();
  };

  const handleAdd = async (data: TagCreate) => {
    setLoading(true);
    try {
      await createTag(data);
      onClose();
      await getData();
    } catch (error) {
      console.error("Failed to create tag:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: TagUpdate) => {
    if (!selectedTag) return;
    setLoading(true);
    try {
      await updateTag(selectedTag.id, data);
      onClose();
      await getData();
    } catch (error) {
      console.error("Failed to update tag:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (tag: TagRead) => {
    setPendingDeleteTag(tag);
    openConfirm();
  };

  const handleDelete = async () => {
    if (!pendingDeleteTag) return;

    setLoading(true);
    try {
      await deleteTag(pendingDeleteTag.id);
      closeConfirm();
      setPendingDeleteTag(null);
      await getData();
    } catch (error) {
      console.error("Failed to delete tag:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      <Table
        table="tag"
        data={tags}
        loading={loading}
        addText="Add Tag"
        add={handleOpenCreate}
        clk={handleOpenEdit}
        upd={handleOpenEdit}
        del={(row) => handleDeleteClick(row)}
      />

      <Confirm
        isOpen={confirmOpen}
        onClose={() => {
          closeConfirm();
          setPendingDeleteTag(null);
        }}
        onConfirm={handleDelete}
        title="Delete Tag"
        message={`Are you sure you want to delete "${pendingDeleteTag?.name || "this tag"}"? This action cannot be undone.`}
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
            {selectedTag ? "Edit Tag" : "Add Tag"}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Form
            name="tag"
            callback={selectedTag ? handleUpdate : handleAdd}
            def={selectedTag || {}}
            button={selectedTag ? "Update Tag" : "Create Tag"}
            btnStyle={{ disabled: loading }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
