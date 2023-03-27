import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { tmdbAPI } from "../config/config";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../movies/MovieCard";
import Movie from "../modal/Movie";
import axios from "axios";
import MovieDetail from "../modal/MovieDetail";
import ImageLoader from "../components/imageLoader/ImageLoader";
const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [data, setMovie] = useState<MovieDetail>({title:'', backdrop_path:'', poster_path:'', genres:[], overview:''});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(tmdbAPI.getMovieDetail(movieId))
    .then(res => {
        // Work with the response...
        setLoading(false);
        setMovie(res.data);
    }).catch(err => {
        // Handle error
        setLoading(false);
        alert("System Error")
    });
  },[loading]);

  return (
    <div className="py-10">
      <div className="w-full h-[600px]  relative">
        <div className="overlay absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${data?.backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[300px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
          alt=""
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <h1 className="text-center text-white mb-10 font-bold text-3xl">
        {data?.title}
      </h1>
      { data?.genres && data?.genres.length > 0 && (
        <div className="flex items-center justify-center mb-10">
          {data?.genres.map((item:any) => (
            <span
              key={item.id}
              className="py-2 px-4 mr-1 border  border-primary rounded-lg text-primary"
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center leading relaxed max-w-[600px] mx-auto mb-10"></p>
      <MovieMeta type = 'credits' key={1}></MovieMeta>
      <MovieMeta type = 'videos' key={2}></MovieMeta>
      <MovieMeta type = 'similar' key={3}></MovieMeta>
    </div>
  );
};

interface Props {
  type:string | null;
}

const  MovieMeta = (props: Props ) => {
  const { movieId } = useParams();
  const [data, setMovie] = useState([]);
  const [dataPopular, setMoviePopular] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(tmdbAPI.getMovieMeta(movieId, props.type))
    .then(res => {
        // Work with the response...
        setLoading(false);
        setMovie(res.data.cast);
        setMoviePopular(res.data.results);
    }).catch(err => {
        // Handle error
        setLoading(false);
        alert("System Error")
    });
  },[movieId]);

  if (props.type === "credits") {
    if (!data || data.length <= 0) return null;
    return (
      <div className="py-10">
        <h2 className="text-center text-2xl mb-10 text-white">Casts</h2>
        <div className="container m-auto grid grid-cols-3 md:grid-cols-4 gap-4">
          {data.slice(0, 4).map((item:any) => (
            <div className="cast-item">
              <ImageLoader url={`https://image.tmdb.org/t/p/original/${item.poster_path}`} 
                className={'w-full h-[350px] object-cover rounded-lg'} />
              <h3 className="text-center text-white text-2xl font-medium">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (props.type === "videos") {
    if (!dataPopular || dataPopular.length <= 0) return null;
    return (
      <div className="py-10">
        <div className="flex flex-col gap-10">
          {dataPopular.slice(0, 2).map((item:any) => (
            <div key={item.id} className="">
              <h3 className="mb-5 text-xl text-white font-medium p-3 bg-secondary inline-block">
                {item.name}
              </h3>
              <div className="w-full aspect-video" key={item.id}>
                <iframe
                  width="715"
                  height="402"
                  src={`https://www.youtube.com/embed/${item.key}`}
                  title={item.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (props.type === "similar") {
    if (!dataPopular || dataPopular.length <= 0) return null;
    return (
      <div className="movie-list">
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
          {/* grabCursor để bật có kéo được hay không */}
          {dataPopular.length > 0 &&
            dataPopular.map((item:Movie) => (
              <SwiperSlide key={item.id}>
                <MovieCard data={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    );
  }
  return null;
}

export default MovieDetailPage;
