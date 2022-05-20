import { 
    reqTradeInfo,
    reqAddress
} from "../../api"

const state = {
    tradeInfo:{},
    userAddressList:[]
}

const mutations = {
    RECEIVE_TRADEINFO(state,tradeInfo){
        state.tradeInfo = tradeInfo
    },
    RECEIVE_ADDRESS_LIST(state, userAddressList) {
        state.userAddressList = userAddressList
    },
}
const actions = {
    async getTradeInfo({commit}){
        const result = await reqTradeInfo()
        if(result.code === 200){
            commit('RECEIVE_TRADEINFO',result.data)
        }
    },
    async getAddress({ commit }) {
        //调用异步ajax请求(调用接口请求函数)
        const result = await reqAddress()

        // 如果请求成功了，得到带护具提交给mutation
        if (result.code === 200) {
            commit('RECEIVE_ADDRESS_LIST', result.data)
        }
    }
}
const getters = {
    detailArrayList(state){
        return state.tradeInfo.detailArrayList || []
    },
    userAddressList(state){
        return state.tradeInfo.userAddressList || []
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}