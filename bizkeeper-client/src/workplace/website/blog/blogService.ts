/**
 * Blog Service
 * 
 * The only data access layer for the blog module.
 * Handles loading, saving, and deleting blog posts.
 * UI files must NOT import demo data directly.
 */

import {
  BlogPost,
  blogPosts,
  getPostById,
  addNewPost as addNewPostToStore,
  updatePost as updatePostInStore,
  deletePost as deletePostFromStore,
} from '../../../sites/digitalCafe/services/blogService';

export interface BlogStats {
  total: number;
  published: number;
  drafts: number;
  archived: number;
}

// ============ Data Loading ============

/**
 * Fetch all blog posts
 */
export const fetchPosts = (): BlogPost[] => {
  return [...blogPosts];
};

/**
 * Get a single post by ID
 */
export const getPost = (id: string): BlogPost | undefined => {
  return getPostById(id);
};

/**
 * Calculate blog statistics
 */
export const getStats = (posts: BlogPost[]): BlogStats => {
  return {
    total: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    drafts: posts.filter(p => p.status === 'draft').length,
    archived: posts.filter(p => p.status === 'archived').length,
  };
};

// ============ Data Mutations ============

/**
 * Create a new blog post
 */
export const createPost = (
  post: Omit<BlogPost, 'id' | 'publishDate' | 'lastUpdated'>
): BlogPost => {
  return addNewPostToStore(post);
};

/**
 * Update an existing blog post
 */
export const editPost = (
  id: string,
  updates: Partial<BlogPost>
): BlogPost | null => {
  return updatePostInStore(id, updates);
};

/**
 * Delete a blog post
 */
export const removePost = (id: string): BlogPost | null => {
  return deletePostFromStore(id);
};

// ============ Frontend-only Editor Helpers (Markdown) ============

/**
 * Convert an uploaded file to a data URL for local persistence.
 */
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
};

/**
 * Very lightweight markdown-to-text stripper for excerpt/read-time estimation.
 * (Not a full markdown parser; good enough for MVP.)
 */
export const stripMarkdown = (md: string): string => {
  return (md || '')
    // code blocks
    .replace(/```[\s\S]*?```/g, ' ')
    // inline code
    .replace(/`[^`]*`/g, ' ')
    // images ![alt](url)
    .replace(/!\[[^\]]*?\]\([^\)]*?\)/g, ' ')
    // links [text](url) -> text
    .replace(/\[([^\]]+?)\]\([^\)]*?\)/g, '$1')
    // headings/bold/italic/blockquote
    .replace(/(^|\n)\s{0,3}#{1,6}\s+/g, '$1')
    .replace(/(^|\n)\s{0,3}>\s+/g, '$1')
    .replace(/[*_~]+/g, '')
    // list markers
    .replace(/(^|\n)\s{0,3}[-*+]\s+/g, '$1')
    .replace(/(^|\n)\s{0,3}\d+\.\s+/g, '$1')
    // collapse whitespace
    .replace(/\s+/g, ' ')
    .trim();
};

export const deriveExcerptFromMarkdown = (md: string, maxChars = 150): string => {
  const text = stripMarkdown(md);
  if (!text) return '';
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars).trim()}...`;
};

