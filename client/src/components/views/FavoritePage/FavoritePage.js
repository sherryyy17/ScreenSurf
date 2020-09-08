import React, { useState, useEffect } from 'react'
import { IMAGE_URL } from '../../Config'
import './favorite.css';
import Axios from 'axios';
import { Popover } from 'antd';

function FavoritePage() {
    const variables = { userFrom: localStorage.getItem('userId') }
    const [FavoriteMovie, setFavoriteMovie] = useState([])


    useEffect(() => {
        fetchFavoriteMovies();
    }, [])

    const fetchFavoriteMovies = () => {
        Axios.post('/api/favorite/getFavoriteMovie', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteMovie(response.data.favorites)
                } else {
                    alert('Failed to get favorited videos')
                }
            })
    }

    const onClickDelete = (movieId, userFrom) => {

        const variables = {
            movieId: movieId,
            userFrom: userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavoriteMovies();
                } else {
                    alert('Failed to Remove From Favorite')
                }
            })
    }

    const renderTableBody = FavoriteMovie.map((movie, index) => {

        const content = (
            <div>
                {movie.moviePost ?
                    <img src={`${IMAGE_URL}w500${movie.moviePost}`} />
                    :
                    "no image"}
            </div>
        );

        return <tr>
            <Popover content={content} title={`${movie.movieTitle}`}>
                <td>{movie.movieTitle}</td>
            </Popover>
            <td>{movie.movieRunTime}</td>
            <td><button onClick={() => onClickDelete(movie.movieId, movie.userFrom)}>Remove</button></td>
        </tr>
    });

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h3> Your Favorites </h3>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <td>Remove from favorites</td>
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody}
                </tbody>
            </table>

        </div>
    )
}


export default FavoritePage
