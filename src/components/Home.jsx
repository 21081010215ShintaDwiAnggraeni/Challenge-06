import { useEffect, useState } from "react";
import { getMovieList, searchMovie } from "../api/api";
import { ArrowRight, Search } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

function Home() {
  const [moviePopular, setMoviePopular] = useState([]);
  const [searchResults, setsearchresults] = useState([]);
  const [input, setInput] = useState(``);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);


  useEffect(() => {

    const getMovieList = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `https://shy-cloud-3319.fly.dev/api/v1/movie/popular`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data.data;
        setMoviePopular(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // If not valid token
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            // Temporary solution
          }
          toast.error(error.response.data.message);
          return;
        }
        toast.error(error.message);
      }
    };

    getMovieList();
  }, []);

useEffect(() => {

  const searchMovieList = async () => {
    const datainput = input
    try {
  
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `https://shy-cloud-3319.fly.dev/api/v1/search/movie?page=1&query=${datainput}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;
      setsearchresults(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // If not valid token
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          // Temporary solution
        }
        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };

  searchMovieList();
  }, [input]);
  const filteredMovies = input.length >= 2 ? searchResults : moviePopular;

  const MovieList = () => {
    return (
      <div className="movie-grid">
        {filteredMovies.map((movie) => (
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
        <h5 className="brand">Popular Movie</h5>
        <div className="search-container">
          <input
            className="search rounded"
            placeholder="Search Movie"
            onChange={(e) => setInput(e.target.value)}
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
        {isLoggedIn ? (
              <>
	          <div className="button">
            <button onClick={() => {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                    return navigate("/");
                  }}>Logout</button>      
          </div>
              </>
            ) : (
              <>
	        <div className="button">
            <Link as= {Link} to={'/login'}><button className='login'>Login</button></Link>
            <Link as= {Link} to={'/register'}><button className='register'>Register</button></Link>           
          </div>
              </>
            )}
      </div>
      <MovieList />
    </>
  );
}

export default Home;