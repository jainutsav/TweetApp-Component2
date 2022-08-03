import React, { useEffect, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './User.module.css'
import { Link, useLocation } from 'react-router-dom';
import UserService from '../../service/UserService';

const User = (props) => {
    const location = useLocation()

    const [users, setUsers] = useState([]);
    const [showAllUsers, setShowAllUsers] = useState(false)

    if (showAllUsers !== props.showAllUsers) {
        setShowAllUsers(props.showAllUsers)
    }

    useEffect(() => {
        if (showAllUsers) {
            UserService.getAllUsers().then(response => {
                setUsers(response.data)
            }).catch(error => {
                console.log(error)
            })
        } else {
            setUsers(location.state.users)
        }
    }, [showAllUsers])

    return (
        <Card className={classes.login}>
            {users !== null &&
                <ul>
                    <h2>{showAllUsers? 'All Users List' :'Users Found!!!'}</h2>
                    {users.map(user => (
                        <li key={user.username}>
                            <Link to={'/api/v1.0/tweets/' + user.username} class={classes.link}>
                                {user.username}
                            </Link>
                        </li>
                    ))
                    }
                </ul>
            }
            {users === null &&
                <span>
                    No users found.
                </span>
            }
        </Card>
    );
}

export default User;