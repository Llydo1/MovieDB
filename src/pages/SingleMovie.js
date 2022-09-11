import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT } from "../context";

const SingleMovie = () => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setMovie(await (await fetch(API_ENDPOINT + `&i=${id}`)).json());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);
  console.log(movie);
  if (loading) return <div className="loading"></div>;
  if (movie.Error)
    return (
      <section>
        <h1>Error - Movie not found</h1>
        <Link className="btn" to="/">
          Back to movies
        </Link>
      </section>
    );
  return (
    <section className="single-movie">
      <img src={movie.Poster} alt="" />
      <div className="single-movie-info">
        <h2>{movie.Title}</h2>
        <p>{movie.Plot}</p>
        <h4>{movie.Year}</h4>
        <Link className="btn" to="/">
          Back to movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
