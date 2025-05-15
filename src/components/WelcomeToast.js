// components/WelcomeToast.js
import React, { useEffect, useState } from 'react';

const WelcomeToast = () => {
  const [show, setShow] = useState(false);

useEffect(() => {
  const isNewUser = localStorage.getItem('snapsearch-welcome-shown');
  if (!isNewUser) {
    console.log("Showing welcome toast");
    setShow(true);
    localStorage.setItem('snapsearch-welcome-shown', 'true');
  } else {
    console.log("Welcome toast already shown before");
  }
}, []);

console.log("WelcomeToast rendered, show:", show);


  if (!show) return null;

  return (
    <div style={styles.toast}>
      <strong>👋 Welcome to SnapSearch!</strong>
      <p style={{ margin: '6px 0' }}>
        🔍 Search images with text or voice.<br />
        💡 Use smart suggestions.<br />
        ❤️ Save favorites (must be logged in).<br />
        🖼️ Click images to preview.<br />
        👤 Manage your account from the top right.
      </p>
      <button onClick={() => setShow(false)} style={styles.button}>Got it</button>
    </div>
  );
};

const styles = {
  toast: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    background: '#333',
    color: '#fff',
    padding: '16px',
    borderRadius: '8px',
    zIndex: 9999,
    maxWidth: '300px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  },
  button: {
    marginTop: '10px',
    background: '#555',
    border: 'none',
    color: '#fff',
    padding: '6px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default WelcomeToast;
