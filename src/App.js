import React, { useCallback, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";
import { useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMov = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://movieapi-5fbef-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json"
      );
      if (!response.ok) {
        throw new Error("something went wrong boy");
      }
      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMov();
  }, [fetchMov]);

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://movieapi-5fbef-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "content-type": "applications/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);
  }

  let content = <p>No movies found, please click Fetch Movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading movies for you..</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMov}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;

// {!isLoading && <MoviesList movies={movies} />}
//         {!isLoading && movies.length == 0 && !error && (
//           <p>No movies found, please click Fetch Movies</p>
//         )}
//         {isLoading && <p>Loading movies for you..</p>}
//         {!isLoading && error && <p>{error}</p>}
