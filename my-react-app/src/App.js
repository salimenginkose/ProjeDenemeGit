import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Container bileşeni
const Container = ({ photo }) => {
  return (
    <div className="container">
      {photo ? (
        <img src={photo} alt="Container" />
      ) : (
        <img src='/assets/emptyplaceholder.jpg' alt="Placeholder" />
      )}
    </div>
  );
};

// Yükleme çubuğu bileşeni
const LoadingBar = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(interval);
            return 100;
          }
          return oldProgress + 1;
        });
      }, 30); // 30ms x 100 = 3000ms = 3 saniye
    } else {
      setProgress(0); // Yükleme tamamlandıysa çubuğu sıfırla
    }

    return () => clearInterval(interval); // Temizlik işlevi
  }, [isLoading]);

  return (
    <div className="loading-bar">
      <div className="loading-bar-fill" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

// Page1 bileşeni
const Page1 = ({ photos, handleFileChange }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChangeWithDelay = async (event) => {
    setIsLoading(true);
    await handleFileChange(event, 'page1');
    setIsLoading(false);
  };

  const containers = Array.from({ length: 5 }, (_, index) => (
    <Container key={index} photo={photos[index]} />
  ));

  return (
    <div className="page-container">
      {containers}
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

// Page2 bileşeni
const Page2 = ({ photos, handleFileChange }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChangeWithDelay = async (event) => {
    setIsLoading(true);
    await handleFileChange(event, 'page2');
    setIsLoading(false);
  };

  const containers = Array.from({ length: 5 }, (_, index) => (
    <Container key={index + 5} photo={photos[index]} />
  ));

  return (
    <div className="page-container">
      {containers}
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

// Ana bileşen
function App() {
  const [page1Photos, setPage1Photos] = useState([]);
  const [page2Photos, setPage2Photos] = useState([]);

  // Fotoğraf yükleme işlevi
  const handleFileChange = async (event, page) => {
    const files = Array.from(event.target.files);
    const formData = new FormData();

    files.forEach(file => {
      formData.append('photos', file);
    });

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const newPhotos = response.data.files.map(file => `/uploads/${file.filename}`);

      if (page === 'page1') {
        setPage1Photos(prevPhotos => {
          const updatedPhotos = [...prevPhotos];
          for (let i = 0; i < newPhotos.length; i++) {
            updatedPhotos[i] = newPhotos[i];
          }
          return updatedPhotos;
        });
      } else if (page === 'page2') {
        setPage2Photos(prevPhotos => {
          const updatedPhotos = [...prevPhotos];
          for (let i = 0; i < newPhotos.length; i++) {
            updatedPhotos[i] = newPhotos[i];
          }
          return updatedPhotos;
        });
      }
    } catch (error) {
      console.error('Error uploading photos:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/page1">Page 1</Link></li>
            <li><Link to="/page2">Page 2</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page1" element={<Page1 photos={page1Photos} handleFileChange={handleFileChange} />} />
          <Route path="/page2" element={<Page2 photos={page2Photos} handleFileChange={handleFileChange} />} />
        </Routes>
      </div>
    </Router>
  );
}

// Home bileşeni
const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page. Go to Page 1 or Page 2 to upload photos.</p>
    </div>
  );
}

export default App;
