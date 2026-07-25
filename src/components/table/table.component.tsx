"use client";

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
  Chip,
  Tooltip,
  Pagination,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useEffect, useState, useMemo } from "react";
import tables from "@/core/table/table.config";
import { format as dateFormat } from "date-fns";

// ====================== TYPES ======================
interface TableConfig {
  title: string;
  fields: Record<string, string>;
}

interface TableProps {
  table: string;
  data: any[];
  addText?: string;
  add?: () => void;
  clk?: (row: any) => void;
  del?: (row: any) => void;
  upd?: (row: any) => void; // renamed from old "upd"
  page?: number;
  totalPages?: number;
  onPageChange?: (newPage: number) => void;
  removeItems?: string[];
  addItems?: Record<string, string>;
  details?: string;
  loading?: boolean;
}

export default function TableComponent({
  table,
  data = [],
  addText = "Add New",
  add,
  clk,
  del,
  upd,
  page = 1,
  totalPages = 1,
  onPageChange,
  removeItems = [],
  addItems = {},
  details,
}: TableProps) {
  const baseConfig = tables[table] as TableConfig | undefined;

  // Merge config dynamically
  const config = useMemo(() => {
    if (!baseConfig) return { title: "Table", fields: {} };

    const fields = { ...baseConfig.fields };

    removeItems.forEach((item) => delete fields[item]);
    Object.entries(addItems).forEach(([key, value]) => {
      fields[key] = value;
    });

    return { ...baseConfig, fields };
  }, [baseConfig, removeItems, addItems]);

  const [renderRows, setRenderRows] = useState<any[]>([]);

  // Enrich data with action buttons
  useEffect(() => {
    const enriched = data.map((row) => ({
      ...row,
      ...(del && {
        delete: (
          <Box sx={{ textAlign: "center" }}>
            <IconButton onClick={() => del(row)} color="error" size="small">
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        ),
      }),
      ...(upd && {
        update: (
          <Box sx={{ textAlign: "center" }}>
            <IconButton onClick={() => upd(row)} color="primary" size="small">
              <Edit fontSize="small" />
            </IconButton>
          </Box>
        ),
      }),
    }));
    setRenderRows(enriched);
  }, [data, del, upd]);

  const renderCell = (row: any, key: string) => {
    const value = key.split(".").reduce((acc, prop) => acc?.[prop], row);

    switch (key) {
      case "created_at":
      case "updated_at":
        return value ? dateFormat(new Date(value), "yyyy/MM/dd") : "—";

      case "agent_availability":
        return (
          <Tooltip title={row.latestActionMessage || ""} arrow>
            {row.agent_availability ? (
              <Chip label="Connected" color="success" size="small" />
            ) : (
              <Chip label="Disconnected" color="error" size="small" />
            )}
          </Tooltip>
        );

      case "is_active":
        return (
          <Tooltip title={row.latestActionMessage || ""} arrow>
            {row.is_active ? (
              <Chip label="Active" color="success" size="small" />
            ) : (
              <Chip label="Inactive" color="default" size="small" />
            )}
          </Tooltip>
        );

      default:
        return value ?? "—";
    }
  };

  if (data.length === 0) {
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No data available
        </Typography>
        {add && (
          <Button
            onClick={add}
            variant="contained"
            startIcon={<Add />}
            sx={{ mt: 2, borderRadius: 1 }}
          >
            {addText}
          </Button>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ py: 2 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" color="text.primary">
            {config.title}
          </Typography>
          {details && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {details}
            </Typography>
          )}
        </Box>

        {add && (
          <Button
            onClick={add}
            variant="contained"
            startIcon={<Add />}
            sx={{ borderRadius: 1, px: 3, py: 1 }}
            disableElevation
          >
            {addText}
          </Button>
        )}
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ borderRadius: 1, overflow: "hidden" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.paper" }}>
              {Object.entries(config.fields).map(([key, label]) => (
                <TableCell
                  key={key}
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    textAlign: "center",
                    borderBottom: "2px solid",
                    borderColor: "divider",
                  }}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {renderRows.map((row, idx) => (
              <TableRow
                key={idx}
                hover
                sx={{
                  "&:last-child td": { borderBottom: 0 },
                  cursor: clk ? "pointer" : "default",
                }}
                onClick={() => {
                  if (clk) clk(row);
                }}
              >
                {Object.keys(config.fields).map((key) => (
                  <TableCell
                    key={key}
                    onClick={(e) => {
                      if (["delete", "update"].includes(key))
                        e.stopPropagation();
                    }}
                    sx={{ textAlign: "center", py: 2 }}
                  >
                    {renderCell(row, key)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {totalPages > 1 && onPageChange && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, newPage) => onPageChange(newPage)}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
}
