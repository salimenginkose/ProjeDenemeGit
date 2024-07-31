import React, { useState } from 'react';
import Container from './Container';
import LoadingBar from './LoadingBar';

const Page2 = ({ photos, handleFileChange, handleDelete }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChangeWithDelay = async (event) => {
    setIsLoading(true);
    await handleFileChange(event, 'page2');
    setIsLoading(false);
  };

  // 5-10 arasındaki konteynerlere fotoğrafları yerleştirin
  const containers = Array.from({ length: 5 }, (_, index) => (
    <Container key={index + 5} photo={photos[index]} onDelete={handleDelete} />
  ));

  return (
    <div className="page-container">
      <div className="container-grid">
        {containers}
      </div>
      <div className="upload-container">
        <input
          type="file"
          multiple
          onChange={handleFileChangeWithDelay}
        />
        {isLoading && <LoadingBar isLoading={isLoading} />}
      </div>
    </div>
  );
};

export default Page2;
