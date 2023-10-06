import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";


const keyapi = 'bbf6f9dfb0527e901039ca82c8d74b56';

function DetailMovie() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchFilmDetail = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${keyapi}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFilm(data);
        setGenres(data.genres);
      } catch (error) {
        console.error('Error fetching film detail:', error);
      }
    };

    fetchFilmDetail();
  }, [id]);

  if (!film) {
    return <div>LOADING...</div>;
  }

  const backgroundStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${film.backdrop_path})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  return (
    <div style={backgroundStyle}>
          <div className="col-md">
            <div className="card bg-transparent text-white">
              <div className="card-body">
              <h1 className="card-title text-left">{film.title}</h1>
              <p className="card-text-overview text-left">{genres.map((genre) => genre.name).join(', ')}</p>
              <p className="card-text-overview text-left">{film.overview}</p>
              <p className="card-text-overview text-left">{film.vote_average}</p>
              <p className="card-text-overview card-text text-left">
                <small className="">{film.release_date}</small>
              </p>
                <Link to={`/`}>
                  <button className="btn btn-info">Back to Home</button>
                </Link>
              </div>
            </div>
          </div>
        
      
    </div>
  );
}

export default DetailMovie;
