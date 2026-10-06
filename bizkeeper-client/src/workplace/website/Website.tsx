import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Tabs, Tab, Button } from '@mui/material';
import { Restaurant, Article, Event, Settings, OpenInNew } from '@mui/icons-material';

// Import feature modules
import MenuList from './menu/MenuList';
import BlogList from './blog/BlogList';
import BlogEditorDialog from './blog/BlogEditorDialog';
import BookingList from './booking/BookingList';
import SettingsModule from './Settings';

// Import blog service for data management
import { BlogPost, fetchPosts, removePost } from './blog/blogService';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  if (value !== index) {
    return null;
  }
  return (
    <Box
      role="tabpanel"
      id={`website-tabpanel-${index}`}
      aria-labelledby={`website-tab-${index}`}
      sx={{ height: '100%' }}
    >
      {children}
    </Box>
  );
};

/**
 * Website Core Shell
 *
 * Single entry point for all website-related functionality.
 * Owns:
 * - Website-level layout and header
 * - Tab navigation structure
 * - Routing between feature modules
 *
 * Feature modules (MenuList, BlogList, BookingList) own their own:
 * - Filters and view switching
 * - Primary action buttons
 * - Data display (cards/table)
 * - Pagination
 *
 * This ensures consistent UI structure across all tabs via shared DataList.
 */
const Website: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Blog data management at the website level
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [blogEditOpen, setBlogEditOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Load blog posts
  const loadBlogPosts = useCallback(() => {
    setBlogLoading(true);
    try {
      const loadedPosts = fetchPosts();
      setPosts(loadedPosts);
    } finally {
      setBlogLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBlogPosts();
  }, [loadBlogPosts]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Blog handlers
  const handleAddBlogPost = () => {
    setSelectedPost(null);
    setBlogEditOpen(true);
  };

  const handleEditBlogPost = (post: BlogPost) => {
    setSelectedPost(post);
    setBlogEditOpen(true);
  };

  const handlePreviewBlogPost = (post: BlogPost) => {
    window.open(`/digitalcafe/blog/${post.id}`, '_blank');
  };

  const handleDeleteBlogPost = (post: BlogPost) => {
    const ok = window.confirm(`Delete "${post.title}"? This cannot be undone.`);
    if (!ok) return;
    removePost(post.id);
    // Close editor if user deleted the currently open post
    if (selectedPost?.id === post.id) {
      setBlogEditOpen(false);
      setSelectedPost(null);
    }
    loadBlogPosts();
  };

  const handleBlogEditClose = () => {
    setBlogEditOpen(false);
    setSelectedPost(null);
  };

  const handleBlogSave = (savedPost: BlogPost) => {
    loadBlogPosts(); // Refresh the list
    setBlogEditOpen(false);
    setSelectedPost(null);
  };

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header Row: Title + View Live Website | Tab Switch */}
      <Box
        sx={{
          flexShrink: 0,
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Left side: Title + View Live Website button */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h4" fontWeight={600}>
            Website Editor
          </Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<OpenInNew sx={{ fontSize: 16 }} />}
            onClick={() => window.open('/digitalcafe', '_blank')}
            sx={{
              borderColor: '#7443C0',
              color: '#7443C0',
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: 2,
              px: 1.5,
              '&:hover': {
                borderColor: '#5C359A',
                backgroundColor: '#7443C010',
              },
            }}
          >
            View Live Website
          </Button>
        </Box>

        {/* Right side: Tab Switch Bar */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="website editor tabs"
          sx={{
            minHeight: 40,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              minHeight: 40,
              fontSize: '0.9rem',
              px: 2,
              py: 1,
            },
            '& .Mui-selected': {
              color: '#7443C0',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#7443C0',
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
          }}
        >
          <Tab
            icon={<Restaurant sx={{ fontSize: 18 }} />}
            iconPosition="start"
            label="Menu"
            id="website-tab-0"
            aria-controls="website-tabpanel-0"
          />
          <Tab
            icon={<Article sx={{ fontSize: 18 }} />}
            iconPosition="start"
            label="Blog"
            id="website-tab-1"
            aria-controls="website-tabpanel-1"
          />
          <Tab
            icon={<Event sx={{ fontSize: 18 }} />}
            iconPosition="start"
            label="Booking"
            id="website-tab-2"
            aria-controls="website-tabpanel-2"
          />
          <Tab
            icon={<Settings sx={{ fontSize: 18 }} />}
            iconPosition="start"
            label="Settings"
            id="website-tab-3"
            aria-controls="website-tabpanel-3"
          />
        </Tabs>
      </Box>

      {/* Feature Module Panels - Each module owns its own header/stats/filters/actions via DataList */}
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <TabPanel value={activeTab} index={0}>
          <MenuList />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <BlogList
            posts={posts}
            isLoading={blogLoading}
            onEditPost={handleEditBlogPost}
            onPreviewPost={handlePreviewBlogPost}
            onAddPost={handleAddBlogPost}
            onDeletePost={handleDeleteBlogPost}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <BookingList />
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <SettingsModule />
        </TabPanel>
      </Box>

      {/* Blog Editor Dialog */}
      <BlogEditorDialog
        open={blogEditOpen}
        onClose={handleBlogEditClose}
        post={selectedPost}
        onSave={handleBlogSave}
      />
    </Box>
  );
};

export default Website;
