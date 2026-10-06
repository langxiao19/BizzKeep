/**
 * DataList Component
 *
 * The ONLY orchestrator for data display in Menu / Blog / Booking.
 * Composes: Header + Table/Card + Footer
 *
 * Owns state:
 * - viewMode (card / table)
 * - pagination
 *
 * Domain-agnostic - all domain-specific config passed via props.
 *
 * Usage:
 * <DataList
 *   data={items}
 *   headerConfig={{
 *     title: 'Menu Items',
 *     filters: [{ key: 'all', label: 'All' }, { key: 'active', label: 'Active' }],
 *     primaryAction: { label: 'Add Menu', onClick: handleAdd },
 *   }}
 *   searchValue={search}
 *   onSearchChange={setSearch}
 *   renderCard={(item) => <ItemCard item={item} />}
 *   columns={tableColumns}
 *   getItemKey={(item) => item.id}
 *   onItemClick={handleClick}
 * />
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Box, CircularProgress, Typography, Grid, Alert } from '@mui/material';

import Header, { ViewMode, HeaderFilter, PrimaryAction } from './Header';
import Table, { TableColumn, TABLE_SIZE } from './Table';
import Card, { CARD_SIZE } from './Card';
import Footer from './Footer';

// List-level layout rules (MVP: colocated here to avoid an extra file).
const DATALIST_LAYOUT = {
  /** Space between card items in the grid (MUI Grid `spacing`) */
  cardGridSpacing: 2,

  /**
   * When the grid container has a fixed height, MUI Grid (flex-wrap) can
   * stretch row gaps by default. Keep rows packed from the top.
   */
  cardGridAlignContent: 'flex-start' as const,

  /** Content section top margin under header */
  contentTopMargin: 2,
} as const;

export interface DataListFooterAction {
  key: string;
  icon: React.ReactNode;
  tooltip?: string;
  onClick: () => void;
  color?: string;
  disabled?: boolean;
}

