import React, { Fragment, useState } from 'react';
import MovieList from '../movies/MovieList';

const HomePage = () => {

  const [videoType, setVideoType] = useState('now_playing');
  return (
    <Fragment>
      <section className='movies-layout page-container pb-10'>
        <div className='flex flex-direction-column'>
          <h2 className='capitalize text-white mb-10 text-3xl font-bold' onClick={() => setVideoType('now_playing')}>
            Now Playing
          </h2>
          <h2 className='capitalize text-white mb-10 text-3xl font-bold ml-10' onClick={() => setVideoType('top_rated')}>
            Top Rated
          </h2>
        </div>
        <MovieList type={videoType}></MovieList>
      </section>
      <section className='movies-layout page-container pb-10'>
        <h2 className='capitalize text-white mb-10 text-3xl font-bold'>
          Trending
        </h2>
        <MovieList type='popular'></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
