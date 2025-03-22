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
  Chip,
} from "@mui/material";
import { format as dateFormat } from "date-fns";
import { Add, DeleteOutline, EditOutlined } from "@mui/icons-material";
import { tables } from "@/config";
import { useEffect, useState } from "react";
import { keyframes } from "@mui/system";

// Neon glow animation
const neonGlow = keyframes`
  0% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff; }
  50% { text-shadow: 0 0 8px #00e5ff, 0 0 15px #00e5ff, 0 0 20px #00e5ff; }
  100% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff; }
`;

const TableComponent = ({
  table,
  data,
  del,
  upd,
  add,
  addText,
  clk,
  removeItems = [],
  addItems = {},
  details,
  page,
  totalPages,
  onPageChange,
}) => {
  const tbl = { ...tables[table] };

  removeItems.forEach((item) => delete tbl.fields[item]);
  Object.entries(addItems).forEach(([key, value]) => (tbl.fields[key] = value));

  const [renderRows, setRenderRows] = useState([]);

  const handleChangePage = (e, newPage) => {
    onPageChange(newPage);
  };

  useEffect(() => {
    const enrichedData = data.map((d) => ({
      ...d,
      ...(del && {
        delete: (
          <Box sx={{ textAlign: "center" }}>
            <IconButton onClick={() => del(d)} sx={{ color: "error.main" }}>
              <DeleteOutline fontSize="small" />
            </IconButton>
          </Box>
        ),
      }),
      ...(upd && {
        update: (
          <Box sx={{ textAlign: "center" }}>
            <IconButton onClick={() => upd(d)} sx={{ color: "primary.main" }}>
              <EditOutlined fontSize="small" />
            </IconButton>
          </Box>
        ),
      }),
    }));
    setRenderRows(enrichedData);
  }, [data, del, upd]);

  const renderSwitch = (d, key) => {
    const props = key.split(".");
    const value = props.reduce((acc, prop) => acc?.[prop], d);

    switch (key) {
      case "createdAt":
      case "updatedAt":
        return value ? dateFormat(new Date(value), "yyyy/MM/dd") : "N/A";
      case "ipCommunication":
        return value ? "IP" : "DNS";
      case "dockerMetrics":
        return (
          <Chip label={value ? "Yes" : "No"} color="default" size="small" />
        );
      case "agentAvailable":
        return d.isActive ? (
          value ? (
            <Chip label="Connect" color="success" size="small" />
          ) : (
            <Chip label="Disconnect" color="error" size="small" />
          )
        ) : (
          <Chip label="Inactive" color="default" size="small" />
        );
      case "alertStatus":
        return value === "non-exists" ? (
          <Chip label="Not Implemented" color="default" size="small" />
        ) : value === "active" ? (
          <Chip label="Active" color="success" size="small" />
        ) : (
          <Chip label="Inactive" color="error" size="small" />
        );
      default:
        return value ?? "—"; // Default to dash if undefined/null
    }
  };

  return (
    <Box sx={{ py: 2 }}>
      {data.length > 0 ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                // fontFamily="Orbitron"
                fontWeight="bold"
                color="primary.main"
                // sx={{ animation: `${neonGlow} 2s ease-in-out infinite` }}
              >
                {tbl.title}
              </Typography>
              {details && (
                <Typography
                  variant="body2"
                  color="rgba(255, 255, 255, 0.7)"
                  sx={{ mt: 1 }}
                >
                  {details}
                </Typography>
              )}
            </Box>
            {add && (
              <Button
                onClick={add}
                variant="contained"
                size="large"
                startIcon={<Add />}
                disableElevation
                sx={{
                  bgcolor: "primary.main",
                  borderRadius: 2,
                  py: 1,
                  px: 3,
                  "&:hover": {
                    bgcolor: "primary.dark",
                    boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
                  },
                }}
              >
                {addText}
              </Button>
            )}
          </Box>

          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              bgcolor: "rgba(30, 30, 30, 0.9)",
              border: "1px solid rgba(0, 255, 255, 0.3)",
              borderRadius: 2,
              backdropFilter: "blur(10px)",
              // "&:hover": { boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)" },
            }}
          >
            <Table id={table}>
              <TableHead>
                <TableRow
                  sx={{
                    bgcolor: "primary.main",
                    "& th": {
                      color: "black",
                      textAlign: "center",
                      // fontFamily: "Orbitron",
                      fontWeight: "bold",
                      borderBottom: "1px solid rgba(0, 255, 255, 0.5)",
                    },
                  }}
                >
                  {Object.entries(tbl.fields).map(([key, label]) => (
                    <TableCell key={key}>{label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {renderRows.map((row, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      "&:hover": {
                        bgcolor: "rgba(0, 255, 255, 0.1)",
                        cursor:
                          clk && !["delete", "update"].includes(row)
                            ? "pointer"
                            : "default",
                      },
                      "& td": {
                        color: "white",
                        textAlign: "center",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    {Object.keys(tbl.fields).map((key) => (
                      <TableCell
                        key={key}
                        onClick={() =>
                          !["delete", "update"].includes(key) && clk && clk(row)
                        }
                      >
                        {renderSwitch(row, key)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 2,
              }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                color="primary"
                size="medium"
                shape="rounded"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "white",
                    "&:hover": { bgcolor: "rgba(0, 255, 255, 0.2)" },
                    "&.Mui-selected": { bgcolor: "primary.main" },
                  },
                }}
              />
            </Box>
          </TableContainer>
        </>
      ) : (
        <Box
          sx={{
            py: 10,
            textAlign: "center",
            bgcolor: "rgba(30, 30, 30, 0.9)",
            border: "1px solid rgba(0, 255, 255, 0.3)",
            borderRadius: 2,
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography
            variant="h6"
            color="white"
            fontFamily="Orbitron"
            sx={{ mb: 3 }}
          >
            No data available
          </Typography>
          {add && (
            <Button
              onClick={add}
              variant="contained"
              size="large"
              startIcon={<Add />}
              disableElevation
              sx={{
                bgcolor: "primary.main",
                borderRadius: 2,
                py: 1,
                px: 3,
                "&:hover": {
                  bgcolor: "primary.dark",
                  boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
                },
              }}
            >
              {addText}
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default TableComponent;
