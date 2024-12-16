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
import { all as allTags, deleteOne as deleteTag } from "@/api/services/tag";

// Forms
import TagForm from "@/forms/tag";

const Index = () => {
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
      const { tags } = await allTags(filter);

      setTags(tags);

      toast("Tags got");
    } catch (error) {
      toast(error.message);
    }

    setLoading(false);
  };

  const deleteData = async () => {
    setLoading(true);

    try {
      await deleteTag(currentData._id);

      toast("Tag deleted");

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
        <title>{"Tags"}</title>
      </Head>
      <Box>
        {!loading ? (
          <Table
            table="tag"
            data={tags}
            addText={"Add tag"}
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
        <DialogTitle>{"Tag"}</DialogTitle>
        <DialogContent>
          <TagForm
            currentData={currentData}
            getData={getData}
            handleClose={handleDialog}
            loading={loading}
            setLoading={setLoading}
            updateMode={currentData}
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
