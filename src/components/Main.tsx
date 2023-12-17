import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import Welcome from './Welcome';
import Home from './Home';

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [menu, setMenu] = useState('');
  const [search, setSearch] = useState(false);

  const searchRef = useRef(null);

  const getMovies = async () => {
    try {
      const response = await fetch(
        menu === 'home' || menu === ''
          ? 'https://api.themoviedb.org/3/movie/upcoming?api_key=f48306b510d02ae6327b1298d03a0771'
          : `https://api.themoviedb.org/3/discover/${menu ? menu : 'movie'}?api_key=f48306b510d02ae6327b1298d03a0771`
      );
      const json = await response.json();
      setMovies(json.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menu]);

  return (
    <div className='bg-black min-h-screen'>
      <div className='flex h-full w-full'>
        <div className='w-1/12'>
          <Navbar setMenu={setMenu} setSearch={setSearch} search={search} searchRef={searchRef} />
        </div>
        {!search && (
          <div className='w-11/12'>
            <Welcome movies={movies[0]} />
          </div>
        )}
      </div>
      <div>
        <Home movies={movies} search={search} searchRef={searchRef} />
      </div>
    </div>
  );
};

export default Main;
