import React, { useState } from 'react';
import Modal from 'react-modal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ClipLoader } from 'react-spinners';
import { useAuth } from '../context/AuthContext'; // 🔒 Import auth context
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const ImageCard = ({ image, onFavorite, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth(); // 🔒 Get user from context
  const navigate = useNavigate();

  if (!image || !image.src) return null;

  const resolutions = [
    { label: 'Original', src: image.src.original },
    { label: 'Large 2X', src: image.src.large2x },
    { label: 'Large', src: image.src.large },
    { label: 'Medium', src: image.src.medium },
    { label: 'Small', src: image.src.small },
    { label: 'Tiny', src: image.src.tiny },
  ];

  const modalImages = resolutions.filter(
    (res, index, self) =>
      res.src &&
      self.findIndex((r) => r.src === res.src) === index
  );

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleFavorite = () => {
    if (!currentUser) {
      navigate('/login'); // 🔒 Redirect if not logged in
    } else {
      onFavorite(image); // Proceed to favorite if logged in
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
  };

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      {isLoading ? (
        <div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ClipLoader size={50} color="#000" />
        </div>
      ) : (
        <img
          src={image.src.medium}
          alt={image.alt}
          style={{ width: '100%', display: 'block', cursor: 'pointer' }}
          onClick={openModal}
        />
      )}
      <div style={{ padding: '10px', textAlign: 'center' }}>
        <p>{image.photographer}</p>
        <button
          onClick={handleFavorite}
          style={{
            backgroundColor: '#10b981',
            border: 'none',
            padding: '5px 10px',
            color: '#fff',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add to Favorites
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Image Viewer"
        style={{
          content: {
            inset: '10%',
            backgroundColor: '#111',
            padding: '0',
            border: 'none',
            borderRadius: '8px',
            overflow: 'hidden',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 9999,
          },
        }}
      >
        <button
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: '10px',
            right: '20px',
            backgroundColor: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            cursor: 'pointer',
            zIndex: 10000,
          }}
        >
          Close
        </button>

        <Slider {...settings}>
          {modalImages.map((res, idx) => (
            <div key={idx} style={{ textAlign: 'center', color: '#fff' }}>
              <h3 style={{ margin: '10px 0' }}>{res.label}</h3>
              <img
                src={res.src}
                alt={res.label}
                style={{
                  maxHeight: '75vh',
                  width: 'auto',
                  margin: '0 auto',
                  objectFit: 'contain',
                }}
              />
            </div>
          ))}
        </Slider>
      </Modal>
    </div>
  );
};

export default ImageCard;
