
// 这个函数式让用户获取到唯一标识
// 第一步：先从localStorage当中去获取，如果没有
// 第二步：在调用uuid创建新的，并且还要存储到localStorage
import { v4 as uuidv4 } from 'uuid';

let TOKEN_KEY = 'TOKEN_KEY'

function getUserTempId(){
    let userTempId = localStorage.getItem('USERTEMPID_KEY')    

    if(!userTempId){
        userTempId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        // 将临时id存储到 本地localStorage
        localStorage.setItem('USERTEMPID_KEY',userTempId)
    }
    return userTempId
}

function setToken(token){
    localStorage.setItem(TOKEN_KEY,token)
}

function getToken(){
    return localStorage.getItem(TOKEN_KEY)
}

function removeToken(){
    localStorage.removeItem(TOKEN_KEY)
}



export {
    getUserTempId,
    setToken,
    getToken,
    removeToken

}