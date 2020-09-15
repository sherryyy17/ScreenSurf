import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import axios from 'axios';

function Favorite(props) {

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    const variable = {
        movieId: props.movieId,
        userFrom: props.userFrom,
        movieTitle: props.movieInfo.original_title,
        movieImage: props.movieInfo.backdrop_path,
        movieRunTime: props.movieInfo.runtime
    }
    useEffect(() => {

        axios.post('/api/favorite/favoriteNumber', variable)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber);
                } else {
                    alert('Failed to get FavoriteNumber');
                }
            })

        axios.post('/api/favorite/favorited', variable)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.favorited);
                } else {
                    alert('Failed to get Favorited info');
                }
            })


    }, [])

    const toggleFav = () => {


        if (Favorited) {

            //when already added

            axios.post('/api/favorite/removeFromFavorite', variable)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1);
                        setFavorited(!Favorited);
                    } else {
                        alert('Failed to remove from Favorites');
                    }
                })

        } else {
            axios.post('/api/favorite/addtoFavorite', variable)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1);
                        setFavorited(!Favorited);
                    } else {
                        alert('Failed to add to Favorites');
                    }
                })
        }
    }

    return (
        <div>
            <Button onClick={toggleFav}>{Favorited ? " Remove from Favorite " : " Add to Favorite "}{FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
