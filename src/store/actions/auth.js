import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        userId: authData.localId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBMgkjL01T7lKrhT1GozPUgXTMpofc3tK4"
        if(!isSignUp){
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBMgkjL01T7lKrhT1GozPUgXTMpofc3tK4"
        }
        axios.post(url, authData)
        .then( res => {
            console.log(res);
            dispatch(authSuccess(res.data))
        })
        .catch( err => {
            console.log(err);
            dispatch(authFail(err))
        })
    };
};