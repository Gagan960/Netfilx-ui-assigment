import { useEffect, useState } from "react";
import MovieCard from "../Component/MovieCard";
import Navbar from "../Component/Navbar";
import SearchBar from "../Component/SearchBar";
import { fetchMovies } from "../Services/api";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await fetchMovies();
    setMovies(data);
    setFiltered(data);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
      ) {
        setVisibleCount((prev) => prev + 20);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const displayedMovies = filtered.slice(0, visibleCount);
  const topShow = filtered[0];

  return (
    <div style={{ padding: "20px" }}>
      <Navbar movies={movies} setFiltered={setFiltered} />
      <SearchBar data={movies} setFiltered={setFiltered} />
      {topShow && (
        <div
          style={{
            backgroundColor: "#222",
            color: "white",
            padding: "20px",
            marginBottom: "30px",
            borderRadius: "8px",
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <div>
            <img
              src={topShow.primaryImage?.url}
              alt={topShow.primaryTitle}
              style={{ width: "200px", borderRadius: "8px" }}
            />
          </div>
          <div>
            <h2>🔥 Top Show Today</h2>
            <h3>{topShow.primaryTitle}</h3>
            <p>Type: {topShow.type}</p>
            <p>Year: {topShow.startYear || "N/A"}</p>
          </div>
        </div>
      )}

      <h2>All Movies & TV Shows ({filtered.length})</h2>
      <p>Showing {displayedMovies.length} of {filtered.length}</p>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {displayedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;