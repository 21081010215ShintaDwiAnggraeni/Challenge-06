import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { getPostDetails } from '../redux/actions/postActions';


const keyapi = 'bbf6f9dfb0527e901039ca82c8d74b56';

function DetailMovie() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {postDetails} = useSelector((state) => state.post)
  console.log(postDetails)
  // const [film, setFilm] = useState(null);
  // const [genres, setGenres] = useState([]);

  useEffect(() => {
    dispatch(getPostDetails(id))

  }, [dispatch, id]);

  // if (!film) {
  //   return <div>LOADING...</div>;
  // }

  const backgroundStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${postDetails?.backdrop_path})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  return (
    <div style={backgroundStyle}>
          <div className="col-md">
            <div className="card bg-transparent text-white">
              <div className="card-body">
              <h1 className="card-title text-left">{postDetails?.title}</h1>
              {/* <p className="card-text-overview text-left">{genres.map((genre) => genre.name).join(', ')}</p> */}
              <p className="card-text-overview text-left">{postDetails?.overview}</p>
              <p className="card-text-overview text-left">{postDetails?.vote_average}</p>
              <p className="card-text-overview card-text text-left">
                <small className="">{postDetails?.release_date}</small>
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
