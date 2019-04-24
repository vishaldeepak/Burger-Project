import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        userId: authData.localId
    };
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("expirationDate")
    localStorage.removeItem("userId")
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const checkAuthTimeout = (timeout) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, timeout * 1000);
    }
}

const setLocalStorage = (token, timeout, userId) => {
    const timeoutDate = new Date(new Date().getTime() + timeout * 1000)
    localStorage.setItem("token", token)
    localStorage.setItem("expirationDate", timeoutDate)
    localStorage.setItem("userId", userId)
}

export const setAuthInitial = () => {
    return dispatch => {
        const token = localStorage.getItem("token")
        if(!token){
            dispatch(logout())
        }else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"))
            if(expirationDate > new Date()){
                const localId = localStorage.getItem("")
                const expTime = (expirationDate.getTime() - new Date().getTime() / 1000)
                dispatch(authSuccess({idToken: token, localId: localId}))
                dispatch(checkAuthTimeout(expTime))
            }else{
                dispatch(logout())
            }
        }
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.REACT_APP_API_KEY}`
        if(!isSignUp){
            url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.REACT_APP_API_KEY}`
        }
        axios.post(url, authData)
        .then( res => {
            setLocalStorage(res.data.idToken, res.data.expiresIn, res.data.localId)
            dispatch(authSuccess(res.data))
            dispatch(checkAuthTimeout(res.data.expiresIn))
        })
        .catch( err => {
            dispatch(authFail(err.response.data.error))
        })
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT,
        path: path
    }
}