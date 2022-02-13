import './App.css';

import React, { useEffect, useState } from 'react';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie'
import Tmdb from './Tmdb';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFreaturedData] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list)
      //pegando o filme em destaque

      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFreaturedData(chosenInfo)
    }

    loadAll();


  }, [])

  return (
    <div className='page'>
      {!!featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow title={item.title} items={item.items} key={key} />
        ))}
      </section>
    </div>
  )
}