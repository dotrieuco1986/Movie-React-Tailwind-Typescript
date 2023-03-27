import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button/Button';
import { withErrorBoundary } from 'react-error-boundary';
import LoadingSkeleton from '../components/loadingSkeleton/LoadingSkeleton';
import Movie from '../modal/Movie';
import ImageLoader from '../components/imageLoader/ImageLoader';

interface Prop {
  data: Movie
}

const MovieCard  = (item:Prop ) => {
  const navigate = useNavigate();
  return (
    <div className='movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none'>
      <ImageLoader url={`https://image.tmdb.org/t/p/w500/${item.data.poster_path}`} />
      <div className='flex flex-col flex-1'>
        <h3 className=' text-xl font-bold mb-3'>{item.data.title}</h3>
        <div className='flex items-center justify-between text-white text-sm opacity-50 mb-10'>
          <span>{new Date(item.data.release_date).getFullYear()}</span>
          <span>{item.data.vote_average}</span>
        </div>
        <Button onClick={() => navigate(`/movie/${item.data.id}`)} bgColor='secondary'>
          Watch Now
        </Button>
      </div>
    </div>
  );
};

function FallbackComponent () {
  return <p className="bg-red-50 text-red-400">Something went wrong with this component</p>
}
export default withErrorBoundary( MovieCard , {
  FallbackComponent,
} )
export const MovieCardSkeleton = () => {
  return (
    <div className='movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none'>
    <LoadingSkeleton className={`w-full h-[250px] object-cover rounded-lg mb-5`}></LoadingSkeleton>
    <div className='flex flex-col flex-1'>
      <h3 className=' text-xl font-bold mb-3'><LoadingSkeleton width = '100%' height = '20px'></LoadingSkeleton></h3>
      <div className='flex items-center justify-between text-white text-sm opacity-50 mb-10'>
        <span><LoadingSkeleton width ='50px' height = '10px'></LoadingSkeleton></span>
        <span><LoadingSkeleton width ='50px' height = '10px'></LoadingSkeleton></span>
      </div>
      <LoadingSkeleton radius = '6px' width ='100%' height = '45px'></LoadingSkeleton>
    </div>
  </div>
  )
}
