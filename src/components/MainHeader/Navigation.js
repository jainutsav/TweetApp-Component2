import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Input from '../UI/Input/Input';

import AuthContext from '../../store/auth-context';
import classes from './Navigation.module.css';
import UserService from '../../service/UserService';
import {useNavigate}  from 'react-router-dom'

const Navigation = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate()

  const addNewTweetURL = "/api/v1.0/tweets/" + localStorage.getItem('username') + "/add"

  const submitHandler = (event) => {
    event.preventDefault();
    UserService.searchUser(event.target[0].value).then(response => {
      navigate("/api/v1.0/tweets/user/search/"+event.target[0].value,{state:{users:response.data}});
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <form onSubmit={submitHandler}>
              <Input className={classes.input}
                id="search"
                type="text"
                placeholder="Search here."
              />
            </form>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <Link to='/' className={classes.link}>Home</Link>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <Link to={addNewTweetURL} className={classes.link}>Add New Tweet</Link>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <Link to="/api/v1.0/tweets/users/all" className={classes.link}>Users</Link>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
