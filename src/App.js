import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import ImageCard from './components/ImageCard';
import Favorites from './components/Favorites';
import Login from './components/Login';
import Signup from './components/Signup';
import { ClipLoader } from 'react-spinners';
import { useAuth } from './context/AuthContext';
import './App.css';
import Header from './components/Header';
import { db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import WelcomeToast from './components/WelcomeToast'; // ✅ Imported

const API_KEY = process.env.REACT_APP_PEXELS_KEY;
const BASE_URL = 'https://api.pexels.com/v1';

function MainPage() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useAuth();

  const suggestions = [
    "Nature", "Technology", "Space", "City", "Animals", "Cars", "Ocean", "Mountains",
    "Forest", "Beach", "Abstract", "Art", "Sunset", "Portrait", "Wildlife", "Adventure",
    "Food", "Travel", "Fashion", "Flowers", "Architecture", "Music", "Sports", "Night",
    "Sky", "Landscape", "Winter", "Summer"
  ];

  useEffect(() => {
    fetchCuratedImages();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!currentUser) return;
      try {
        const docRef = doc(db, 'favorites', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFavorites(docSnap.data().images || []);
        } else {
          setFavorites([]);
        }
      } catch (err) {
        console.error('Error loading favorites:', err);
      }
    };

    fetchFavorites();
  }, [currentUser]);

  const fetchCuratedImages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/curated?per_page=15`, {
        headers: { Authorization: API_KEY },
      });
      const data = await res.json();
      setImages(data.photos);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query || query.trim() === '') return;

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/search?query=${query}&per_page=15`, {
        headers: { Authorization: API_KEY },
      });
      const data = await res.json();
      setImages(data.photos);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const addToFavorites = async (image) => {
    if (!currentUser) {
      alert("Please login to add favorites.");
      return;
    }

    const isAlreadyFav = favorites.some((fav) => fav.id === image.id);
    if (isAlreadyFav) return;

    const updatedFavorites = [...favorites, image];
    setFavorites(updatedFavorites);

    try {
      await setDoc(doc(db, 'favorites', currentUser.uid), {
        images: updatedFavorites,
      });
    } catch (error) {
      console.error('Error saving favorite:', error);
    }
  };

  return (
    <div className="app-container">
      <WelcomeToast /> {/* ✅ Toast shown only on MainPage */}

      <h1 style={{
        textAlign: 'center',
        fontSize: '5rem',
        fontFamily: 'Poppins, sans-serif',
        background: 'linear-gradient(45deg,rgb(250, 221, 5),rgb(255, 251, 0),rgb(226, 251, 5))',
        color: 'transparent',
        backgroundClip: 'text',
        fontWeight: '700',
        letterSpacing: '3px',
        textTransform: 'none',
        padding: '20px',
        margin: 0,
        textShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
        animation: 'glow 1.5s ease-in-out infinite alternate',
      }}>
        SnapSearch
      </h1>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {showFavorites ? (
          <button
            onClick={() => setShowFavorites(false)}
            style={{ padding: '10px 20px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px' }}
          >
            ← Back to Search
          </button>
        ) : (
          <button
            onClick={() => setShowFavorites(true)}
            style={{ padding: '10px 20px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px' }}
          >
            ⭐ View Favorites
          </button>
        )}
      </div>

      {!showFavorites ? (
        <>
          <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <SearchBar
              query={query}
              onChange={(e) => setQuery(e.target.value)}
              onSubmit={handleSearch}
              suggestions={suggestions}
            />
            <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px' }}>
              Search
            </button>
          </form>

          {isLoading || loading ? (
            <div style={{ textAlign: 'center' }}>
              <ClipLoader size={50} color={"#000"} />
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px',
              }}
            >
              {images.map((img) => (
                <ImageCard key={img.id} image={img} onFavorite={addToFavorites} />
              ))}
            </div>
          )}
        </>
      ) : (
        <Favorites favorites={favorites} />
      )}
    </div>
  );
}

function App() {
  const { currentUser } = useAuth();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={currentUser ? <Navigate to="/" /> : <Signup />} />
      </Routes>
    </>
  );
}

export default App;
