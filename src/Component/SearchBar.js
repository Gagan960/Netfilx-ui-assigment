import { useState, useEffect, useRef } from "react";
import useDebounce from "../hooks/useDebounce";

const SearchBar = ({ data, setFiltered }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const searchRef = useRef(null);

  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setFiltered(data);
      setSuggestions([]);
      return;
    }

    const result = data.filter((item) =>
      item.primaryTitle?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      item.id?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      item.startYear?.toString().includes(debouncedQuery)
    );

    setFiltered(result);
    setSuggestions(result.slice(0, 8));
    setShowSuggestions(true);
  }, [debouncedQuery, data]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (item) => {
    setQuery(item.primaryTitle);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} style={{ position: "relative", marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="🔍 Search by title, ID, or year..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query && setShowSuggestions(true)}
        style={{
          width: "98%",
          padding: "12px",
          borderRadius: "5px",
          border: "2px solid #ddd",
          fontSize: "16px",
          boxSizing: "border-box",
          outline: "none",
        }}
      />

      {showSuggestions && suggestions.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "white",
            border: "2px solid #ddd",
            borderTop: "none",
            borderRadius: "0 0 5px 5px",
            maxHeight: "300px",
            overflowY: "auto",
            zIndex: 10,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {suggestions.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSuggestionClick(item)}
              style={{
                padding: "10px 12px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
                display: "flex",
                gap: "10px",
                alignItems: "center",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
            >
              <img
                src={item.primaryImage?.url}
                alt={item.primaryTitle}
                style={{
                  width: "40px",
                  height: "60px",
                  borderRadius: "3px",
                  objectFit: "cover",
                }}
              />
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    margin: "0",
                    fontWeight: "bold",
                    fontSize: "14px",
                    maxWidth: "300px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.primaryTitle}
                </p>
                <p
                  style={{
                    margin: "2px 0 0 0",
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  {item.type} • {item.startYear || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showSuggestions && query && suggestions.length === 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "white",
            border: "2px solid #ddd",
            borderTop: "none",
            borderRadius: "0 0 5px 5px",
            padding: "15px",
            textAlign: "center",
            color: "#999",
            zIndex: 10,
          }}
        >
          No results found for "{query}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;

