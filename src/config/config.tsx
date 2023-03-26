// export const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());
export const apiKey = '67649f3aeae7c3a2d82504a13ab67bf3';
const tmdbEndpoint = 'https://api.themoviedb.org/3/movie';
//https://api.themoviedb.org/3/movie/{movie_id}?api_key=
export const tmdbAPI = {
  getMovieList: (type: any) => `${tmdbEndpoint}/${type}?api_key=${apiKey}`,
  getMovieDetail: (movieId: any) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
  getMovieMeta: (movieId: any, type: any) =>
    `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`,
};


