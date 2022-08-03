import axios from "axios";

const baseUrl = "http://localhost:8080/api/v1.0/tweets"

class UserService{

    async loginUser(userLogin){
        return await axios.post(baseUrl+'/login', userLogin,{headers: {
            'Content-Type':'application/json'
    }})
    }

    async registerUser(userRegister){
        return await axios.post(baseUrl+'/register', userRegister)
    }

    async getUsername(email){
        return await axios.get(baseUrl+'/get/'+email,{headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
        }})
    }

    async searchUser(user){
        return await axios.get(baseUrl+'/user/search/'+user,{headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
        }})
    }

    async getAllUsers(){
        return await axios.get(baseUrl+'/users/all',{headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
        }})
    }

}

export default new UserService()