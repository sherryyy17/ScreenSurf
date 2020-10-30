import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import MainImage from '../LandingPage/sections/MainImage'
import GridCard from '../LandingPage/sections/GridCard'
import Favorite from '../MovieDetailPage/sections/Favorite'
import Comment from '../MovieDetailPage/sections/Comment'
import { Descriptions, Row, Button } from 'antd';
import axios from 'axios';

function MovieDetailPage(props) {

    const [Movie, setMovie] = useState([])
    const [Crew, setCrew] = useState([])
    const [CommentList, setCommentList] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    const movieId = props.match.params.movieId

    const movieVariable = {
        movieId: movieId
    }

    useEffect(() => {

        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(response => {
                setMovie(response)

                fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
                    .then(response => response.json())
                    .then(response => {
                        console.log(response)
                        setCrew(response.cast)
                    })
            })

        axios.post('/api/comment/getComments', movieVariable)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    console.log('response.data.comments', response.data.comments)
                    setCommentList(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })

    }, [])

    const updateComment = (newComment) => {
        setCommentList(CommentList.concat(newComment))
    }

    const handleClick = () => {
        setActorToggle(!ActorToggle)
    }

    return (
        <div>
            {/*maiin image*/}
            {Movie &&
                < MainImage image={`${IMAGE_URL}w1280${Movie.backdrop_path}`}
                    title={Movie.original_title} text={Movie.overview} />
            }

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieId={movieId} movieInfo={Movie} userFrom={localStorage.getItem('userId')} />
                </div>

                {/* movie info table */}
                <Descriptions title="About Movie" bordered>
                    <Descriptions.Item label="Title">{Movie.original_title}</Descriptions.Item>
                    <Descriptions.Item label="release_date">{Movie.release_date}</Descriptions.Item>
                    <Descriptions.Item label="revenue">{Movie.revenue}</Descriptions.Item>
                    <Descriptions.Item label="runtime">{Movie.runtime}</Descriptions.Item>
                    <Descriptions.Item label="vote_average" span={2}>
                        {Movie.vote_average}
                    </Descriptions.Item>
                    <Descriptions.Item label="vote_count">{Movie.vote_count}</Descriptions.Item>
                    <Descriptions.Item label="status">{Movie.status}</Descriptions.Item>
                    <Descriptions.Item label="popularity">{Movie.popularity}</Descriptions.Item>
                </Descriptions>

                <br /><br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={handleClick}>Toggle View</Button>
                </div>
                <br /><br />

                {/* Grid card for crew */}
                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {Crew && Crew.map((crew, index) => (
                            <React.Fragment key={index}>
                                {crew.profile_path &&
                                    <GridCard
                                        actor image={`${IMAGE_URL}w500${crew.profile_path}`} name={crew.name} character={crew.character}
                                    />
                                }

                            </React.Fragment>
                        ))}

                    </Row>
                }
                {/*Comments*/}
                <Comment movieTitle={Movie.original_title} CommentList={CommentList} postId={movieId} refreshFunction={updateComment} />

            </div>

        </div>
    )
}

export default MovieDetailPage
