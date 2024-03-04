import React, { useState,useRef } from 'react';

import Button from '../../UI/Button/Button';
import './CourseInput.css';

const CourseInput = props => {
  // const [enteredValue, setEnteredValue] = useState('');
  const [isValid,setIsValid] = useState(true)

  const enterdRef = useRef();

  const goalInputChangeHandler = event => {
    if(enterdRef.current.value.trim().length>0){
      setIsValid(true);
    }
    
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    console.log(enterdRef)
    if(enterdRef.current.value.trim().length===0){
      setIsValid(false);
      return;
    }
    props.onAddGoal(enterdRef.current.value);
    enterdRef.current.value='';
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={`form-control ${!isValid ? 'invalid':''}`}>
        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler} ref={enterdRef}/>
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
