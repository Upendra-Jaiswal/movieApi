import React, { useCallback, useEffect } from "react";

import MoviesList from "./components/MoviesList";
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
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("something went wrong boy");
      }

      const data = await response.json();

      const transformedData = data.results.map((movData) => {
        return {
          title: movData.title,
          id: movData.episode_id,
          releaseDate: movData.release_date,
          openingText: movData.opening_crawl,
        };
      });
      console.log(transformedData);
      setMovies(transformedData);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMov();
  }, [fetchMov]);

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
