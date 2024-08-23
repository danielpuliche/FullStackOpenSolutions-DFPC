import { useState } from "react";

const WeatherIcon = ({ icon }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => setLoading(false);
  const handleImageError = () => setLoading(false);

  return (
    <>
      {loading && <p>Loading image...</p>}
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="Weather icon"
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{
          display: loading ? "none" : "block",
          width: "auto",
          height: 150,
        }}
      />
    </>
  );
};

export default WeatherIcon;
