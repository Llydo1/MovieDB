import React, { useState, useContext, useEffect, useCallback } from "react";
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("batman");
  const [error, setError] = useState(false);

  const fecthMovies = async () => {
    try {
      setLoading(true);
      let url;
      url = API_ENDPOINT + "&s=" + query;
      const { Search, Error } = await (await fetch(url)).json();
      if (Search) {
        setMovies(Search);
        setError("");
      } else {
        setError(Error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fecthMovies();
  }, [query]);
  return (
    <AppContext.Provider value={{ loading, query, movies, setQuery, error }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
