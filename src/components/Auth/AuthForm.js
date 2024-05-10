import { useState, useRef, useContext } from 'react';
import classes from './AuthForm.module.css';
import { AuthContext } from '../../store/auth-store';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {login} = useContext(AuthContext)

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) =>{
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if(isLogin){
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDt4C81D9NsgYpcCc2T6EZLMqsXfiQ0gO4'
    }else{
      url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDt4C81D9NsgYpcCc2T6EZLMqsXfiQ0gO4'
    }
    fetch(url,{
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken:true
      }),
      headers: {
        'Content-type': 'application/json',
      }
    })
    .then((res) => {
      setIsLoading(false)
      if(res.ok){
        return res.json();
      }else{
        return res.json()
        .then(data => {
          throw new Error(JSON.stringify(data.error.message))
        })
      }
    }).then((data)=>{
      alert("Login Successfully")
      console.log(data.email);
      login(data.idToken)
    }).catch((err) =>{
      alert(err.message)
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
