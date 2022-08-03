import React, { useContext } from 'react';

import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';
import Login from './components/LoginRegisterForm/Login/Login'
import { Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/LoginRegisterForm/Register/Register';
import AddTweet from './components/Tweet/AddTweet';
import UpdateTweet from './components/Tweet/UpdateTweet';
import User from './components/User/User';

function App() {
  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        <Routes>
          <Route path='/' element={ctx.isLoggedIn ? <Home showUserTweets={false}/>:<Navigate to='/login' />} />
          <Route path='/login' element={!ctx.isLoggedIn ? <Login />:<Navigate to='/' />} />
          <Route path='/register' element={!ctx.isLoggedIn ? <Register />:<Navigate to='/' />} />
          <Route path='/api/v1.0/tweets/:username/add' element={ctx.isLoggedIn ? <AddTweet />:<Navigate to='/login' />} />
          <Route path='/api/v1.0/tweets/:username' element={ctx.isLoggedIn ? <Home showUserTweets={true} />:<Navigate to='/login' />} />
          <Route path='/api/v1.0/tweets/:username/update/:id' element={ctx.isLoggedIn ? <UpdateTweet />:<Navigate to='/login' />} />
          <Route path='/api/v1.0/tweets/user/search/:search' element={ctx.isLoggedIn ? <User showAllUsers={false} />:<Navigate to='/login' />} />
          <Route path='/api/v1.0/tweets/users/all' element={ctx.isLoggedIn ? <User showAllUsers={true}/>:<Navigate to='/login' />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
