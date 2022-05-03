<template>
    <div>
        <Header></Header>
        <!-- 所有的以及路由都在此显示 -->
        <router-view></router-view>
        
        <Footer v-show="!$route.meta.isHideFooter"></Footer>
    </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
// import {getCategoryList} from './api'


   export default {
     name:'App',
     mounted(){
       //异步获取三级分类列表
      //  getCategoryList().then(result => {
      //    console.log('result',result);
      //  })

      // 分发请求获取分类列表的异步action
      this.$store.dispatch('getCategoryList')
      this.$store.dispatch('getBannerList')
     },
     components:{
       Header,
       Footer
     }

   }
</script>

<style lang="less" scoped>
    
</style>