import { Link } from 'react-router-dom';
import { useContext } from 'react';
import classes from './MainNavigation.module.css';
import { AuthContext } from '../../store/auth-store';

const MainNavigation = () => {
  const {isLoggedIn,logout, token} = useContext(AuthContext);
  console.log(token);
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <div>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            {isLoggedIn && 
              <li>
              <button onClick={()=>logout(token)}>Logout</button>
            </li>
            }
              
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
