import {reqAddOrUpdateCart,
    reqCartList,
    reqUpdateCartChecked,
} from '@/api'
import {reqDeleteCart} from '@/api'


const state = {
    shopCartList:[]
}

const mutations = {
    RECEVESHOPCARTLIST(state,shopCartList){
        state.shopCartList = shopCartList
    },

}

const actions = {
    // 传入参数的同时，解构skuId，skuNum  
    async addOrUpdateCart({commit},{skuId,skuNum}){
        const result = await reqAddOrUpdateCart(skuId,skuNum)
        // 如果和一下写法一样，那么这个异步函数返回的promise只有成功
        // if(result.code === 200){
        //     return 'ok'
        // }else{
        //     return 'failed'
        // }
        
        // 下面的写法会让这个promise 有成功也有失败
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    // 重新获取数据
    async getCartList({commit}){
        const result = await reqCartList()
        if(result.code === 200){
            commit('RECEVESHOPCARTLIST',result.data[0].cartInfoList)
        }
    },
    // 修改单个选中状态
    async updateCartChecked({commit},{skuId,isChecked}){
        const result = await reqUpdateCartChecked(skuId,isChecked)

        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error("failed"))
        }
    },
    // 修改所有选中状态
    async updateCartCheckedAll({commit,dispatch,state},isChecked){
        let promises = []
        state.shopCartList.forEach(item => {
            if(item.isChecked === isChecked) return

            let promise = dispatch('updateCartChecked',{skuId:item.skuId,isChecked})
            promises.push(promise)
        })
        // Promise.all 死一个方法（函数）
        // 参数：一个promise对象的数组
        // 返回值：一个新的pormise对象
        // 新的promise对象的状态是成功还是失败:
                    // 如果promise对象的数组当中你有一个失败，失败的原因亅第一个失败的promise的原因
                    // 如果promise对象的数组当中没有失败，那么状态就是成功，成功的结果是所有的promise成功的结果组成的结果
        // 成功结果
        // 失败原因

        return Promise.all(promises)
    },
    // 删除购物车中单个商品
    async deleteCart({commit},skuId){
        const result = await reqDeleteCart(skuId)

        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    // 删除购物车中选中的商品
    async deleteCartAll({commit,dispatch,state}){
        let promises = []
        state.shopCartList.forEach(item => {
            if(!item.isChecked) return

            let promise = dispatch('deleteCart',item.skuId)
            promises.push(promise)
        })
        return Promise.all(promises)
    },

}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}