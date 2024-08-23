import { useState } from "react";

const Flag = ({ flags, countrieName }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => setLoading(false);
  const handleImageError = () => setLoading(false);

  return (
    <div>
      <h2>Flag</h2>
      {loading && <p>Loading image...</p>}
      <img
        src={flags.png}
        alt={flags.alt === undefined ? `Flag of ${countrieName}` : flags.alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{
          display: loading ? "none" : "block",
          width: "auto",
          height: 150,
        }}
      />
    </div>
  );
};

export default Flag;
