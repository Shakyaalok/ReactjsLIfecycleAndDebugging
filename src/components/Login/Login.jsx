import React, { useState,useEffect,useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state,action) =>{
  if(action.type==="USER_INPUT"){
    return {value:action.val, isValid:action.val.includes('@')};
  }
  if(action.type==='INPUT_BLUR'){
    return {value:state.value,isValid:state.value.includes('@')};
  }
  return {value:'', isValid:false};
}

const Login = (props) => {
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredCollege,setEnteredCollege]  = useState('')
  const [collegeIsValid, setCollegeIsValid] = useState();
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,dispactedEmail] = useReducer(emailReducer,{
    value:'',
    isValid:false
   })

/*
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
*/

  const emailChangeHandler = (event) => {
    dispactedEmail({type:'USER_INPUT',val:event.target.value})
    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length>3
    );
   
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6 && enteredCollege.trim().length>3
    );
  };

  const collegeChangeHandler = (event)=>{
    setEnteredCollege(event.target.value);
    setFormIsValid(
      emailState.isValid && enteredPassword.trim().length > 6 && event.target.value.trim().length>3
    );
  }

  const validateEmailHandler = () => {
    dispactedEmail({type:'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const validateCollegeHandler = () =>{
    setCollegeIsValid(enteredCollege.trim().length > 3);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
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
            onBlur={validateCollegeHandler}
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
