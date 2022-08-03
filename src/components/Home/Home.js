import React, { useEffect, useState } from 'react';
import classes from './Home.module.css';
import Tweet from '../Tweet/Tweet';
import TweetService from '../../service/TweetService';
import {useParams } from 'react-router-dom';

const Home = (props) => {
  const [tweets, setTweets] = useState([])
  const [gotData, setGotData] = useState(false)
  const [showUserTweets, setShowUserTweets] = useState(false)

  if(showUserTweets!==props.showUserTweets){
    setShowUserTweets(props.showUserTweets)
    setGotData(false)
  }

  let {username} = useParams()

  const updateTweets = () => {
    TweetService.getAllTweets().then(response => {
      const loadTweets = []
      for (const key in response.data) {
        loadTweets.push({
          key: response.data[key].id,
          id: response.data[key].id,
          username: response.data[key].username,
          message: response.data[key].message,
          likes: response.data[key].likes,
          createdDate: response.data[key].createdDate,
          replies: response.data[key].tweetReplyList
        })
      }

      setTweets(loadTweets)
    }).catch((error) => {
      console.log(error.response)
    })

  }

  useEffect(() => {
    if(props.showUserTweets){
      TweetService.getUserTweets(username).then(response => {
        const loadTweets = []
        for (const key in response.data) {
          loadTweets.push({
            key: response.data[key].id,
            id: response.data[key].id,
            username: response.data[key].username,
            message: response.data[key].message,
            likes: response.data[key].likes,
            createdDate: response.data[key].createdDate,
            replies: response.data[key].tweetReplyList
          })
        }
        console.log(loadTweets)
  
        setTweets(loadTweets)
        setGotData(true)
      }).catch((error) => {
        console.log(error.response)
      })
  
    } else{
      TweetService.getAllTweets().then(response => {
        const loadTweets = []
        for (const key in response.data) {
          loadTweets.push({
            key: response.data[key].id,
            id: response.data[key].id,
            username: response.data[key].username,
            message: response.data[key].message,
            likes: response.data[key].likes,
            createdDate: response.data[key].createdDate,
            replies: response.data[key].tweetReplyList
          })
        }
        setTweets(loadTweets)
        setGotData(true)
      }).catch((error) => {
        console.log(error.response)
      })
  
    }

  }, [showUserTweets]);

  return (
    <div className={classes['home-div']}>
      <div className={classes.home}>
        {gotData && <Tweet tweets={tweets.slice().reverse()} updateTweets={updateTweets}/>}
        </div>
    </div>
  );
};

export default Home;
