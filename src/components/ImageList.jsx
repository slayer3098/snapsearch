import React from 'react';
import { ClipLoader } from "react-spinners";

const ImageList = ({ images, isLoading }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
      {isLoading ? (
        <ClipLoader size={50} color={"#000"} />
      ) : (
        images.map((image) => (
          <div key={image.id} style={{ overflow: 'hidden', borderRadius: '8px' }}>
            <img 
              src={image.src.medium} 
              alt="image" 
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '100%',   // Ensures images are responsive
                borderRadius: '8px',
                objectFit: 'cover'   // Ensures images maintain aspect ratio while filling space
              }} 
            />
          </div>
        ))
      )}
    </div>
  );
};

export default ImageList;
