import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../config/config';
import MovieCard, { MovieCardSkeleton } from './MovieCard';
import Movie from '../modal/Movie';
const MovieList = ({ type = 'now_playing' }) => {
  const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  const loading = !data && !error;
  const movies = data?.results || [];
  return (
    <div className='movie-list'>
    {loading &&  <Swiper grabCursor={true} spaceBetween={40} slidesPerView={'auto'}>
        {/* grabCursor để bật có kéo được hay không */}

        {movies.length > 0 &&
          movies.map((item:Movie) => (
            <SwiperSlide key={item.id}>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
          ))}
      </Swiper> }
      {!loading &&<Swiper grabCursor={true} spaceBetween={40} slidesPerView={'auto'}>
        {/* grabCursor để bật có kéo được hay không */}

        {movies.length > 0 &&
          movies.map((item:Movie) => (
            <SwiperSlide key={item?.id}>
              <MovieCard data={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>}
    </div>
  );
};
export default MovieList;
