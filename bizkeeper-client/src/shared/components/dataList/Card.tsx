/**
 * Card Component
 *
 * Generic card container for data lists.
 * Domain-agnostic - no business logic.
 *
 * Usage:
 * <Card
 *   item={blogPost}
 *   renderItem={(item) => <BlogPostCard post={item} />}
 *   onClick={handleClick}
 * />
 */

import React from 'react';
import { Card as MuiCard, CardContent } from '@mui/material';

/**
 * Card sizing constants (Menu baseline).
 *
 * Note: Grid spacing and overall list orchestration belong to `Layout.ts` / `DataList.tsx`.
 * These constants describe the card slot sizing + internal padding rules.
 */
export const CARD_SIZE = {
  /** CardContent padding */
  contentPadding: 1.5,

  /** Fixed slot height used by DataList's card grid */
  slotHeight: 280,

  /** Responsive grid columns used by DataList's card grid */
  gridColumns: { xs: 12, sm: 6, md: 4 },

  /** Page size in card view */
  pageSize: 6, // 2 rows × 3 cards
} as const;

export interface CardProps<T> {
  item: T;
  renderItem: (item: T) => React.ReactNode;
  onClick?: (item: T) => void;
  selected?: boolean;
}

function Card<T>({
  item,
  renderItem,
  onClick,
  selected = false,
}: CardProps<T>) {
  const handleClick = () => {
    onClick?.(item);
  };

  return (
    <MuiCard
      variant="outlined"
      onClick={handleClick}
      sx={{
        height: '100%',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        border: selected ? '2px solid #7443C0' : undefined,
        '&:hover': onClick
          ? {
              boxShadow: '0 4px 12px rgba(116, 67, 192, 0.15)',
              transform: 'translateY(-2px)',
            }
          : undefined,
      }}
    >
      <CardContent
        sx={{
          p: CARD_SIZE.contentPadding,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {renderItem(item)}
      </CardContent>
    </MuiCard>
  );
}

export default Card;

