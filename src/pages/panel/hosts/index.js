// NextJS ReactJs
import { useState, useEffect } from "react";
import Head from "next/head";

// Redux
import { useSelector } from "react-redux";

// Material UI
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";

// Components
import { Table, Loading, Confirm } from "@/components";

// Hooks
import { useDisclosure, useToast } from "@/hooks";

// APIs
import { all as allHosts, deleteOne as deleteHost } from "@/api/services/host";
import { all as allGroups } from "@/api/services/group";
import { all as allTags } from "@/api/services/tag";

// Forms
import HostForm from "@/forms/host";

const Index = () => {
  const [hosts, setHosts] = useState([]);

  const [groups, setGroups] = useState([]);
  const [tags, setTags] = useState([]);

  const [loading, setLoading] = useState(true);
  const [currentData, setCurrentData] = useState({});

  const { isOpen: confirmOpen, onToggle: handleConfirm } = useDisclosure();
  const { isOpen: dialogOpen, onToggle: handleDialog } = useDisclosure();

  const toast = useToast();

  const { role, _id } = useSelector((state) => state.user);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);

    const filter = {};

    if (role?.value === "user") {
      filter["user"] = _id;
    }

    try {
      const { hosts } = await allHosts(filter);

      const { groups } = await allGroups();
      const { tags } = await allTags();

      setHosts(hosts);

      setGroups(groups);
      setTags(tags);

      toast("Hosts got");
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  const deleteData = async () => {
    setLoading(true);

    try {
      await deleteHost(currentData._id);

      toast("Host deleted");

      handleConfirm();
      setCurrentData({});
      getData();
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>{"Hosts"}</title>
      </Head>
      <Box>
        {!loading ? (
          <Table
            table="host"
            data={hosts}
            addText={"Add host"}
            add={() => {
              setCurrentData(null);
              handleDialog();
            }}
            clk={(data) => {
              data.groups = data.groups.map((group) => group._id);
              data.tags = data.tags.map((tag) => tag._id);

              setCurrentData(data);
              handleDialog();
            }}
            del={(data) => {
              setCurrentData(data);
              handleConfirm();
            }}
          />
        ) : (
          <Loading />
        )}
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={handleDialog}
        PaperProps={{ sx: { borderRadius: "20px" } }}
      >
        <DialogTitle>{"Host"}</DialogTitle>
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
