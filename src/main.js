import Vue from 'vue'
import App from '@/App'
import store from './store'
import router from '@/router/index'
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'

import './plugins/swiper'   //加载swiper配置
import './mock/mockSever'

// 浏览器控制台不显示非生产环境打包提示
Vue.config.productionTip = false

// 注册全局组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagination.name,Pagination)

// 1) 创建或指定事件总线对象，保存到Vue的原型上
// Vue.prototype.$bus = new Vue()

new Vue({
    beforeCreate(){
        // 1) 创建或指定事件总线对象，保存到Vue的原型上
        Vue.prototype.$bus = this
    },

    render:h => h(App),
    router,     //注册路由器 ==> 所有组件都可以直接访问2个对象：$router 与 $route
    store       //注册vuex ===> 所哟跏你都可以直接访问1个对象：$store
}).$mount('#app')

// /* eslint-disable no-unused-vars */
// const a = 123


/* 
store 对象的功能：
读取数据：
    store.store.xxx
    store.getter.yyy

变更数据
    store.dispatch(action名称,data)
    store.dispatch(mutation名称,data)
*/