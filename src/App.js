import React, { useState, useEffect } from "react";

import "./App.css";

const MovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = "e8ccc676e299173067a80520c1fee405&query";
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${currentPage}`
      );
      const data = await response.json();
      setSearchResults(data.results);
      setTotalPages(data.total_pages);
    };

    fetchMovies();
  }, [searchQuery, currentPage]);

  return (
    <>
      <div className="app-container">
        <p>MOVIE NAME</p>
        <div class="search-box">
          <button class="btn-search">
            <i class="fas fa-search btn"></i>
          </button>
          <input
            type="search"
            className="input-search"
            placeholder="search movie"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="pagination">
        <button
          className="button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <ul>
        {searchResults.map((movie) => (
          <ul key={movie.id}>
            <div className="movie-details">
              <div className="image">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                  className="pic"
                />
              </div>
              <div className="description">
                <h1>{movie.title}</h1>
                <p>Release Date: {movie.release_date}</p>
                <p>Rating: {movie.vote_average}</p>
                <p>{movie.overview}</p>
              </div>
            </div>
          </ul>
        ))}
      </ul>
    </>
  );
};

export default MovieSearch;
