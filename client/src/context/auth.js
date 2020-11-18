import React, { createContext } from 'react';
import { useReducer } from 'react';
import jwtDecode from 'jwt-decode';

let initialState = { user: null }

if(localStorage.getItem('jwtToken')){
    const token = localStorage.getItem('jwtToken');
    const decoded = jwtDecode(token);

    console.log(decoded);
    if(decoded * 1000 < ( Date.now() - (4 * 60 * 60 * 1000) )) {
        localStorage.removeItem('jwtToken');
    }
    else {
        initialState = { user: decoded };
    }
}

const AuthContext = createContext({
    user: null,
    login: (data) => {},
    logout: () => {}
})


const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN': 
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default: 
            return state;
    }
}

const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (data) => {
        localStorage.setItem('jwtToken', data.token);
        dispatch({
            type: 'LOGIN',
            payload: data
        });
    }

    const logout = () => {
        localStorage.removeItem('jwtToken');
        dispatch({ type: 'LOGOUT' });
    } 

    return <AuthContext.Provider value={{ user: state.user, login, logout}}
    {...props}/>
}


export {AuthProvider, AuthContext}