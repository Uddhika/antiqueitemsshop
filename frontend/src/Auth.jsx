import cookie from 'js-cookie';
import axios from 'axios';

export const setCookie = (key, value) => {
    cookie.set(key, value, {expires: 1});
}

export const getCookie = (key) => {
    return cookie.get(key);
}

export const removeCookie = (key) => {
    cookie.remove(key);
}

export const setAuthentication = (token) => {
    setCookie("token", token);
}

export const isLogin = async () => {
    const token = getCookie("token");
    // console.log(token);
    const tokenwrap = {
        token
    }
    if(token){
        const result = await axios.post("http://localhost:5555/users/checklogin", tokenwrap);
        // console.log(result.data)
        return result.data;
    }
    else{
        return false;
    }
}

export const logOut = (key) => {
    removeCookie("token");
}