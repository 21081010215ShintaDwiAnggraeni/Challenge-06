import React, { useEffect, useState } from "react";
import { ArrowRight, Search } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getMovieSearch } from "../redux/actions/postActions";


function Home() {
  const [input, setInput] = useState(``);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
//ambil data movie
  const dispatch = useDispatch()
  const {posts} = useSelector((state) => state.post)
  console.log(input)
  
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const { setsearch } = useSelector((state) => state.post)

  useEffect(() => {
    dispatch(getMovieSearch(input))
  }, [dispatch, input])
  console.log(setsearch)

  const filteredMovies = input.length >= 3 ? setsearch : posts;

  const MovieList = () => {
    return (
      <div className="movie-grid">
        {filteredMovies && filteredMovies.map((movie) => (
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