import React, { useState, useEffect } from 'react';
import './LoadingBar.css'; // Eğer stil dosyası ayrı ise

const LoadingBar = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress(oldProgress => {
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

export default LoadingBar;
