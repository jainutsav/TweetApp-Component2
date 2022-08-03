import React from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input';
import classes from './AddTweet.module.css'
import TweetService from '../../service/TweetService';
import { useNavigate } from 'react-router-dom';

const AddTweet = () => {
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(event.target[0].value)
    TweetService.addTweet(event.target[0].value).then(response => {
      navigate('/');
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="addTweet"
          label="Add Tweet"
          type="text"
          placeholder="Enter your tweet here."
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Add Tweet
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default AddTweet;