import classes from './ProfileForm.module.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../store/auth-store';

const ProfileForm = () => {
  const [updatePassword, setUpdatePassword] = useState('')
 const {token} = useContext(AuthContext)

 const changePasswordHandler = (e) => {
    e.preventDefault();
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDt4C81D9NsgYpcCc2T6EZLMqsXfiQ0gO4',{
      method: 'POST',
      body: JSON.stringify({
        idToken: token,
        password: updatePassword,
        returnSecureToken: true
      })
    }).then(res => res.json())
    .then((data)=>{
      console.log(data);
      alert("Password Changed Successfully...");
    }).catch(err => console.log(err));
 }
  return (
    <form onSubmit={changePasswordHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input 
          type='password' 
          id='new-password'
          value={updatePassword}
          onChange={(e)=>setUpdatePassword(e.target.value)}
        />
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
