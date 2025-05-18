import axios from 'axios';

const API_URL = 'https://final-api-g7mq.onrender.com/bondoc/posts';

// Fetch all posts
export const fetchPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch a single post by ID
export const fetchPostById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new post
export const createPost = async (post: { caption: string; imageUrl: string }) => {
  const response = await axios.post(API_URL, post);
  return response.data;
};

// Update a post
export const updatePost = async (id: number, post: { caption: string; imageUrl: string }) => {
  const response = await axios.put(`${API_URL}/${id}`, post);
  return response.data;
};

// Delete a post
export const deletePost = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};