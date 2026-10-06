import React, { useState, useMemo } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { Delete, Edit, OpenInNew, Visibility } from '@mui/icons-material';
import { BlogPost } from './blogService';
import {
  DataList,
  DataListCardFooter,
  DataListTableActions,
  TableColumn,
  HeaderFilter,
} from '../../../shared/components/dataList';

/**
 * BlogList Component
 *
 * Collection page for blog posts.
 * Uses shared DataList for all UI orchestration.
 *
 * Thin & declarative - only:
 * - Header configuration (stats, filters, primaryAction)
 * - Table column definitions
 * - Card render function
 * - Navigation to Detail
 */

interface BlogListProps {
  posts: BlogPost[];
  isLoading?: boolean;
  onEditPost?: (post: BlogPost) => void;
  onPreviewPost?: (post: BlogPost) => void;
  onAddPost?: () => void;
  onDeletePost?: (post: BlogPost) => void;
}

const statusColors: Record<string, 'success' | 'warning' | 'default'> = {
  published: 'success',
  draft: 'warning',
  scheduled: 'default',
};

const BlogList: React.FC<BlogListProps> = ({
  posts,
  isLoading = false,
  onEditPost,
  onPreviewPost,
  onAddPost,
  onDeletePost,
}) => {
  // ============ Filter & Search State ============
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // ============ Derived Data ============
  const categories = useMemo(() => {
    const cats = new Set(posts.map((p) => p.category));
    return ['all', ...Array.from(cats)];
  }, [posts]);

  // Filter by category, then by search query
  const filteredPosts = useMemo(() => {
    let items = activeFilter === 'all' ? posts : posts.filter((p) => p.category === activeFilter);
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query)
      );
    }
    return items;
  }, [posts, activeFilter, searchQuery]);

  // ============ Header Config ============
  const filtersConfig: HeaderFilter[] = categories.map((category) => ({
    key: category,
    label: category === 'all' ? 'All Posts' : category,
  }));

  // ============ Card Renderer ============
  const renderBlogCard = (post: BlogPost) => (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Image area */}
      <Box
        sx={{
          width: '100%',
          height: 140,
          backgroundColor: post.image ? 'transparent' : '#f5f5f5',
          borderRadius: 1,
          mb: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {post.image ? (
          <Box
            component="img"
            src={post.image}
            alt={post.title}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Edit sx={{ fontSize: 32, color: '#ccc' }} />
        )}
      </Box>

      {/* Title + Status */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            flex: 1,
            mr: 1,
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.2,
            fontSize: '0.9rem',
          }}
        >
          {post.title}
        </Typography>
        <Chip
          label={post.status}
          size="small"
          color={statusColors[post.status]}
          sx={{ textTransform: 'capitalize', fontSize: '0.65rem', height: 18 }}
        />
      </Box>

      {/* Category */}
      <Chip
        label={post.category}
        size="small"
        sx={{
          mb: 0.5,
          backgroundColor: '#7443C0',
          color: 'white',
          fontSize: '0.7rem',
          height: 20,
          alignSelf: 'flex-start',
        }}
      />

      {/* Excerpt */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 1,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: 1.3,
          fontSize: '0.8rem',
          flex: 1,
        }}
      >
        {post.excerpt}
      </Typography>

      {/* Read time + Views */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
          {post.readTime}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Visibility sx={{ fontSize: 12, color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
            {post.views}
          </Typography>
        </Box>
      </Box>

      {/* Footer */}
      <DataListCardFooter
        actions={[
          {
            key: 'edit',
            tooltip: 'Edit',
            icon: <Edit />,
            color: '#7443C0',
            onClick: () => onEditPost?.(post),
          },
          {
            key: 'preview',
            tooltip: 'Preview',
            icon: <OpenInNew />,
            color: 'text.secondary',
            onClick: () => onPreviewPost?.(post),
            disabled: !onPreviewPost,
          },
          {
            key: 'delete',
            tooltip: 'Delete',
            icon: <Delete />,
            color: '#D32F2F',
            onClick: () => onDeletePost?.(post),
            disabled: !onDeletePost,
          },
        ]}
      />
    </Box>
  );

  // ============ Table Columns ============
  const tableColumns: TableColumn<BlogPost>[] = [
    {
      key: 'title',
      header: 'Title',
      render: (post) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {post.image && (
            <Box
              component="img"
              src={post.image}
              alt={post.title}
              sx={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 1 }}
            />
          )}
          <Box>
            <Typography variant="body2" fontWeight={600}>{post.title}</Typography>
            <Typography variant="caption" color="text.secondary">{post.category}</Typography>
          </Box>
        </Box>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (post) => (
        <Chip
          label={post.status}
          size="small"
          color={statusColors[post.status]}
          sx={{ textTransform: 'capitalize' }}
        />
      ),
    },
    {
      key: 'views',
      header: 'Views',
      align: 'right',
      render: (post) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
          <Visibility sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2">{post.views}</Typography>
        </Box>
      ),
    },
    {
      key: 'readTime',
      header: 'Read Time',
      align: 'center',
      render: (post) => (
        <Typography variant="body2" color="text.secondary">{post.readTime}</Typography>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (post) => (
        <DataListTableActions
          actions={[
            {
              key: 'edit',
              tooltip: 'Edit',
              icon: <Edit />,
              color: '#7443C0',
              onClick: () => onEditPost?.(post),
            },
            {
              key: 'preview',
              tooltip: 'Preview',
              icon: <OpenInNew />,
              color: 'text.secondary',
              onClick: () => onPreviewPost?.(post),
              disabled: !onPreviewPost,
            },
            {
              key: 'delete',
              tooltip: 'Delete',
              icon: <Delete />,
              color: '#D32F2F',
              onClick: () => onDeletePost?.(post),
              disabled: !onDeletePost,
            },
          ]}
        />
      ),
    },
  ];

  // ============ Render ============
  return (
    <DataList
      data={filteredPosts}
      isLoading={isLoading}
      filters={filtersConfig}
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
      filterLabel="Category"
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder="Search posts..."
      primaryAction={
        onAddPost
          ? {
              label: 'Add',
              onClick: onAddPost,
            }
          : undefined
      }
      showItemCount={true}
      renderCard={renderBlogCard}
      columns={tableColumns}
      getItemKey={(post) => post.id}
      onItemClick={onEditPost}
      emptyMessage="No blog posts found"
      loadingMessage="Loading blog posts..."
    />
  );
};

export default BlogList;
