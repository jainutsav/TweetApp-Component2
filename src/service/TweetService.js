import axios from "axios";

const baseUrl = "http://localhost:8080/api/v1.0/tweets"

class TweetService{

    async getAllTweets(){
        return await axios.get(baseUrl+'/all',{headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
    }})
    }

    async likeTweet(id){
        return await axios.put(baseUrl+'/'+localStorage.getItem('username')
        +'/like/'+id,{},{headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
    }})
    }

    async addTweet(tweet){
        return await axios.put(baseUrl+'/'+localStorage.getItem('username')
        +'/add',{
            username: localStorage.getItem('username'),
            message: tweet
            },{headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
    }})
    }

    async getUserTweets(username){
        return await axios.get(baseUrl+'/'+username,{headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
    }})
    }

    async deleteTweet(id){
        return await axios.get(baseUrl+'/'+localStorage.getItem('username')
        +'/delete/'+id,{headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
    }})
    }

    async updateTweet(id, message){
        return await axios.put(baseUrl+'/'+localStorage.getItem('username')
        +'/update/'+id,{message:message},{headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
    }})
    }

    async addReply(id, reply){
        return await axios.post(baseUrl+'/'+localStorage.getItem('username')
        +'/reply/'+id,reply,{headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
    }})
    }
}

export default new TweetService()