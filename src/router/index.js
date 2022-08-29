
import Vue from "vue";
import VueRouter from 'vue-router'
import routes from '@/router/routes'
import store from '@/store'

// 安装Vue插件
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch((err) => {
        if (VueRouter.isNavigationFailure(err)) {
            return err
        }
        return Promise.reject(err)
    })
}

// 向外暴露路由器对象
const router = new VueRouter({
    // 模式
    mode: 'history',    //不带#
    // 应用中的所有路由
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

// 处理loading错误
router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router.history.pending.fullPath;
    if(isChunkLoadFailed){
        router.replace(targetPath);
    }
})



// 全局前置导航守卫
// token校验
router.beforeEach(async (to, from,next) => {
    // 全局前置导航守卫
    // to 代表准备驱动地方的路由对象
    // from 从哪个地方来的路由对象
    // next 是一个函数
    // next() 代表无条件放行
    // next(false) 代表不放行，停在原地
    // next('/')    next({path:'/'})    代表最终让它去哪

    // token校验
    let token = store.state.user.token

    if(token){
        // 代表登录了或者之前登录过
        if(to.path === '/login'){
            // 登录鼓励，又想去登录页，直接跳转到首页
            next('/')
        }else{
            // !! 转化为bool值
            let hasuserInfo = !!store.state.user.userInfo.nickName
            
            if(hasuserInfo){
                // 此时 代表登录了 ， 去的不是登录页，用户信息存在，直接无条件放行
                next()
            }else{
                                
                // 此时代表登录了，去的不是登录页，用户信息不存在   那我们要根据token发请求获取用户真实信息
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // 出现错误 跳转到login页面，并清楚用户信息
                    alert('用户的token过期')
                    // 清空用户信息
                    store.dispatch('resetUserInfo')
                    // 去到之前想去但是没有去成的地方，需要和登录逻辑去配合使用  
                    next('/login?redirect='+to.path)
                }
            }
        }
    }else{
        // 代表用户没登录或者之前也没有登录过
        
        // 后期我们需要判断用户是不是订单相关的页面，如果是娜美就先登录


        next()
    }
})

export default router