import React from 'react'
import { Col, Card, } from 'antd';
const { Meta } = Card;

function GridCard(props) {

    if (props.actor) {

        return (
            <Col lg={6} md={8} xs={24}>
                <Card
                    cover={<img style={{ width: '100%', height: '320px' }} alt src={props.image} />}
                >
                    <Meta

                        title={props.name}
                        description={props.character}
                    />
                </Card>

            </Col>

        )
    } else {
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: "relative" }}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{ width: '100%', height: '320px' }} alt src={props.image} />

                    </a>
                </div>

            </Col>
        )
    }

}

export default GridCard
