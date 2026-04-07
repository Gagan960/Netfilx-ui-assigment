import React from "react";

const Navbar = ({ movies, setFiltered }) => {
  const handleFilter = (type) => {
    if (type === "all") {
      setFiltered(movies);
    } else {
      setFiltered(movies.filter((m) => m.type === type));
    }
  };

  return (
    <nav
      style={{
        backgroundColor: "#000",
        color: "white",
        padding: "15px",
        display: "flex",
        gap: "20px",
        marginBottom: "20px",
        borderBottom: "3px solid #e50914",
      }}
    >
      <button
        onClick={() => handleFilter("all")}
        style={{
          backgroundColor: "#e50914",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
          transition: "all 0.3s ease",
        }}
      >
        🏠 Home
      </button>

      <button
        onClick={() => handleFilter("movie")}
        style={{
          backgroundColor: "transparent",
          color: "white",
          border: "2px solid #ddd",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "all 0.3s ease",
        }}
      >
        🎬 Movies
      </button>

      <button
        onClick={() => handleFilter("tvSeries")}
        style={{
          backgroundColor: "transparent",
          color: "white",
          border: "2px solid #ddd",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "all 0.3s ease",
        }}
      >
        📺 TV Shows
      </button>
    </nav>
  );
};

export default Navbar;
