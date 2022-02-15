import './FeaturedMovie.css';
import React from 'react';

export default ({ item }) => {
    const firstDate = new Date(item.first_air_date);
    let genres = []
    for (let i in item.genres) {
        genres.push(item.genres[i].name)
    }
    if (item.overview.length > 200) {
        const newOverview = []
        for (let i = 0; i <= 200; i++) newOverview.push(item.overview[i])
        item.overview = newOverview.join('') + '...'
    }
    return (
        <section className='featured' style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,

        }}>
            <div className='featured--vertical'>
                <div className="featured--horizontal">
                    <div className="featured--name">{item.original_name}</div>
                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} pontos</div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        <div className="featured--seasons">{item.number_of_seasons} Temporada{item.number_of_season !== 1 ? 's' : ''}</div>
                    </div>
                    <div className="featured--description">{item.overview}</div>
                    <div className="featured--buttons">
                        <a href={`/watch/${item.id}`} className='featured--watchButton'>▶ Assistir</a>
                        <a href={`/list/add/${item.id}`} className='featured--myListButton'>+ Minha lista</a>
                    </div>
                    <div className="featured--genres">
                        <strong>Generos: </strong> {genres.join(', ')}
                    </div>
                </div>
            </div>

        </section>
    )
}