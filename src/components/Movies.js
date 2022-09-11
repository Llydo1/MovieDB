import React from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const Movies = () => {
  const { loading, movies } = useGlobalContext();
  if (loading) return <div className="loading"></div>;
  return (
    <section className="movies">
      {movies.map(({ Title, Year, imdbID, Poster }) => (
        <Link key={imdbID} className="movie" to={`/movies/${imdbID}`}>
          <article>
            <img src={Poster || url} alt={Title} />
            <div className="movie-info">
              <h4 className="title">{Title}</h4>
              <p>{Year}</p>
            </div>
          </article>
        </Link>
      ))}
    </section>
  );
};

export default Movies;
