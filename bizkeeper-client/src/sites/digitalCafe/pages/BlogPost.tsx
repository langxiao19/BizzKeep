import React from 'react';
import {
  Box,
  Typography,
  Container,
  CardMedia,
  Chip,
  Avatar,
  IconButton,
  Button,
  Breadcrumbs,
  Link,
  Divider,
  Paper,
  Grid,
} from '@mui/material';
import { CalendarToday, Comment, Share, Bookmark, ArrowBack, Home, Star } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import { blogPosts, getPostById } from '../services/blogService';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const post = id ? getPostById(id) : undefined;

  if (!post) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f6f0' }}>
        <Navbar currentPage="blog" />
        <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 2, color: '#8B4513' }}>
            Blog Post Not Found
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
            The blog post you're looking for doesn't exist or may have been removed.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/digitalcafe/blog')}
            sx={{
              backgroundColor: '#8B4513',
              '&:hover': { backgroundColor: '#A0522D' },
            }}
          >
            Back to Blog
          </Button>
        </Container>
      </Box>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f6f0' }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600;700&family=Roboto:wght@300;400;500;700&display=swap');
          
          .blog-detail-hero {
            background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%);
            color: white;
            padding: 60px 0 40px;
            position: relative;
            overflow: hidden;
          }
          
          .blog-detail-hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            animation: float 20s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .blog-content {
            line-height: 1.8;
            font-size: 1.1rem;
            color: #333;
          }
          
          .blog-content p {
            margin-bottom: 1.5rem;
          }
          
          .call-to-action-box {
            background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
            color: white;
            padding: 2rem;
            border-radius: 16px;
            margin: 2rem 0;
            text-align: center;
            box-shadow: 0 8px 32px rgba(255, 107, 53, 0.3);
          }
          
          .blog-sidebar-card {
            background: white;
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            margin-bottom: 1.5rem;
          }
        `}
      </style>

      <Navbar currentPage="blog" />

      {/* Hero Section */}
      <Box className="blog-detail-hero">
        <Container maxWidth="lg">
          {/* Breadcrumbs */}
          <Breadcrumbs sx={{ mb: 3, color: 'rgba(255,255,255,0.8)' }}>
            <Link
              color="inherit"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('/digitalcafe');
              }}
              sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              <Home sx={{ mr: 0.5, verticalAlign: 'middle' }} fontSize="small" />
              Home
            </Link>
            <Link
              color="inherit"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('/digitalcafe/blog');
              }}
              sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              Blog
            </Link>
            <Typography color="inherit">{post.title}</Typography>
          </Breadcrumbs>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              mb: 3,
              fontFamily: 'serif',
              textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
              position: 'relative',
              zIndex: 2,
              lineHeight: 1.2,
            }}
          >
            {post.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2, position: 'relative', zIndex: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar src={post.authorAvatar} sx={{ width: 32, height: 32 }} />
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {post.author}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarToday sx={{ fontSize: 16, opacity: 0.8 }} />
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {formatDate(post.publishDate)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Star sx={{ fontSize: 16, opacity: 0.8 }} />
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {post.readTime}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
            <Chip
              label={post.category}
              sx={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
              size="small"
            />
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
                    ? 'rgba(116, 67, 192, 0.8)'
                    : post.generatedBy === 'marketing-agent'
                    ? 'rgba(255, 107, 53, 0.8)'
                    : 'rgba(102, 102, 102, 0.8)',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
              {/* Featured Image */}
              <CardMedia
                component="img"
                height="400"
                image={post.image}
                alt={post.title}
                sx={{
                  borderRadius: 2,
                  mb: 4,
                  objectFit: 'cover',
                }}
              />

              {/* Blog Content */}
              <Box
                className="blog-content"
                sx={{ mb: 4 }}
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/^/, '<p>')
                    .replace(/$/, '</p>'),
                }}
              />

              {/* Call to Action */}
              {post.callToAction && (
                <Box className="call-to-action-box">
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '1.3rem' }}>
                    Ready to Experience This Story?
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                    {post.callToAction}
                  </Typography>
                </Box>
              )}

              <Divider sx={{ my: 4 }} />

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  startIcon={<ArrowBack />}
                  onClick={() => navigate('/digitalcafe/blog')}
                  sx={{
                    backgroundColor: '#8B4513',
                    '&:hover': { backgroundColor: '#A0522D' },
                  }}
                >
                  Back to Blog
                </Button>
                <IconButton sx={{ color: '#8B4513' }}>
                  <Share />
                </IconButton>
                <IconButton sx={{ color: '#8B4513' }}>
                  <Bookmark />
                </IconButton>
                <IconButton sx={{ color: '#8B4513' }}>
                  <Comment />
                </IconButton>
              </Box>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              {/* Author Info */}
              <Paper className="blog-sidebar-card">
                <Typography variant="h6" sx={{ mb: 2, color: '#8B4513', fontWeight: 700 }}>
                  About the Author
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar src={post.authorAvatar} sx={{ width: 48, height: 48 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2d333a' }}>
                      {post.author}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {post.generatedBy === 'bizkeeper-agent'
                        ? 'AI Assistant'
                        : post.generatedBy === 'marketing-agent'
                        ? 'Marketing Specialist'
                        : 'Restaurant Staff'}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                  {post.generatedBy === 'digitalcafe-agent'
                    ? 'Our DigitalCafe AI assistant helps create engaging content about our restaurant experience.'
                    : post.generatedBy === 'marketing-agent'
                    ? "Our Marketing team crafts compelling stories to share our restaurant's journey."
                    : 'Our restaurant team shares authentic stories from our kitchen and dining room.'}
                </Typography>
              </Paper>

              {/* Post Stats */}
              <Paper className="blog-sidebar-card">
                <Typography variant="h6" sx={{ mb: 2, color: '#8B4513', fontWeight: 700 }}>
                  Post Details
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Published:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {formatDate(post.publishDate)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Read Time:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {post.readTime}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Views:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {post.views}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Category:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {post.category}
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              {/* Tags */}
              <Paper className="blog-sidebar-card">
                <Typography variant="h6" sx={{ mb: 2, color: '#8B4513', fontWeight: 700 }}>
                  Tags
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {post.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        backgroundColor: '#f5f5f5',
                        color: '#666',
                        '&:hover': {
                          backgroundColor: '#e0e0e0',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Paper>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <Paper className="blog-sidebar-card">
                  <Typography variant="h6" sx={{ mb: 2, color: '#8B4513', fontWeight: 700 }}>
                    Related Posts
                  </Typography>
                  {relatedPosts.map((relatedPost, index) => (
                    <Box key={relatedPost.id} sx={{ mb: 2 }}>
                      <Button
                        fullWidth
                        variant="text"
                        sx={{
                          textAlign: 'left',
                          justifyContent: 'flex-start',
                          textTransform: 'none',
                          color: '#2d333a',
                          '&:hover': { backgroundColor: '#f5f5f5' },
                        }}
                        onClick={() => navigate(`/digitalcafe/blog/${relatedPost.id}`)}
                      >
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                            {relatedPost.title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#999' }}>
                            {formatDate(relatedPost.publishDate)}
                          </Typography>
                        </Box>
                      </Button>
                      {index < relatedPosts.length - 1 && <Divider sx={{ mt: 2 }} />}
                    </Box>
                  ))}
                </Paper>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BlogPost;

