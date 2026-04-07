import React from "react";

const MovieCard = React.memo(({ movie }) => {
  return (
    <div
      className="movie-card-hover"
      style={{
        width: "150px",
        margin: "10px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <img
        src={movie.primaryImage?.url}
        alt={movie.primaryTitle}
        width="100%"
        style={{ display: "block" }}
      />
      <p style={{ margin: "8px", fontSize: "14px", fontWeight: "bold" }}>
        {movie.primaryTitle}
      </p>
      <p style={{ margin: "0 8px 8px 8px", fontSize: "12px", color: "#666" }}>
        {movie.type}
      </p>
    </div>
  );
});

export default MovieCard;