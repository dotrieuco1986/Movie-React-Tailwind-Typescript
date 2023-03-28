import React from 'react';
import { Fragment, lazy, Suspense } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import 'swiper/scss';
import './App.css';
import DialogComponentClass from './components/dialog/DialogComponentClass';
import Main from './components/layout/Main';
import LoadingPage from './components/loading/LoadingPage';

// https://api.themoviedb.org/3/movie/now_playing?api_key=67649f3aeae7c3a2d82504a13ab67bf3
const HomePage = lazy(() => import('./pages/HomePage'))
const MovieDetailPage = lazy(() => import('./pages/MovieDetailPage'))
export const dialogRef = React.createRef<DialogComponentClass>();

function App() {

  return (
    <Fragment>
      <Suspense fallback = {<div className='w-100 h-100 fixed top-0 left-0'><LoadingPage/></div>}>
      {/* fallback này giống như loading  */}
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path='/'
              element={
                <>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route
              path='/movie/:movieId'
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
      <DialogComponentClass ref={dialogRef} /> 
    </Fragment>
  );
}

export default App;