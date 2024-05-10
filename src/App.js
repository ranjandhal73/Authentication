import { Switch, Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { AuthContext } from './store/auth-store';

function App() {
  const {isLoggedIn, token} = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!isLoggedIn &&  
         <Route path='/auth'>
         <AuthPage />
          </Route>
        }
        {isLoggedIn &&
        <Route path='/profile'>
          <UserProfile />
        </Route>
        }
        {
          setTimeout(() => {
            if(token){
                localStorage.removeItem('user');
            }
        }, 4000) &&
        <Route path='/auth'> <AuthPage /> </Route>
        }
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
