// Blog service - data access layer for blog posts
// Pages should use this service instead of importing data directly

import blogData from '../data/blogs/blogPosts.json';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  callToAction: string;
  author: string;
  authorAvatar?: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
  views: number;
  comments: number;
  generatedBy: 'bizkeeper-agent' | 'marketing-agent' | 'manual' | 'digitalcafe-agent';
  agentPrompt?: string;
  lastUpdated: string;
  status: 'published' | 'draft' | 'scheduled' | 'archived';
}

// Load blog posts from JSON
export const blogPosts: BlogPost[] = (blogData as any).blogPosts as BlogPost[];

// Query functions
export const getPostsByAgent = (agent: 'bizkeeper-agent' | 'marketing-agent' | 'digitalcafe-agent') => {
  return blogPosts.filter((post) => post.generatedBy === agent);
};

export const getPostsByCategory = (category: string) => {
  return blogPosts.filter((post) => post.category === category);
};

export const getFeaturedPosts = () => {
  return blogPosts.filter((post) => post.featured);
};

export const getPublishedPosts = () => {
  return blogPosts.filter((post) => post.status === 'published');
};

export const getPostById = (id: string) => {
  return blogPosts.find((post) => post.id === id);
};

// Note: In a demo/MVP, these mutation functions just log.
// In production, they would call a backend API.
export const addNewPost = (post: Omit<BlogPost, 'id' | 'publishDate' | 'lastUpdated'>) => {
  const newPost: BlogPost = {
    ...post,
    id: `post-${Date.now()}`,
    publishDate: new Date().toISOString().split('T')[0],
    lastUpdated: new Date().toISOString(),
  };
  blogPosts.push(newPost);
  console.log('Blog post added. In production, this would be saved to a database.');
  return newPost;
};

export const updatePost = (id: string, updates: Partial<BlogPost>) => {
  const index = blogPosts.findIndex((post) => post.id === id);
  if (index !== -1) {
    blogPosts[index] = {
      ...blogPosts[index],
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    console.log('Blog post updated. In production, this would be saved to a database.');
    return blogPosts[index];
  }
  return null;
};

export const deletePost = (id: string) => {
  const index = blogPosts.findIndex((post) => post.id === id);
  if (index !== -1) {
    const deletedPost = blogPosts.splice(index, 1)[0];
    console.log('Blog post deleted. In production, this would be saved to a database.');
    return deletedPost;
  }
  return null;
};

