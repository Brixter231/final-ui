import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPostById, updatePost } from '../api/post';

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const loadPost = async () => {
      try {
        if (id) {
          const post = await fetchPostById(Number(id));
          setCaption(post.caption);
          setImageUrl(post.imageUrl);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    loadPost();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updatePost(Number(id), { caption, imageUrl });
        alert('Post updated successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again.');
    }
  };

  return (
    <>
      <style>{`
        .edit-post-wrapper {
          display: flex;
          justify-content: center;
          padding: 40px 20px;
        }

        .edit-post-card {
          background-color: #fff;
          padding: 24px 28px;
          border-radius: 14px;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
          width: 100%;
          max-width: 600px;
        }

        .edit-post-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: #333;
          text-align: center;
        }

        .edit-input-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .edit-textarea,
        .edit-input {
          width: 100%;
          padding: 12px 14px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 10px;
          resize: none;
        }

        .edit-textarea:focus,
        .edit-input:focus {
          border-color: #007bff;
          outline: none;
          box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
        }

        .edit-button {
          margin-top: 1.2rem;
          padding: 10px 18px;
          font-size: 1rem;
          font-weight: 500;
          color: #fff;
          background-color: #007bff;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .edit-button:hover {
          background-color: #0056b3;
        }
      `}</style>

      <div className="edit-post-wrapper">
        <div className="edit-post-card">
          <h2 className="edit-post-title">Edit Your Post</h2>
          <form onSubmit={handleUpdate} className="edit-input-group">
            <textarea
              placeholder="Update your caption..."
              className="edit-textarea"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={4}
              required
            />
            <input
              type="url"
              placeholder="Image URL"
              className="edit-input"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
            <button type="submit" className="edit-button">Update Post</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPost;
