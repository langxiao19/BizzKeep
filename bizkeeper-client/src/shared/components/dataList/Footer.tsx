/**
 * Footer Component (Pagination)
 *
 * Pagination control for data lists.
 * Works for both Card and Table views.
 * Domain-agnostic - no business logic.
 */

import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export interface FooterProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

const Footer: React.FC<FooterProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  disabled = false,
}) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 1.5,
        px: 1,
      }}
    >
      {/* Item count */}
      <Typography variant="body2" color="text.secondary">
        {totalItems > 0 ? `Showing ${startItem}-${endItem} of ${totalItems}` : 'No items'}
      </Typography>

      {/* Navigation controls */}
      {totalPages > 1 ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={handlePrevious}
            disabled={disabled || currentPage === 1}
            size="small"
            sx={{ color: '#7443C0' }}
          >
            <ChevronLeft />
          </IconButton>

          <Typography variant="body2" sx={{ minWidth: 80, textAlign: 'center' }}>
            Page {currentPage} of {totalPages}
          </Typography>

          <IconButton
            onClick={handleNext}
            disabled={disabled || currentPage === totalPages}
            size="small"
            sx={{ color: '#7443C0' }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Page 1 of 1
        </Typography>
      )}
    </Box>
  );
};

export default Footer;

