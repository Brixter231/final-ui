import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/post';

const CreatePost: React.FC = () => {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost({ caption, imageUrl });
      alert('Post created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    }
  };

  return (
    <>
      <style>{`
        .create-post-wrapper {
          display: flex;
          justify-content: center;
          padding: 40px 20px;
        }

        .create-post-card {
          background-color: #fff;
          padding: 20px 25px;
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          width: 100%;
          max-width: 600px;
        }

        .create-post-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.2rem;
          color: #333;
        }

        .input-area {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .textarea,
        .input {
          width: 100%;
          padding: 12px 14px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 10px;
          resize: none;
        }

        .textarea:focus,
        .input:focus {
          border-color: #007bff;
          outline: none;
          box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
        }

        .submit-button {
          margin-top: 1rem;
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

        .submit-button:hover {
          background-color: #0056b3;
        }
      `}</style>

      <div className="create-post-wrapper">
        <div className="create-post-card">
          <h2 className="create-post-title">Share a Post</h2>
          <form onSubmit={handleSubmit} className="input-area">
            <textarea
              placeholder="What's on your mind?"
              className="textarea"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={4}
              required
            />
            <input
              type="url"
              placeholder="Image URL (optional)"
              className="input"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <button type="submit" className="submit-button">Post</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
