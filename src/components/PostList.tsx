import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPosts, deletePost } from '../api/post';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    loadPosts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  return (
    <>
      <style>{`
        .post-list-container {
          max-width: 1000px;
          margin: 40px auto;
          padding: 0 20px;
        }

        .post-list-title {
          font-size: 2.2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 30px;
        }

        .create-post-link {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }

        .button {
          background: linear-gradient(45deg, #007bff, #00bfff);
          color: white;
          padding: 10px 20px;
          font-size: 1rem;
          font-weight: bold;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .button:hover {
          transform: scale(1.05);
          background: linear-gradient(45deg, #0056b3, #0096c7);
        }

        .button.delete {
          background: linear-gradient(45deg, #e74c3c, #c0392b);
        }

        .button.delete:hover {
          background: linear-gradient(45deg, #b82e24, #96291f);
        }

        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .post-card {
          background: white;
          border-radius: 18px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease;
        }

        .post-card:hover {
          transform: translateY(-6px);
        }

        .post-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display: block;
        }

        .post-content {
          padding: 15px 20px;
          text-align: center;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .post-caption {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 10px;
          color: #333;
        }

        .post-timestamp {
          font-size: 0.85rem;
          color: #888;
          margin-bottom: 15px;
        }

        .post-actions {
          display: flex;
          justify-content: center;
          gap: 10px;
        }
      `}</style>

      <main>
        <div className="post-list-container">
          <h1 className="post-list-title">WELCOME TO SOCIAL MEDIA!</h1>

          <div className="create-post-link">
            <Link to="/create">
              <button className="button">+ Create New Post</button>
            </Link>
          </div>

          {posts.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666' }}>No posts available.</p>
          ) : (
            <div className="posts-grid">
              {posts.map((post) => (
                <div key={post.id} className="post-card">
                  <a
                    href={post.imageUrl || 'https://via.placeholder.com/300x180?text=No+Image'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={post.imageUrl || 'https://via.placeholder.com/300x180?text=No+Image'}
                      alt={post.caption || 'Image'}
                      className="post-image"
                    />
                  </a>
                  <div className="post-content">
                    <div>
                      <h2 className="post-caption">{post.caption || 'No Caption'}</h2>
                      <p className="post-timestamp">
                        {new Date(post.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="post-actions">
                      <button className="button" onClick={() => navigate(`/edit/${post.id}`)}>
                        Edit
                      </button>
                      <button className="button delete" onClick={() => handleDelete(post.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default PostList;
