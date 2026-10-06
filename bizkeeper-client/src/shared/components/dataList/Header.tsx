/**
 * DataList Header Component (MVP)
 *
 * Shared, Notion-style header UI for Menu / Blog / Booking lists.
 *
 * Structure:
 * - Control bar (single line, never wraps):
 *   [ 🔍 Search ] [ Filter ▾ ] [ Items: X ] ... [ Card | Table ] [ + Add ]
 *
 * WHY categories are collapsed into a Filter popover:
 * - Menu can have 10+ categories, which breaks the single-line layout
 * - A popover keeps the UI clean and consistent across all tabs
 * - Future: easy to add more filter types (status, date range, etc.)
 *
 * This is MVP structure - designed to be simple and extensible.
 */

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  TextField,
  InputAdornment,
  Popover,
  Badge,
} from '@mui/material';
import {
  ViewModule,
  ViewList,
  Add,
  Search,
  FilterList,
  Close,
} from '@mui/icons-material';

// ============ Types ============

export type ViewMode = 'card' | 'table';

export interface HeaderFilter {
  key: string;
  label: string;
}

export interface PrimaryAction {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

export interface HeaderProps {
  // Title (optional)
  title?: string;

  // Search (optional) - client-side text filtering
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;

  // Category/status filters (shown in popover)
  filters?: HeaderFilter[];
  activeFilter?: string;
  onFilterChange?: (key: string) => void;
  filterLabel?: string; // Label shown on filter button, e.g. "Category"

  // View mode toggle
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;

  // Primary action button (e.g. "Add Menu")
  primaryAction?: PrimaryAction;

  // Item count display (optional) - shown inline in control bar
  itemCount?: number;

  disabled?: boolean;
}

// ============ Component ============

// ============ Component ============

const Header: React.FC<HeaderProps> = ({
  title,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search...',
  filters,
  activeFilter,
  onFilterChange,
  filterLabel = 'Filter',
  viewMode,
  onViewModeChange,
  primaryAction,
  itemCount,
  disabled = false,
}) => {
  // Local state for filter popover
  const [filterAnchor, setFilterAnchor] = useState<HTMLButtonElement | null>(null);
  const filterOpen = Boolean(filterAnchor);

  const handleViewChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: ViewMode | null
  ) => {
    if (newMode !== null) {
      onViewModeChange(newMode);
    }
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchor(null);
  };

  const handleFilterSelect = (key: string) => {
    onFilterChange?.(key);
    // Don't close popover - let user select and see result
  };

  // Check if a non-default filter is active (for badge indicator)
  const hasActiveFilter = activeFilter && activeFilter !== 'all';

  // Find active filter label for display
  const activeFilterLabel = filters?.find((f) => f.key === activeFilter)?.label;

  return (
    <Box>
      {/* ============ 1. Title (optional) ============ */}
      {title && (
        <Typography
          variant="h5"
          sx={{
            color: '#7443C0',
            fontWeight: 700,
            mb: 3,
          }}
        >
          {title}
        </Typography>
      )}

      {/* ============ 2. Control Bar (single line) ============ */}
      {/* Layout: [ Search ] [ Filter ▾ ] [ Items: X ] ... [ Card|Table ] [ + Add ] */}
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          flexWrap: 'nowrap', // Never wrap to second line
        }}
      >
        {/* Search Input */}
        {onSearchChange && (
          <TextField
            size="small"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            disabled={disabled}
            sx={{
              minWidth: 160,
              maxWidth: 200,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#fafafa',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
                '&.Mui-focused': {
                  backgroundColor: 'white',
                },
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'text.secondary', fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: searchValue ? (
                  <InputAdornment position="end">
                    <Close
                      sx={{
                        color: 'text.secondary',
                        fontSize: 18,
                        cursor: 'pointer',
                        '&:hover': { color: 'text.primary' },
                      }}
                      onClick={() => onSearchChange('')}
                    />
                  </InputAdornment>
                ) : null,
              },
            }}
          />
        )}

        {/* Filter Button (opens popover with category chips) */}
        {filters && filters.length > 0 && (
          <>
            <Badge
              color="primary"
              variant="dot"
              invisible={!hasActiveFilter}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#7443C0',
                },
              }}
            >
              <Button
                variant="outlined"
                size="small"
                onClick={handleFilterClick}
                disabled={disabled}
                startIcon={<FilterList />}
                sx={{
                  borderColor: filterOpen || hasActiveFilter ? '#7443C0' : '#e0e0e0',
                  color: filterOpen || hasActiveFilter ? '#7443C0' : 'text.secondary',
                  textTransform: 'none',
                  fontWeight: 500,
                  borderRadius: 2,
                  px: 1.5,
                  minWidth: 'auto',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    borderColor: '#7443C0',
                    backgroundColor: '#7443C010',
                  },
                }}
              >
                {hasActiveFilter ? activeFilterLabel : filterLabel}
              </Button>
            </Badge>

            {/* Filter Popover */}
            <Popover
              open={filterOpen}
              anchorEl={filterAnchor}
              onClose={handleFilterClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1,
                    p: 2,
                    borderRadius: 2,
                    minWidth: 200,
                    maxWidth: 320,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  },
                },
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ mb: 1.5, color: 'text.secondary', fontWeight: 600 }}
              >
                {filterLabel}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {filters.map((filter) => (
                  <Chip
                    key={filter.key}
                    label={filter.label}
                    onClick={() => handleFilterSelect(filter.key)}
                    color={activeFilter === filter.key ? 'primary' : 'default'}
                    variant={activeFilter === filter.key ? 'filled' : 'outlined'}
                    size="small"
                    sx={{
                      textTransform: 'capitalize',
                      fontWeight: activeFilter === filter.key ? 600 : 400,
                      '&.MuiChip-colorPrimary': {
                        backgroundColor: '#7443C0',
                      },
                      '&:hover': {
                        backgroundColor:
                          activeFilter === filter.key ? '#5C359A' : '#f5f5f5',
                      },
                    }}
                  />
                ))}
              </Box>
            </Popover>
          </>
        )}

        {/* Item Count - inline in control bar */}
        {itemCount !== undefined && (
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              whiteSpace: 'nowrap',
              ml: 0.5,
            }}
          >
            Items: {itemCount}
            {searchValue && ' (filtered)'}
          </Typography>
        )}

        {/* Spacer */}
        <Box sx={{ flex: 1 }} />

        {/* View Mode Switch */}
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewChange}
          size="small"
          disabled={disabled}
          sx={{
            '& .MuiToggleButton-root': {
              border: '1px solid #e0e0e0',
              px: 1,
              '&.Mui-selected': {
                backgroundColor: '#7443C0',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#5C359A',
                },
              },
            },
          }}
        >
          <ToggleButton value="card" aria-label="card view">
            <Tooltip title="Card View">
              <ViewModule sx={{ fontSize: 20 }} />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value="table" aria-label="table view">
            <Tooltip title="Table View">
              <ViewList sx={{ fontSize: 20 }} />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Primary Action Button */}
        {primaryAction && (
          <Button
            variant="contained"
            onClick={primaryAction.onClick}
            disabled={disabled}
            startIcon={primaryAction.icon || <Add />}
            sx={{
              backgroundColor: '#7443C0',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              px: 2,
              whiteSpace: 'nowrap',
              '&:hover': {
                backgroundColor: '#5C359A',
              },
            }}
          >
            {primaryAction.label}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Header;
