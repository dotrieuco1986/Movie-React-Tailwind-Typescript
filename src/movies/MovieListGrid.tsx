import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import { tmdbAPI } from '../config/config';
import MovieCard, { MovieCardSkeleton } from './MovieCard';
import Movie from '../modal/Movie';
import axios from 'axios';
import Loading from '../components/loading/Loading';
import ListGridToggle from '../components/button/ListGirdToggle';
const MovieListGrid = ({ type = 'now_playing' }) => {

  const [movies, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeListGrid, setListGrid] = useState('grid');
  useEffect(() => {
    axios.get(tmdbAPI.getMovieList(type))
    .then(res => {
        // Work with the response...
        setLoading(false);
        setMovie(res.data.results);
    }).catch(err => {
        // Handle error
        setLoading(false);
        alert("System Error")
    });
  },[type]);

  const btnListView = (event: React.MouseEvent<HTMLElement>) => {
    let wrapper = document.getElementById("wrapper");
    setListGrid('list');
    // List view
    event.preventDefault();
    wrapper?.classList.remove("list");
    wrapper?.classList.add("list");
  };

  const btnGridView = (event: React.MouseEvent<HTMLElement>) => {
    let wrapper = document.getElementById("wrapper");
    setListGrid('grid');
    // Grid view
    event.preventDefault();
    wrapper?.classList.remove("list");
  }

  return (
    <div className="list-grid-container">
      <ListGridToggle type={typeListGrid} btnGridViewClick={btnGridView} btnListViewClick={btnListView} />
      {loading &&
      <div className="wrapper" id="wrapper">
        <div className="col">
          <MovieCardSkeleton></MovieCardSkeleton>
        </div>
        <div className="col">
          <MovieCardSkeleton></MovieCardSkeleton>
        </div>
        <div className="col">
          <MovieCardSkeleton></MovieCardSkeleton>
        </div>
        <div className="col">
          <MovieCardSkeleton></MovieCardSkeleton>
        </div>
      </div>
      }
      {!loading && 
      <div className="wrapper" id="wrapper">  
        {movies.length > 0 &&
          movies.map((item:Movie) => (
            <div className="col" key={item?.id}>
              <MovieCard data={item}></MovieCard>
            </div>
        ))}
      </div>
      }
    </div>
  );
};
export default MovieListGrid;
