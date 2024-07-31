import React from 'react';
import './Container.css'; // Eğer stil dosyası ayrı ise

const Container = ({ photo, onDelete }) => {
  return (
    <div className="container">
      {photo ? (
        <div>
          <img src={photo} alt="Container" />
          <button onClick={() => onDelete(photo)}>Sil</button>
        </div>
      ) : (
        <img src='/assets/emptyplaceholder.jpg' alt="Placeholder" />
      )}
    </div>
  );
};

export default Container;
