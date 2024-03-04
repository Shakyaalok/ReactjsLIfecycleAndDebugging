import React, { useState,useEffect} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredCollege,setEnteredCollege]  = useState('')
  const [collegeIsValid, setCollegeIsValid] = useState();
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


  useEffect(()=>{
  const identifier =  setTimeout(()=>{
    console.log('checking form validity!')
    setFormIsValid(
      enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length>3
    );
   },500)

   return ()=>{
    console.log('CLEANUP!');
    clearTimeout(identifier)
   }
  },[enteredEmail,enteredPassword,enteredCollege])  // we re-render our componenet when email and password changes
  // but still there is a problem like useEffect calls repeatedly for every key strokes we can do such that useTImers

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

   
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const collegeChangeHandler = (event)=>{
    setEnteredCollege(event.target.value)
  }

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College Name</label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
