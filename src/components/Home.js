import { useEffect, useState } from "react";
import { getMovieList, searchMovie } from "../api/api";
import { ArrowRight, Search } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function Home() {
  const [moviePopular, setMoviePopular] = useState([]);

  useEffect(() => {
    getMovieList().then((results) => {
      setMoviePopular(results);
      console.log(results);
    });
  }, []);

  const MovieList = () => {
    return (
      <div className="movie-grid">
        {moviePopular.map((movie) => (
          <div className="movie-item" key={movie.id}>
            <Link to={`/detail/${movie.id}`}>
              <img
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              />
            </Link>
          </div>
        ))}
      </div>
    );
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setMoviePopular(query.results);
    }
  };

  return (
    <>
      <div className="header">
        <h1 className="brand">Popular Movie</h1>
        <div className="search-container">
          <input
            className="search rounded"
            placeholder="Search Movie"
            onChange={({ target }) => search(target.value)}
            style={{ fontSize: '14px' }}
          />
          <button className="search-button">
            <Search size={20} />
          </button>
        </div>
        <h6 className="note">
          <span>See All Movie</span>
          <ArrowRight size={16} />
        </h6>
      </div>
      <MovieList />
    </>
  );
}

export default Home;
