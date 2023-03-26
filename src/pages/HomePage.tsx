import React, { Fragment, useState } from 'react';
import MovieList from '../movies/MovieList';

const HomePage = () => {
  const [filter, setFilter] = useState('');
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  const [videoType, setVideoType] = useState('now_playing');
  return (
    <Fragment>
      <section className='movies-layout page-container pb-10'>
        <div className='flex mb-10'>
          <div className='search flex-1 '>
            <input
              type='text'
              className='w-full p-4  outline-none bg-slate-800 text-white'
              placeholder='Type here to search...'
              onChange={handleFilterChange}
            />
          </div>
          <button className=' p-4  bg-primary text-white'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
          </button>
        </div>
      </section>
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
