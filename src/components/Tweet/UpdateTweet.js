import React from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input';
import classes from './UpdateTweet.module.css'
import TweetService from '../../service/TweetService';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdateTweet = () => {
    const navigate = useNavigate();
    const location = useLocation()

    const submitHandler = (event) => {
        event.preventDefault();
        TweetService.updateTweet(location.state.id, event.target[0].value).then(response => {
            navigate('/');
        }).catch(error => {
            console.log(error)
        })
    }

    const onCancel = () => {
        navigate('/')
    }

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    id="addTweet"
                    label="Add Tweet"
                    type="text"
                    placeholder="Enter your tweet here."
                    value={location.state.message}
                />
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn}>
                        Update Tweet
                    </Button>
                    <Button onClick={onCancel} className={classes.btn}>
                        Cancel
                    </Button>

                </div>
            </form>
        </Card>
    );
}

export default UpdateTweet;