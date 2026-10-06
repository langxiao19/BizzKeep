/**
 * Table Component
 *
 * Generic table renderer for data lists.
 * Domain-agnostic - no business logic.
 *
 * Usage:
 * <Table
 *   columns={[
 *     { key: 'title', header: 'Title', render: (item) => item.title },
 *     { key: 'status', header: 'Status', render: (item) => <Chip label={item.status} /> },
 *   ]}
 *   data={items}
 *   onRowClick={handleRowClick}
 * />
 */

import React from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from '@mui/material';

/**
 * Table sizing & density constants.
 *
 * These define the canonical "compact table" look used across DataList pages.
 */
export const TABLE_SIZE = {
  /** Page size in table view */
  pageSize: 10,

  /** Padding-y for header cells */
  headCellPy: 0.75,

  /** Padding-y for body cells */
  bodyCellPy: 1.2,

  /** Header row styling */
  headerBgColor: '#f8f9fa',
  headerTextColor: '#7443C0',

  /** Hover background for clickable rows */
  rowHoverBgColor: '#7443C010',
} as const;

export interface TableColumn<T> {
  key: string;
  header: string;
  render: (item: T) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  getRowKey: (item: T) => string;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

function Table<T>({
  columns,
  data,
  getRowKey,
  onRowClick,
  emptyMessage = 'No items found',
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <MuiTable>
        <TableHead>
          <TableRow sx={{ backgroundColor: TABLE_SIZE.headerBgColor }}>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                align={column.align || 'left'}
                sx={{
                  fontWeight: 600,
                  color: TABLE_SIZE.headerTextColor,
                  width: column.width,
                  py: TABLE_SIZE.headCellPy, // Compact: reduced padding for denser rows
                }}
              >
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={getRowKey(item)}
              onClick={() => onRowClick?.(item)}
              sx={{
                cursor: onRowClick ? 'pointer' : 'default',
                '&:hover': onRowClick
                  ? { backgroundColor: TABLE_SIZE.rowHoverBgColor }
                  : undefined,
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              {columns.map((column) => (
                <TableCell 
                  key={column.key} 
                  align={column.align || 'left'}
                  sx={{ py: TABLE_SIZE.bodyCellPy }} // Compact: reduced padding for denser rows
                >
                  {column.render(item)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}

export default Table;

