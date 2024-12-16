import {
  Table,
  TableContainer,
  Paper,
  Box,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  Typography,
  Button,
  Pagination,
  colors,
} from "@mui/material";

import { format as dateFormat } from "date-fns";

import {
  Add,
  DeleteOutline,
  EditOutlined,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";

import { tables } from "@/config";

import { useEffect, useState } from "react";

import { useToast } from "@/hooks";

const TableComponent = ({
  table,
  data,
  del,
  upd,
  add,
  addText,
  clk,
  removeItems,
  addItems,
  details,
}) => {
  const toast = useToast();

  const formatterData = dateFormat;

  const tbl = tables[table];

  removeItems &&
    removeItems.map((item) => {
      delete tbl.fields[item];
    });

  addItems &&
    Object.entries(addItems).map(([key, value]) => {
      tbl.fields[key] = value;
    });

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowPerPage] = useState(10);

  const [renderRows, setRenderRows] = useState([]);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (del) {
      data.map(
        (d, index) =>
          (d["delete"] = (
            <Box sx={{ w: "100%", textAlign: "center" }}>
              <IconButton key={`Del-${index}`} onClick={() => del(d)}>
                <DeleteOutline fontSize="small" />
              </IconButton>
            </Box>
          ))
      );
    }

    if (upd) {
      data.map(
        (d, index) =>
          (d["update"] = (
            <Box sx={{ w: "100%", textAlign: "center" }}>
              <IconButton key={`Upd-${index}`} onClick={() => upd(d)}>
                <EditOutlined fontSize="small" />
              </IconButton>
            </Box>
          ))
      );
    }

    setRenderRows(data.slice((page - 1) * rowsPerPage, page * rowsPerPage));
  }, [data, page, rowsPerPage]);

  const renderSwitch = (d, i) => {
    const props = i.split(".");

    const v = props.reduce((acc, prop) => acc[prop], d);

    switch (table) {
      default:
        break;
    }

    switch (i) {
      case "createdAt":
      case "updatedAt":
        return formatterData(new Date(d["createdAt"]), "yyyy/MM/dd");
      default:
        return v;
    }
  };

  const renderColor = (d, i) => {
    switch (d.type) {
      case "low":
        return colors.red[500];
      case "add":
        return colors.green[500];
      default:
        break;
    }
  };

  return (
    <>
      {data.length > 0 ? (
        <Box>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignContent: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                fontWeight={900}
                sx={{
                  color: "white",
                }}
                fontSize={25}
              >
                {tbl.title}
              </Typography>
              <br />
              {details || <Box></Box>}
            </Box>
            <Box>
              {add && (
                <Button
                  onClick={add}
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "primary.main",
                    borderRadius: 2,
                    color: "white",
                  }}
                  startIcon={<Add />}
                  disableElevation
                >
                  {addText}
                </Button>
              )}
            </Box>
          </Box>
          <br />
          <TableContainer
            elevation={0}
            sx={{
              w: "100%",
              borderRadius: 3,
            }}
            variant="outlined"
            component={Paper}
          >
            <Table id={table}>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "primary.main",
                  }}
                >
                  {Object.entries(tbl.fields).map(([key, item]) => (
                    <TableCell
                      sx={{
                        color: "white",
                        textAlign: "center",
                      }}
                      key={item}
                      head
                    >
                      {item}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {renderRows.map((d) => (
                  <TableRow
                    key={d}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#222",
                      },
                    }}
                  >
                    {Object.keys(tbl.fields).map((item) => (
                      <TableCell
                        onClick={() =>
                          !["delete", "update"].includes(item) && clk && clk(d)
                        }
                        sx={{
                          textAlign: "center",
                          color: renderColor(d, item),
                        }}
                        key={item}
                      >
                        {renderSwitch(d, item)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                py: 2,
                px: 3,
              }}
            >
              <Button
                variant="outlined"
                size="large"
                sx={{ borderColor: "divider", color: "#666" }}
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                startIcon={<KeyboardArrowLeft />}
              >
                Previous
              </Button>
              <Pagination
                sx={{ direction: "rtl" }}
                count={Math.ceil(data.length / rowsPerPage)}
                siblingCount={0}
                variant="text"
                shape="rounded"
                size="medium"
                color="standard"
                page={page}
                hideNextButton
                hidePrevButton
                onChange={handleChangePage}
              />
              <Button
                variant="outlined"
                size="large"
                sx={{ borderColor: "divider", color: "#666" }}
                onClick={() => setPage(page + 1)}
                disabled={renderRows.length <= rowsPerPage}
                endIcon={<KeyboardArrowRight />}
              >
                Next
              </Button>
            </Box>
          </TableContainer>
        </Box>
      ) : (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            py: 10,
          }}
        >
          <Box>
            <Typography variant="h6">No data available</Typography>
            <br />
            {add && (
              <Button
                onClick={add}
                variant="contained"
                size="large"
                sx={{ color: "white" }}
                disableElevation
              >
                {addText}
              </Button>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default TableComponent;
