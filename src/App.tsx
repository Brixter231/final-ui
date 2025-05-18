import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import './index.css';

const App: React.FC = () => {
  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background-color: #f7f9fc;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(to right, #007bff, #00bfff);
          padding: 15px 30px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .navbar a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          margin: 0 15px;
          transition: opacity 0.3s ease;
        }

        .navbar a:hover {
          opacity: 0.85;
        }

        .main-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
      `}</style>

      <Router>
        <nav className="navbar">
          <div>
            <Link to="/">Home</Link>
            <Link to="/create">Create Post</Link>
          </div>
        </nav>

        <div className="main-wrapper">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
