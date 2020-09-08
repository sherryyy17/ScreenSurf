import React, { useState } from 'react'
import axios from 'axios'
import { Button, Input } from 'antd';
import { useSelector } from 'react-redux'
const { TextArea } = Input;

function Comment(props) {
    const user = useSelector(state => state.user)
    const [Comment, setComment] = useState("")


    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variable = {
            content: Comment,
            writer: user.userData._id,
            postId: props.postId

        }

        axios.post('/api/comment/saveComment', variable)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('failed to save comment')
                }
            })
    }

    return (
        <div>
            <br />
            <p>Comments</p>
            <hr />
            {/*Comment Lists*/}
            {console.log(props.CommentList)}
            < form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: "100%", borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="Write your Comment here"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>
        </div >
    )
}

export default Comment
