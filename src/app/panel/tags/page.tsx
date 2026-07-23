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

import { allTags, createTag, updateTag, deleteTag } from "@/api/services/tag";

import { TagRead, TagUpdate, TagCreate } from "@/types/tag";

export default function Tag() {
  const [tags, setTags] = useState<TagRead[]>([]);
  const [selectedTag, setSelectedTag] = useState<TagRead>(undefined);

  const [loading, setLoading] = useState(true);

  const { isOpen: dialogOpen, onToggle: handleDialog } = useDisclosure();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);

    try {
      const tags = await allTags();

      setTags(tags);
    } catch (error) {}

    setLoading(false);
  };

  const addData = async (data: TagCreate) => {
    setLoading(true);

    try {
      await createTag(data);

      setSelectedTag(undefined);
      handleDialog();

      getData();
    } catch (error) {}

    setLoading(false);
  };

  const updateData = async (data: TagUpdate) => {
    setLoading(true);

    try {
      await updateTag(selectedTag.id, data);

      setSelectedTag(undefined);
      handleDialog();

      getData();
    } catch (error) {}

    setLoading(false);
  };

  const deleteData = async (id: string) => {
    setLoading(true);

    try {
      await deleteTag(id);

      getData();
    } catch (error) {}

    setLoading(false);
  };

  return (
    <>
      <Box>
        {!loading ? (
          <Table
            table="tag"
            data={tags}
            addText="Add Tag"
            add={() => {
              setSelectedTag(undefined);
              handleDialog();
            }}
            clk={(data) => {
              setSelectedTag(data);
              handleDialog();
            }}
            upd={(data) => {
              setSelectedTag(data);
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
            {selectedTag ? "Edit Tag" : "Add Tag"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Form
            name="tag"
            callback={selectedTag ? updateData : addData}
            disables={[]}
            btnStyle={{
              fullWidth: false,
              disabled: loading,
              color: "primary",
            }}
            def={selectedTag ? selectedTag : {}}
            button={selectedTag ? "Update" : "Create"}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
