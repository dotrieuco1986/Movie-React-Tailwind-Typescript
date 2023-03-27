import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import { tmdbAPI } from '../config/config';
import MovieCard, { MovieCardSkeleton } from './MovieCard';
import Movie from '../modal/Movie';
import axios from 'axios';
import Loading from '../components/loading/Loading';
const MovieList = ({ type = 'now_playing' }) => {

  const [movies, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className='movie-list'>
      {loading &&  
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={'auto'}>
        {movies.length > 0 &&
          movies.map((item:Movie) => (
          <SwiperSlide key={item.id}>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
        ))}
        </Swiper> 
      }
      {!loading &&
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={'auto'}>
        {movies.length > 0 &&
          movies.map((item:Movie) => (
          <SwiperSlide key={item?.id}>
            <MovieCard data={item}></MovieCard>
          </SwiperSlide>
        ))}
        </Swiper>
      }
    </div>
  );
};
export default MovieList;
