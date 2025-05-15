import React from 'react';
import ImageCard from './ImageCard';

const Favorites = ({ favorites }) => {
  return (
    <div style={{ marginTop: '40px' }}>
      <h2>Your Favorites</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
        }}
      >
        {favorites.map((img) => (
          <ImageCard key={img.id} image={img} onFavorite={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
