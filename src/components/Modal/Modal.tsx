import React from 'react';
import './Modal.css';

interface ModalProps {
  movie: any;
  isOpen: boolean;
  onClose: () => void;
  videoKey: string | null;
  isDarkMode: boolean;
}

const Modal: React.FC<ModalProps> = ({ movie, isOpen, onClose, videoKey, isDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${isDarkMode ? 'dark' : 'light'}`}>
        <button
          className="modal-close"
          onClick={onClose}
        >×</button>
        {videoKey && (
          <div className="video-container">
            <iframe
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&fs=0`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Movie Trailer"
            ></iframe>
          </div>
        )}
        <h2>{movie.title}</h2>
        <p className='overview'>{movie.overview}</p>
        <p className='release-date'>Release Date: {movie.release_date}</p>
        <p className='rating'>Rating: <span>{movie.vote_average}</span></p>
      </div>
    </div>
  );
};

export default Modal