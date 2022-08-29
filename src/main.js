import Vue from 'vue'
import App from '@/App'
import store from './store'

import TypeNav from '@/components/TypeNav'
import MyPagination from '@/components/Pagination'

import './plugins/swiper'   //加载swiper配置
import './plugins/element'  //element-ui相关插件
import './plugins/vaildate' //
import './mock/mockSever'   //mock 模拟接口
import * as API from '@/api'

import VueLazyload from 'vue-lazyload'
import loading from '@/assets/images/loading.gif'

import router from '@/router/index'

// import './rem'

// 在图片界面没有进入到可视范围前不加载,在没有得到图片前线显示loading图片
Vue.use(VueLazyload,{ // 内部自定义了一个指令lazy
    loading,        // 指定为假得到图片之前的loading图片
})





// 浏览器控制台不显示非生产环境打包提示
Vue.config.productionTip = false

// 注册全局组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(MyPagination.name,MyPagination)

// 1) 创建或指定事件总线对象，保存到Vue的原型上
// Vue.prototype.$bus = new Vue()

new Vue({
    beforeCreate(){
        // 1) 创建或指定事件总线对象，保存到Vue的原型上
        Vue.prototype.$bus = this

        // 将所有的接口函数挂载在 Vue原型上
        // 组件对象的原型 就是 Vue的原型
        Vue.prototype.$API = API     // 当不适用vuex的时候，可以吧接口请求函数全部装在对象当中关在Vue原型身上
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