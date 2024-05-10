import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) =>{
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const userData = {email,password}

    setIsLoading(true)
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDt4C81D9NsgYpcCc2T6EZLMqsXfiQ0gO4',{
      method: 'POST',
      body: JSON.stringify({userData,returnSecureToken:true}),
      headers: {
        'Content-type': 'application/json',
      }
    })
    .then((res) => {
      setIsLoading(false)
      if(res.ok){
        
      }else{
        return res.json().then(data => alert(JSON.stringify(data)))
      }
    })
    .catch((err) =>{
      // setIsLoading(true);
      console.error('Error:',err)
    })
    emailInputRef.current.value = '';
    passwordInputRef.current.value = '';
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input 
            type='email' 
            id='email' 
            ref={emailInputRef}
            required 
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>

          {isLoading ? (
            <div>Submitting...</div>
          ) : (
            <button> {isLogin ? 'Login' : 'Sign Up'}</button>
          )}
      
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
