import './MovieRow.css';

import React, { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default ({ title, items }) => {
    const [scrollX, setScrollX] = useState(0);
    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if (x > 0) x = 0
        setScrollX(x)
    }
    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150;
        if ((window.innerWidth - listW) > x) x = (window.innerWidth - listW) - 75
        setScrollX(x)
    }
    return (
        <div className='movieRow'>
            <h2>{title}</h2>

            <div className="movieRow--left">
                <ArrowBackIosNewIcon
                    style={{ fontSize: 30 }}
                    onClick={handleLeftArrow}
                />
            </div>
            <div className="movieRow--right">
                <ArrowForwardIosIcon
                    style={{ fontSize: 30 }}
                    onClick={handleRightArrow}
                />
            </div>
            <div className="movieRow--listarea">
                <div className="movieRow--list"
                    style={{
                        width: items.results.length * 150,
                        marginLeft: scrollX,
                        transition: 'all ease 0.6s'
                    }}
                >
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className="movieRow--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.oritinal_title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}