import React, { useState } from "react";
import classes from "./Tweet.module.css"
import Button from "../UI/Button/Button"
import Card from '../UI/Card/Card';
import TweetService from "../../service/TweetService";
import { Link, useNavigate } from 'react-router-dom'
import Input from "../UI/Input/Input";

const Tweet = (props) => {
    const navigate = useNavigate();

    const [showReplies, setshowReplies] = useState(false)
    const [showRepliesId, setshowRepliesId] = useState('')
    const [addComment, setAddComment] = useState(false)
    const [addCommentId, setAddCommentId] = useState('')

    const likeTweet = (id) => {
        TweetService.likeTweet(id).then(response => {
            props.updateTweets();
        }).catch(error => {
            console.log(error)
        })
    }

    const deleteTweet = (id) => {
        TweetService.deleteTweet(id).then(response => {
            props.updateTweets();
        }).catch(error => {
            console.log(error)
        })
    }

    const updateTweet = (id, message) => {
        navigate('/api/v1.0/tweets/' + localStorage.getItem('username') +
            '/update/' + id, { state: { message: message, id: id } })
    }

    const updateShowReplies = (id) => {
        setAddComment(false)
        setAddCommentId('')
        if (id === showRepliesId) {
            setshowReplies(false)
            setshowRepliesId('')
        }
        else {
            setshowReplies(true)
            setshowRepliesId(id)
        }
    }

    const addCommentHandler = (id) => {
        setshowReplies(false)
        setshowRepliesId('')
        if (id === addCommentId) {
            setAddComment(false)
            setAddCommentId('')
        }
        else {
            setAddComment(true)
            setAddCommentId(id)
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const reply = {
            username: localStorage.getItem('username'),
            message: event.target[0].value
        }
        TweetService.addReply(addCommentId, reply).then(response => {
            props.updateTweets();
        }).catch(error => {
            console.log(error)
        })
        addCommentHandler(addCommentId)
    }

    return (
        <React.Fragment>
            {props.tweets.map(tweet => (
                <React.Fragment key={tweet.key}>
                    <Card className={classes['tweet-card']} >
                        <div className={classes.tweet} >
                            <div className={classes.avatar}>
                                <div className={classes.avatar}>
                                    <img alt="avatar" src="https://bit.ly/3vtKan0" />
                                </div>
                                {tweet.username === localStorage.getItem('username') &&
                                    <div className={classes['edit-delete']}>
                                        <div className={classes.edit}>
                                            <button onClick={() => { updateTweet(tweet.id, tweet.message) }}>
                                                <span className="material-symbols-outlined" style={{ verticalAlign: "middle" }}>
                                                    edit
                                                </span>
                                            </button>
                                        </div>
                                        <div className={classes.delete}>
                                            <button onClick={() => { deleteTweet(tweet.id) }}>
                                                <span className="material-symbols-outlined" style={{ verticalAlign: "middle" }}>
                                                    delete
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className={classes['tweet-box']}>
                                <div className={classes['tweet-top-bar']}>
                                    <div>
                                        <span className="material-symbols-outlined" style={{ verticalAlign: "middle" }}>
                                            account_circle
                                        </span>
                                        <Link to={'/api/v1.0/tweets/' + tweet.username} className={classes.username}>   {tweet.username}</Link>
                                    </div>
                                    <div>
                                        <span className="material-symbols-outlined" style={{ verticalAlign: "middle" }}>
                                            schedule
                                        </span>
                                        <span className={classes.time}> {tweet.createdDate.split('T')[0]}</span>
                                    </div>
                                </div>
                                <div className={classes['tweet-message']}>
                                    {tweet.message}
                                </div>
                                <div className={classes['tweet-bottom-bar']}>
                                    <div><button onClick={() => likeTweet(tweet.id)}><span className="material-symbols-outlined" style={{ verticalAlign: "middle" }}>
                                        thumb_up
                                    </span></button>     {tweet.likes}  </div>
                                    <div><button onClick={() => { updateShowReplies(tweet.id) }}><span className="material-symbols-outlined" style={{ verticalAlign: "middle" }}>
                                        comment
                                    </span>
                                        {/* {tweet.replies.length} */}
                                    </button>   {tweet.replies !== null ? tweet.replies.length : 0}</div>
                                    <div><button onClick={() => { addCommentHandler(tweet.id) }}><span className="material-symbols-outlined" style={{ verticalAlign: "middle" }}>
                                        add_comment
                                    </span></button></div>
                                </div>
                            </div>
                        </div>
                    </Card>
                    {tweet.replies !== null && showReplies && showRepliesId === tweet.id &&

                        <Card className={classes.replies}>
                            {tweet.replies.map(reply => (
                                <React.Fragment key={Math.random()}>
                                    <div>
                                        Comment By:
                                        <Link to={reply.username}>{reply.username}</Link>
                                    </div>
                                    <div>
                                        {reply.message}
                                    </div>
                                </React.Fragment>
                            ))}
                        </Card>
                    }
                    {addComment && addCommentId === tweet.id &&

                        <Card className={classes.login}>
                            <form onSubmit={submitHandler}>
                                <Input
                                    id="addComment"
                                    label="Add Comment"
                                    type="text"
                                    placeholder="Enter your comment here."
                                />
                                <div className={classes.actions}>
                                    <Button type="submit" className={classes.btn}>
                                        Add Tweet
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    }
                </React.Fragment>
            ))}
        </React.Fragment>
    )
}

export default Tweet;