import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  CardMedia,
  Grid,
  Chip,
  Button,
  Avatar,
  IconButton,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Comment, Share, Bookmark, Search } from '@mui/icons-material';
import Navbar from '../layout/Navbar';
import { blogPosts, getFeaturedPosts } from '../services/blogService';

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch && post.status === 'published';
  });

  const featuredPosts = getFeaturedPosts();
  const recentPosts = blogPosts.slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f6f0' }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600;700&family=Roboto:wght@300;400;500;700&display=swap');
          
          .blog-hero {
            background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), 
                        url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'),
                        linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%);
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            color: white;
            padding: 80px 0 60px;
            text-align: center;
            position: relative;
            overflow: hidden;
            min-height: 400px;
            display: flex;
            align-items: center;
          }
          
          .blog-hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(139, 69, 19, 0.1);
            animation: float 20s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .blog-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          
          .blog-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          
          .blog-read-more {
            background: linear-gradient(45deg, #8B4513, #A0522D);
            color: white;
            border: none;
            padding: 8px 24px;
            border-radius: 20px;
            font-weight: 600;
            transition: all 0.3s ease;
          }
          
          .blog-read-more:hover {
            background: linear-gradient(45deg, #A0522D, #CD853F);
            transform: translateY(-2px);
          }
          
          .featured-badge {
            position: absolute;
            top: 16px;
            right: 16px;
            background: linear-gradient(45deg, #FF6B35, #F7931E);
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
        `}
      </style>

      <Navbar currentPage="blog" />

      {/* Hero Section */}
      <Box className="blog-hero">
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              mb: 3,
              fontFamily: 'serif',
              textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
              position: 'relative',
              zIndex: 2,
            }}
          >
            Blog
          </Typography>
          <Typography
            variant="h5"
            sx={{
              opacity: 0.95,
              mb: 4,
              fontFamily: 'serif',
              fontStyle: 'italic',
              position: 'relative',
              zIndex: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Stories, Recipes & Insights from Our Kitchen
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid size={{ xs: 12, lg: 8 }}>
            {/* Featured Posts */}
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h4"
                sx={{ mb: 3, color: '#8B4513', fontWeight: 700, fontFamily: 'serif' }}
              >
                Featured Stories
              </Typography>
              <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#8B4513' }}>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Featured</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Title</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Author</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Date</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Read Time</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {featuredPosts.map((post) => (
                      <TableRow
                        key={post.id}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': { backgroundColor: '#f5f5f5' },
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                        onClick={() => navigate(`/digitalcafe/blog/${post.id}`)}
                      >
                        <TableCell>
                          <Box sx={{ position: 'relative', width: 80, height: 60 }}>
                            <CardMedia
                              component="img"
                              height="60"
                              image={post.image}
                              alt={post.title}
                              sx={{ objectFit: 'cover', borderRadius: 1 }}
                            />
                            <Box
                              sx={{
                                position: 'absolute',
                                top: 4,
                                left: 4,
                                backgroundColor: '#FF6B35',
                                color: 'white',
                                px: 1,
                                py: 0.5,
                                borderRadius: 0.5,
                                fontSize: '0.6rem',
                                fontWeight: 600,
                              }}
                            >
                              Featured
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 600, color: '#2d333a', lineHeight: 1.3, mb: 0.5 }}
                            >
                              {post.title}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#666', lineHeight: 1.4 }}>
                              {post.excerpt.substring(0, 100)}...
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 0.5, mt: 1 }}>
                              <Chip
                                label={
                                  post.generatedBy === 'digitalcafe-agent'
                                    ? 'DigitalCafe'
                                    : post.generatedBy === 'marketing-agent'
                                    ? 'Marketing'
                                    : 'Manual'
                                }
                                size="small"
                                sx={{
                                  backgroundColor:
                                    post.generatedBy === 'digitalcafe-agent'
                                      ? '#7443C0'
                                      : post.generatedBy === 'marketing-agent'
                                      ? '#FF6B35'
                                      : '#666',
                                  color: 'white',
                                  fontSize: '0.6rem',
                                  height: 20,
                                }}
                              />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar src={post.authorAvatar} sx={{ width: 24, height: 24 }} />
                            <Typography variant="caption" sx={{ color: '#8B4513', fontWeight: 600 }}>
                              {post.author}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" sx={{ color: '#666' }}>
                            {formatDate(post.publishDate)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" sx={{ color: '#666' }}>
                            {post.readTime}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <IconButton size="small" sx={{ color: '#8B4513' }}>
                              <Comment fontSize="small" />
                            </IconButton>
                            <IconButton size="small" sx={{ color: '#8B4513' }}>
                              <Share fontSize="small" />
                            </IconButton>
                            <IconButton size="small" sx={{ color: '#8B4513' }}>
                              <Bookmark fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* All Posts */}
            <Box>
              <Typography
                variant="h4"
                sx={{ mb: 3, color: '#8B4513', fontWeight: 700, fontFamily: 'serif' }}
              >
                All Posts
              </Typography>
              <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#8B4513' }}>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Image</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Title</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Author</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Date</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Read Time</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredPosts.map((post) => (
                      <TableRow
                        key={post.id}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': { backgroundColor: '#f5f5f5' },
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                        onClick={() => navigate(`/digitalcafe/blog/${post.id}`)}
                      >
                        <TableCell>
                          <Box sx={{ position: 'relative', width: 80, height: 60 }}>
                            <CardMedia
                              component="img"
                              height="60"
                              image={post.image}
                              alt={post.title}
                              sx={{ objectFit: 'cover', borderRadius: 1 }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 600, color: '#2d333a', lineHeight: 1.3, mb: 0.5 }}
                            >
                              {post.title}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#666', lineHeight: 1.4 }}>
                              {post.excerpt.substring(0, 100)}...
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 0.5, mt: 1 }}>
                              <Chip
                                label={
                                  post.generatedBy === 'digitalcafe-agent'
                                    ? 'DigitalCafe'
                                    : post.generatedBy === 'marketing-agent'
                                    ? 'Marketing'
                                    : 'Manual'
                                }
                                size="small"
                                sx={{
                                  backgroundColor:
                                    post.generatedBy === 'bizkeeper-agent'
                                      ? '#7443C0'
                                      : post.generatedBy === 'marketing-agent'
                                      ? '#FF6B35'
                                      : '#666',
                                  color: 'white',
                                  fontSize: '0.6rem',
                                  height: 20,
                                }}
                              />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar src={post.authorAvatar} sx={{ width: 24, height: 24 }} />
                            <Typography variant="caption" sx={{ color: '#8B4513', fontWeight: 600 }}>
                              {post.author}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" sx={{ color: '#666' }}>
                            {formatDate(post.publishDate)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" sx={{ color: '#666' }}>
                            {post.readTime}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <IconButton size="small" sx={{ color: '#8B4513' }}>
                              <Comment fontSize="small" />
                            </IconButton>
                            <IconButton size="small" sx={{ color: '#8B4513' }}>
                              <Share fontSize="small" />
                            </IconButton>
                            <IconButton size="small" sx={{ color: '#8B4513' }}>
                              <Bookmark fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              {/* Search */}
              <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#8B4513', fontWeight: 700 }}>
                  Search Posts
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      border: '2px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#8B4513')}
                    onBlur={(e) => (e.target.style.borderColor = '#e5e5e5')}
                  />
                  <IconButton
                    sx={{
                      backgroundColor: '#8B4513',
                      color: 'white',
                      '&:hover': { backgroundColor: '#A0522D' },
                    }}
                  >
                    <Search />
                  </IconButton>
                </Box>
              </Paper>

              {/* Recent Posts */}
              <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 3, color: '#8B4513', fontWeight: 700 }}>
                  Recent Posts
                </Typography>
                {recentPosts.map((post, index) => (
                  <Box key={post.id}>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                        mb: 2,
                        cursor: 'pointer',
                        padding: 1,
                        borderRadius: 1,
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                        },
                      }}
                      onClick={() => navigate(`/digitalcafe/blog/${post.id}`)}
                    >
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 1,
                          overflow: 'hidden',
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, color: '#2d333a', lineHeight: 1.3, mb: 0.5 }}
                        >
                          {post.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#999' }}>
                          {formatDate(post.publishDate)}
                        </Typography>
                      </Box>
                    </Box>
                    {index < recentPosts.length - 1 && <Divider sx={{ my: 2 }} />}
                  </Box>
                ))}
              </Paper>

              {/* Newsletter */}
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                  color: 'white',
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  Stay Updated
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                  Subscribe to our blog for the latest recipes, stories, and restaurant updates.
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <input
                    type="email"
                    placeholder="Your email"
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: 'white',
                      color: '#8B4513',
                      fontWeight: 600,
                      '&:hover': { backgroundColor: '#f5f5f5' },
                    }}
                  >
                    Subscribe
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Blog;