export const deriveReadTimeFromMarkdown = (md: string): string => {
  const text = stripMarkdown(md);
  const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

export const inferCategoryFromText = (mdOrText: string): string => {
  const lower = stripMarkdown(mdOrText).toLowerCase();
  if (!lower) return 'Story';
  if (lower.includes('menu') || lower.includes('dish') || lower.includes('food')) return 'Menu';
  if (lower.includes('chef') || lower.includes('cooking') || lower.includes('recipe')) return 'Cooking';
  if (lower.includes('event') || lower.includes('party') || lower.includes('celebration')) return 'Events';
  return 'Story';
};

// ============ AI Generation ============

interface GenerateBlogResponse {
  success: boolean;
  title?: string;
  content?: string;
  call_to_action?: string;
  blog_post?: string;
  message?: string;
}

/**
 * Generate a blog post from a story text using AI
 */
export const generateBlogFromStory = async (
  storyText: string
): Promise<{ title: string; content: string; callToAction: string }> => {
  const response = await fetch('http://localhost:3001/api/ai/generate-blog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ story: storyText }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: GenerateBlogResponse = await response.json();

  if (!data.success) {
    throw new Error(data.message || 'Failed to generate blog post');
  }

  // Handle both new structured format and old format
  if (data.title && data.content && data.call_to_action) {
    return {
      title: data.title,
      content: data.content,
      callToAction: data.call_to_action,
    };
  } else if (data.blog_post) {
    // Parse old format
    const parsed = parseBlogPostContent(data.blog_post);
    return parsed;
  }

  throw new Error('Invalid blog post format received');
};

/**
 * Save a blog post to the backend (Python service)
 */
export const saveBlogToBackend = async (params: {
  title: string;
  content: string;
  callToAction: string;
  originalStory?: string;
}): Promise<{ success: boolean; blogData: Partial<BlogPost> }> => {
  const response = await fetch('http://localhost:3001/api/ai/save-blog-post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: params.title,
      content: params.content,
      call_to_action: params.callToAction,
      agent_type: 'bizkeeper-agent',
      original_story: params.originalStory,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || 'Failed to save blog post');
  }

  return {
    success: true,
    blogData: data.blog_data,
  };
};

// ============ Utilities ============

/**
 * Parse structured blog post content from raw text
 */
export const parseBlogPostContent = (
  content: string
): { title: string; content: string; callToAction: string } => {
  if (!content) {
    return { title: 'Untitled Story', content: '', callToAction: '' };
  }

  const titleMatch = content.match(/TITLE:\s*(.+?)(?:\n|$)/i);
  const callToActionMatch = content.match(/CALL_TO_ACTION:\s*(.+?)(?:\n|$)/i);

  const title = titleMatch ? titleMatch[1].trim() : 'Untitled Story';
  const callToAction = callToActionMatch ? callToActionMatch[1].trim() : '';

  // Remove title and call to action from content
  const cleanContent = content
    .replace(/TITLE:\s*.+?(?:\n|$)/i, '')
    .replace(/CALL_TO_ACTION:\s*.+?(?:\n|$)/i, '')
    .replace(/CONTENT:\s*/i, '')
    .trim();

  return { title, content: cleanContent, callToAction };
};

/**
 * Format structured blog content for storage
 */
export const formatBlogContent = (params: {
  title: string;
  content: string;
  callToAction: string;
}): string => {
  return `TITLE: ${params.title}\n\nCONTENT:\n${params.content}\n\nCALL_TO_ACTION:\n${params.callToAction}`;
};

/**
 * Create a blog post locally (when backend is unavailable)
 */
export const createPostLocally = (params: {
  title: string;
  content: string;
  callToAction: string;
  transcription?: string;
}): BlogPost => {
  const { title, content, callToAction, transcription } = params;

  // Extract excerpt (first 150 characters)
  const excerptMatch =
    content.match(/\n\n(.+?)(?:\n\n|$)/s) || content.match(/^(.+?)(?:\n|$)/s);
  const excerpt = excerptMatch
    ? excerptMatch[1].substring(0, 150).trim() + '...'
    : content.substring(0, 150) + '...';

  // Determine category based on content
  let category = 'Story';
  const lowerContent = content.toLowerCase();
  if (
    lowerContent.includes('menu') ||
    lowerContent.includes('dish') ||
    lowerContent.includes('food')
  ) {
    category = 'Menu';
  } else if (
    lowerContent.includes('chef') ||
    lowerContent.includes('cooking') ||
    lowerContent.includes('recipe')
  ) {
    category = 'Cooking';
  } else if (
    lowerContent.includes('event') ||
    lowerContent.includes('party') ||
    lowerContent.includes('celebration')
  ) {
    category = 'Events';
  }

  return createPost({
    title,
    excerpt,
    content,
    callToAction,
    author: 'DigitalCafe Agent',
    category,
    tags: ['story', 'restaurant', 'digitalcafe'],
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    featured: false,
    views: 0,
    comments: 0,
    generatedBy: 'digitalcafe-agent',
    agentPrompt: transcription || 'Voice story transcription',
    status: 'published',
    readTime: `${Math.max(1, Math.ceil(content.split(' ').length / 200))} min read`,
  });
};

// Re-export BlogPost type for convenience
export type { BlogPost };

