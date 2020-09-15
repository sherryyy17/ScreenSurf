import React, { useState, useEffect } from 'react'
import { IMAGE_URL } from '../../Config'
import './favorite.css';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { Typography, Popover, Button } from 'antd';
const { Title } = Typography;

function FavoritePage() {
    const variables = { userFrom: localStorage.getItem('userId') }
    const [FavoriteMovie, setFavoriteMovie] = useState([])
    const [Loading, setLoading] = useState(true)
    const user = useSelector(state => state.user)


    useEffect(() => {
        fetchFavoriteMovies();
    }, [])

    const fetchFavoriteMovies = () => {
        Axios.post('/api/favorite/getFavoriteMovie', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteMovie(response.data.favorites)
                    setLoading(false)
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
            <td><Button onClick={() => onClickDelete(movie.movieId, movie.userFrom)}>Remove</Button></td>
        </tr>
    });

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > Favorite Movies By Me </Title>
            <hr />
            {user.userData && !user.userData.isAuth ?
                <div style={{ width: '100%', fontSize: '2rem', height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Please Log in first...</p>
                    <a href="/login">Go to Login page</a>
                </div>
                :
                !Loading &&
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
            }
        </div>
    )

}


export default FavoritePage
