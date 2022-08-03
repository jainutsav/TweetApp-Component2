import React, {
  useState,
  useContext,
} from 'react';
import {Link} from 'react-router-dom'

import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import AuthContext from '../../../store/auth-context';
import Input from '../../UI/Input/Input';
import classes from './Login.module.css';
import UserService from '../../../service/UserService';


const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [passwordError, setPasswordError] = useState('')

  const authCtx = useContext(AuthContext);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };


  const submitHandler = (event) => {
    event.preventDefault();
      const userLogin = {
        usernameOrEmail: email,
        password: password
      }
      UserService.loginUser(userLogin).then(response => {
        authCtx.onLogin(response.data.accessToken)
        localStorage.setItem('token',response.data.accessToken);
        if(!userLogin.usernameOrEmail.includes('@')){
          localStorage.setItem('username', userLogin.usernameOrEmail)
        } else{
          UserService.getUsername(userLogin.usernameOrEmail).then(response=>{
            localStorage.setItem('username', response.data)
          }).catch((error)=>{
            console.log(error)
          })
        }
      }).catch((error)=>{
        setPasswordError('Email/Username or password is wrong. Please enter correct details to Login.')
      })
      
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="emailUsername"
          label="E-Mail/Username"
          type="text"
          placeholder="Enter Email ID or Username"
          value={email}
          onChange={emailChangeHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={passwordChangeHandler}
        />
        <div className={classes.error}>{passwordError}</div>
        <div className={classes.forgotPassword}>
          <a href="/">Forgot Password?</a>
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
          <Link to='/register'>
            <Button className={classes.btn} >
                Register
            </Button>
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default Login;
