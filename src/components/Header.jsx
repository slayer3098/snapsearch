import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#222',
      color: 'white',
      gap: '15px'
    }}>
      {currentUser ? (
        <>
          <span>Welcome, {currentUser.email}</span>
          <button
            onClick={handleLogout}
            style={{
              padding: '6px 12px',
              cursor: 'pointer',
              backgroundColor: '#ef4444',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              fontWeight: '600'
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ color: 'white', textDecoration: 'underline' }}>Login</Link>
          <Link to="/signup" style={{ color: 'white', textDecoration: 'underline' }}>Register</Link>
        </>
      )}
    </header>
  );
}
