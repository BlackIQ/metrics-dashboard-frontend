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
  allGroups,
  createGroup,
  updateGroup,
  deleteGroup,
} from "@/api/services/group";

import { GroupRead, GroupCreate, GroupUpdate } from "@/types/group";

export default function Group() {
  const [groups, setGroups] = useState<GroupRead[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<GroupRead>();

  const [loading, setLoading] = useState(true);

  const { isOpen: dialogOpen, onToggle: handleDialog } = useDisclosure();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);

    try {
      const groups = await allGroups();

      setGroups(groups);
    } catch (error) {}

    setLoading(false);
  };

  const addData = async (data: GroupCreate) => {
    setLoading(true);

    try {
      await createGroup(data);

      setSelectedGroup(undefined);
      handleDialog();

      getData();
    } catch (error) {}

    setLoading(false);
  };

  const updateData = async (data: GroupUpdate) => {
    if (!selectedGroup) return;

    setLoading(true);

    try {
      await updateGroup(selectedGroup.id, data);

      setSelectedGroup(undefined);
      handleDialog();

      getData();
    } catch (error) {}

    setLoading(false);
  };

  const deleteData = async (id: string) => {
    setLoading(true);

    try {
      await deleteGroup(id);

      getData();
    } catch (error) {}

    setLoading(false);
  };

  return (
    <>
      <Box>
        {!loading ? (
          <Table
            table="group"
            data={groups}
            addText="Add Group"
            add={() => {
              setSelectedGroup(undefined);
              handleDialog();
            }}
            clk={(data) => {
              setSelectedGroup(data);
              handleDialog();
            }}
            upd={(data) => {
              setSelectedGroup(data);
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
            {selectedGroup ? "Edit Group" : "Add Group"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Form
            name="group"
            callback={selectedGroup ? updateData : addData}
            disables={[]}
            btnStyle={{
              fullWidth: false,
              disabled: loading,
              color: "primary",
            }}
            def={selectedGroup ? selectedGroup : {}}
            button={selectedGroup ? "Update" : "Create"}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
