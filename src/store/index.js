/* 
vuex最核心的管理对象store   ===>    仓库
*/

import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

// import home from './modules/home'
// import users from '@/store/modules/users'

Vue.use(Vuex)


// const mutations = {
//     xxx(state){     //state是总的状态

//     }
// }

// const actions = {
//     yyy({commit}){

//     }
// }

// const getters = {
//     zzz (state){

//     }
// }

// 向外暴露store对象
export default new Vuex.Store({
    // mutations,
    // actions,
    // getters,
    modules
    // modules:{
    //     home,
    //     users
    // }
})


/* 
vuex多模块编程的总状态结构：
    {
        home:{
            categoryList:[]
        },
        user:{
            userInfo:{},        //用户信息对象
        },
    }
*/
