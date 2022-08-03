import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
} from 'react';
import { Link } from 'react-router-dom'

import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import AuthContext from '../../../store/auth-context';
import Input from '../../UI/Input/Input';
import classes from './Register.module.css';
import UserService from '../../../service/UserService';


const Register = (props) => {

  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [numberError, setNumberError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')


  const [formIsValid, setFormIsValid] = useState(false);

  const authCtx = useContext(AuthContext);

  const firstNameReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      setFirstNameError('')
      return { value: action.val, isValid: action.val.length > 0 };
    }
    if (action.type === 'INPUT_BLUR') {
      if (!state.value.length > 0) {
        setFirstNameError('First Name should not be empty.')
      }
      return { value: state.value, isValid: state.value.length > 0 };
    }
    return { value: '', isValid: false };
  };

  const lastNameReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      setLastNameError('')
      return { value: action.val, isValid: action.val.length > 0 };
    }
    if (action.type === 'INPUT_BLUR') {
      if (!state.value.length > 0) {
        setLastNameError('Last Name should not be empty.')
      }
      return { value: state.value, isValid: state.value.length > 0 };
    }
    return { value: '', isValid: false };
  };

  const usernameReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      setUsernameError('')
      return { value: action.val, isValid: action.val.length > 0 };
    }
    if (action.type === 'INPUT_BLUR') {
      if (!state.value.length > 0) {
        setUsernameError('Username should not be empty.')
      }
      return { value: state.value, isValid: state.value.length > 0 };
    }
    if(action.type === 'REGISTRATION_ERROR'){
      setUsernameError('Username already exists.')
      return { value: state.value, isValid: false };
    }
    return { value: '', isValid: false };
  };

  const numberReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      setNumberError('')
      return { value: action.val, isValid: action.val.trim().length === 10 };
    }
    if (action.type === 'INPUT_BLUR') {
      if (state.value.length !== 10) {
        setNumberError('Contact number should be of 10 digits.')
      }
      return { value: state.value, isValid: state.value.trim().length === 10 };
    }
    return { value: '', isValid: false };
  };

  const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      setEmailError('')
      return { value: action.val, isValid: action.val.includes('@') };
    }
    if (action.type === 'INPUT_BLUR') {
      if (!state.value.includes('@')) {
        setEmailError('Email must include @ symbol.')
      }
      return { value: state.value, isValid: state.value.includes('@') };
    }
    if(action.type === 'REGISTRATION_ERROR'){
      setEmailError('Email ID already exists.')
      return { value: state.value, isValid: false };
    }
 return { value: '', isValid: false };
  };

  const passwordReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      setPasswordError('')
      return { value: action.val, isValid: action.val.trim().length > 6 };
    }
    if (action.type === 'INPUT_BLUR') {
      if (!(state.value.trim().length > 6)) {
        setPasswordError('Password length should be greater than 6')
      }
      return { value: state.value, isValid: state.value.trim().length > 6 };
    }
    return { value: '', isValid: false };
  };

  const [firstNameState, dispatchFirstName] = useReducer(firstNameReducer, {
    value: '',
    isValid: null,
  });
  const [lastNameState, dispatchLastName] = useReducer(lastNameReducer, {
    value: '',
    isValid: null,
  });
  const [usernameState, dispatchUsername] = useReducer(usernameReducer, {
    value: '',
    isValid: null,
  });
  const [numberState, dispatchNumber] = useReducer(numberReducer, {
    value: '',
    isValid: null,
  });
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  const { isValid: firstNameIsValid } = firstNameState;
  const { isValid: lastNameIsValid } = lastNameState;
  const { isValid: usernameIsValid } = usernameState;
  const { isValid: numberIsValid } = numberState;
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(emailIsValid && passwordIsValid && numberIsValid
        && firstNameIsValid && lastNameIsValid && usernameIsValid);
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid, firstNameIsValid,
    lastNameIsValid, usernameIsValid, numberIsValid]);

  const firstNameChangeHandler = (event) => {
    dispatchFirstName({ type: 'USER_INPUT', val: event.target.value });
  };

  const lastNameChangeHandler = (event) => {
    dispatchLastName({ type: 'USER_INPUT', val: event.target.value });
  };

  const usernameChangeHandler = (event) => {
    dispatchUsername({ type: 'USER_INPUT', val: event.target.value });
  };

  const numberChangeHandler = (event) => {
    console.log(event)
    dispatchNumber({ type: 'USER_INPUT', val: event.target.value });
  };


  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
  };

  const validateFirstNameHandler = () => {
    dispatchFirstName({ type: 'INPUT_BLUR' });
  };

  const validateLastNameHandler = () => {
    dispatchLastName({ type: 'INPUT_BLUR' });
  };

  const validateUsernameHandler = () => {
    dispatchUsername({ type: 'INPUT_BLUR' });
  };

  const validateNumberHandler = () => {
    dispatchNumber({ type: 'INPUT_BLUR' });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      const userRegister = {
        firstName: firstNameState.value,
        lastName: lastNameState.value,
        username: usernameState.value,
        contactNumber: numberState.value,
        emailId: emailState.value,
        password: passwordState.value
      }
        UserService.registerUser(userRegister).then(response => {
        if(response.status === 200){
          const userLogin = {
            usernameOrEmail: emailState.value,
            password: passwordState.value
          }
          authCtx.onLogin(userLogin);
        }
      })
    .catch((err)=>{
      console.log(err.response.data)
      if(err.response.data.includes('username')){
        const registrationUsernameErrorHandler = ()=>{dispatchUsername({type:'REGISTRATION_ERROR'})}
        registrationUsernameErrorHandler()
      }
      if(err.response.data.includes('email')){
        const registrationEmailErrorHandler = ()=>{dispatchEmail({type:'REGISTRATION_ERROR'})};
        registrationEmailErrorHandler()
      }
    })
    } else {
      if (!firstNameIsValid) {
        validateFirstNameHandler()
      }
      if (!lastNameIsValid) {
        validateLastNameHandler()
      }
      if (!usernameIsValid) {
        validateUsernameHandler()
      }
      if (!numberIsValid) {
        validateNumberHandler()
      }
      if (!emailIsValid) {
        validateEmailHandler()
      }
      if (!passwordIsValid) {
        validatePasswordHandler()
      }
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="fistName"
          label="First Name"
          type="text"
          placeholder="Enter First Name"
          isValid={firstNameIsValid}
          value={firstNameState.value}
          onChange={firstNameChangeHandler}
          onBlur={validateFirstNameHandler}
        />
        <div className={classes.error}>{firstNameError}</div>
        <Input
          id="lastName"
          label="Last Name"
          type="text"
          placeholder="Enter Last Name"
          isValid={lastNameIsValid}
          value={lastNameState.value}
          onChange={lastNameChangeHandler}
          onBlur={validateLastNameHandler}
        />
        <div className={classes.error}>{lastNameError}</div>
        <Input
          id="username"
          label="Username"
          type="text"
          placeholder="Enter Username"
          isValid={usernameIsValid}
          value={usernameState.value}
          onChange={usernameChangeHandler}
          onBlur={validateUsernameHandler}
        />
        <div className={classes.error}>{usernameError}</div>
        <Input
          id="number"
          label="Number"
          type="number"
          placeholder="Enter Contact Number"
          isValid={numberIsValid}
          value={numberState.value}
          onChange={numberChangeHandler}
          onBlur={validateNumberHandler}
        />
        <div className={classes.error}>{numberError}</div>
        <Input
          id="email"
          label="E-Mail"
          type="email"
          placeholder="Enter Email ID"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <div className={classes.error}>{emailError}</div>
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter Password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.error}>{passwordError}</div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Register
          </Button>
          <Link to='/login'>
            <Button className={classes.btn}>
              Login
            </Button>
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default Register;
