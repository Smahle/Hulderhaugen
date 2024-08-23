// src/pages/HomePage.tsx

import React from 'react';
import PhotoGallery from '../components/PhotoGallery';

const HomePage: React.FC = () => {
  return (
    <div className='container'>
      <header className="hero bg-secondary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">Welcome to Hulderhaugen!</h1>
          <p className="lead">Ready to play the greatest game in the world?</p>
          <a href="game" className="btn btn-light btn-lg">Absolutely!</a>
        </div>
      </header>
      <PhotoGallery />
    </div>
  );
};

export default HomePage;