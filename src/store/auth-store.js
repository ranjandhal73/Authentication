import {createContext, useState} from 'react'

export const AuthContext = createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
})


const AuthContextProvider = ({children}) =>{
    const initialToken = localStorage.getItem('user')
    const [token, setToken] = useState(initialToken)

    const userIsLoggedIn = !!token

    const loginHandler = (token) =>{
        setToken(token)
        localStorage.setItem('user', JSON.stringify(token))
    }

    const logoutHandler = () =>{
        setToken(null)
        localStorage.removeItem('user')
    }
    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;