export function DataListCardFooter({
  left,
  actions,
}: {
  left?: React.ReactNode;
  actions: DataListFooterAction[];
}) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      pt={0.5}
      borderTop="1px solid"
      borderColor="divider"
      sx={{ minHeight: 28, gap: 1 }}
    >
      <Box sx={{ minWidth: 0 }}>{left ?? <Box />}</Box>
      <Box sx={{ display: 'flex', gap: 0.25, justifyContent: 'flex-end' }}>
        {actions.map((action) => (
          <Box key={action.key}>
            {/* Tooltip is optional; keep wrapper stable */}
            {action.tooltip ? (
              <Box component="span">
                <Box
                  component="button"
                  type="button"
                  disabled={action.disabled}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    action.onClick();
                  }}
                  style={{
                    border: 0,
                    padding: 0,
                    background: 'transparent',
                    cursor: action.disabled ? 'not-allowed' : 'pointer',
                  }}
                  title={action.tooltip}
                >
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 28,
                      height: 28,
                      borderRadius: 1,
                      color: action.color ?? 'text.secondary',
                      '& svg': { fontSize: 14 },
                      '&:hover': action.disabled ? undefined : { backgroundColor: '#7443C010' },
                    }}
                  >
                    {action.icon}
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box
                component="button"
                type="button"
                disabled={action.disabled}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  action.onClick();
                }}
                style={{
                  border: 0,
                  padding: 0,
                  background: 'transparent',
                  cursor: action.disabled ? 'not-allowed' : 'pointer',
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 28,
                    height: 28,
                    borderRadius: 1,
                    color: action.color ?? 'text.secondary',
                    '& svg': { fontSize: 14 },
                    '&:hover': action.disabled ? undefined : { backgroundColor: '#7443C010' },
                  }}
                >
                  {action.icon}
                </Box>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export function DataListTableActions({
  actions,
}: {
  actions: DataListFooterAction[];
}) {
  return (
    <Box sx={{ display: 'flex', gap: 0.25, justifyContent: 'flex-end' }}>
      {actions.map((action) => (
        <Box
          key={action.key}
          component="button"
          type="button"
          disabled={action.disabled}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            action.onClick();
          }}
          title={action.tooltip}
          style={{
            border: 0,
            padding: 0,
            background: 'transparent',
            cursor: action.disabled ? 'not-allowed' : 'pointer',
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 28,
              height: 28,
              borderRadius: 1,
              color: action.color ?? 'text.secondary',
              '& svg': { fontSize: 14 },
              '&:hover': action.disabled ? undefined : { backgroundColor: '#7443C010' },
            }}
          >
            {action.icon}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

/**
 * Header configuration object - maps directly to Header props
 */
export interface HeaderConfig {
  title?: string;
  filters?: HeaderFilter[];
  activeFilter?: string;
  onFilterChange?: (key: string) => void;
  filterLabel?: string;
  primaryAction?: PrimaryAction;
}

export interface DataListProps<T> {
  // Data
  data: T[];
  isLoading?: boolean;
  error?: string | null;

  // Header configuration (all header-related props in one object)
  headerConfig?: HeaderConfig;

  // Legacy header props (for backwards compatibility, prefer headerConfig)
  filters?: HeaderFilter[];
  activeFilter?: string;
  onFilterChange?: (key: string) => void;
  filterLabel?: string;
  primaryAction?: PrimaryAction;

  // Search (optional, client-side)
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;

  // Item count display
  showItemCount?: boolean;

  // Card view
  renderCard: (item: T) => React.ReactNode;

  // Table view
  columns?: TableColumn<T>[];

  // Common
  getItemKey: (item: T) => string;
  onItemClick?: (item: T) => void;

  // Pagination
  pageSize?: number;
  showPagination?: boolean;

  // Empty/loading states
  emptyMessage?: string;
  loadingMessage?: string;
}

// Page sizes for different view modes
const CARD_PAGE_SIZE = CARD_SIZE.pageSize;
const TABLE_PAGE_SIZE = TABLE_SIZE.pageSize;

function DataList<T>({
  data,
  isLoading = false,
  error,
  headerConfig,
  // Legacy props - merged with headerConfig
  filters,
  activeFilter,
  onFilterChange,
  filterLabel,
  primaryAction,
  // Search props
  searchValue,
  onSearchChange,
  searchPlaceholder,
  // Other props
  showItemCount = true,
  renderCard,
  columns = [],
  getItemKey,
  onItemClick,
  pageSize: _pageSize, // Ignored - we use dynamic page size based on viewMode
  showPagination = true,
  emptyMessage = 'No items found',
  loadingMessage = 'Loading...',
}: DataListProps<T>) {
  // View mode state
  const [viewMode, setViewMode] = useState<ViewMode>('card');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Dynamic page size based on view mode
  const pageSize = viewMode === 'card' ? CARD_PAGE_SIZE : TABLE_PAGE_SIZE;

  // Merge headerConfig with legacy props (headerConfig takes precedence)
  const mergedHeaderConfig: HeaderConfig = {
    title: headerConfig?.title,
    filters: headerConfig?.filters ?? filters,
    activeFilter: headerConfig?.activeFilter ?? activeFilter,
    onFilterChange: headerConfig?.onFilterChange ?? onFilterChange,
    filterLabel: headerConfig?.filterLabel ?? filterLabel,
    primaryAction: headerConfig?.primaryAction ?? primaryAction,
  };

  // Calculate pagination
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }, [data, currentPage, pageSize]);

  // Reset to page 1 when data or viewMode changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length, viewMode]);

  // Common header props
  const headerProps = {
    title: mergedHeaderConfig.title,
    filters: mergedHeaderConfig.filters,
    activeFilter: mergedHeaderConfig.activeFilter,
    onFilterChange: mergedHeaderConfig.onFilterChange,
    filterLabel: mergedHeaderConfig.filterLabel,
    primaryAction: mergedHeaderConfig.primaryAction,
    searchValue,
    onSearchChange,
    searchPlaceholder,
    viewMode,
    onViewModeChange: setViewMode,
  };

  // Error state
  if (error) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box>
          <Header {...headerProps} disabled />
        </Box>
        <Box>
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        </Box>
        {showPagination && (
          <Box sx={{ mt: 2 }}>
            <Footer
              currentPage={1}
              totalPages={1}
              totalItems={0}
              pageSize={pageSize}
              onPageChange={() => {}}
              disabled
            />
          </Box>
        )}
      </Box>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box>
          <Header {...headerProps} disabled />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            py: 8,
          }}
        >
          <CircularProgress size={40} sx={{ color: '#7443C0' }} />
          <Typography variant="body1" color="text.secondary">
            {loadingMessage}
          </Typography>
        </Box>
        {showPagination && (
          <Box sx={{ mt: 2 }}>
            <Footer
              currentPage={1}
              totalPages={1}
              totalItems={0}
              pageSize={pageSize}
              onPageChange={() => {}}
              disabled
            />
          </Box>
        )}
      </Box>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box>
          <Header {...headerProps} />
        </Box>
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="body1" color="text.secondary">
            {emptyMessage}
          </Typography>
        </Box>
        {showPagination && (
          <Box sx={{ mt: 2 }}>
            <Footer
              currentPage={1}
              totalPages={1}
              totalItems={0}
              pageSize={pageSize}
              onPageChange={() => {}}
              disabled
            />
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header Section */}
      <Box>
        <Header
          {...headerProps}
          itemCount={showItemCount ? totalItems : undefined}
        />
      </Box>

      {/* Content Section */}
      <Box sx={{ 
        mt: DATALIST_LAYOUT.contentTopMargin,
      }}>
        {viewMode === 'card' ? (
          <Grid
            container
            spacing={DATALIST_LAYOUT.cardGridSpacing}
          >
            {paginatedData.map((item) => (
              <Grid
                size={CARD_SIZE.gridColumns}
                key={getItemKey(item)}
                sx={{ height: CARD_SIZE.slotHeight }}
              >
                <Card
                  item={item}
                  renderItem={renderCard}
                  onClick={onItemClick}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Table
            columns={columns}
            data={paginatedData}
            getRowKey={getItemKey}
            onRowClick={onItemClick}
            emptyMessage={emptyMessage}
          />
        )}
      </Box>

      {/* Footer: Pagination */}
      {showPagination && (
        <Box sx={{ mt: 2 }}>
          <Footer
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            disabled={isLoading}
          />
        </Box>
      )}
    </Box>
  );
}

export default DataList;

// Re-export types for convenience
export type { ViewMode, HeaderFilter, PrimaryAction } from './Header';
export type { TableColumn } from './Table';
