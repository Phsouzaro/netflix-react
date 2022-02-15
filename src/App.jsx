import './App.css';

import React, { useEffect, useState } from 'react';
import Header from './components/Header'
import FeaturedMovie from './components/FeaturedMovie/FeaturedMovie'
import MovieRow from './components/MovieRow';
import Footer from './components/Footer'
import Tmdb from './Tmdb';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFreaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list)
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFreaturedData(chosenInfo)
    }

    loadAll();
  }, [])
  useEffect(() => {

    const scrollListener = () => {
      if (window.scrollY > 10) setBlackHeader(true)
      else setBlackHeader(false)
    }
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }

  }, [])

  return (
    <div className='page'>
      <Header black={blackHeader} />
      {!!featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow title={item.title} items={item.items} key={key} />
        ))}
      </section>
      <Footer />
    </div>
  )
}