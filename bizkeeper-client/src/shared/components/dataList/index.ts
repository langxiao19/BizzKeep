/**
 * DataList Components
 *
 * Shared, domain-agnostic UI components for displaying collections of data.
 * Used by Menu / Blog / Booking lists with consistent structure.
 *
 * - DataList: Orchestrator (state + composition only)
 * - Header: Shared header UI (title, stats, filters, view switch, primary action)
 * - Table: Generic table renderer
 * - Card: Generic card renderer
 * - Footer: Pagination
 */

export { default as DataList } from './DataList';
export type {
  DataListProps,
  HeaderConfig,
  ViewMode,
  HeaderFilter,
  PrimaryAction,
  TableColumn,
  DataListFooterAction,
} from './DataList';
export { DataListCardFooter, DataListTableActions } from './DataList';

export { default as Header } from './Header';
export type { HeaderProps } from './Header';

export { default as Table } from './Table';
export type { TableProps } from './Table';
export { TABLE_SIZE } from './Table';

export { default as Card } from './Card';
export type { CardProps } from './Card';
export { CARD_SIZE } from './Card';

export { default as Footer } from './Footer';
export type { FooterProps } from './Footer';
