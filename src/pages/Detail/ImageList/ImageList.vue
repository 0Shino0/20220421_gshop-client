<template>

  <swiper :options="swiperOptions">
      <swiper-slide class="swiper-slide" v-for="(img, index) in imgList" :key="img.id">
          <img :src="img.imgUrl" :class="{active:index === defaulIndex}" @click="changeDefaultIndex(index)">
      </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>

  <!-- <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img, index) in imgList" :key="img.id">
        <img :src="img.imgUrl" :class="{active:index === defaulIndex}" @click="changeDefaultIndex(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div> -->
</template>

<script>

  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    props:['imgList'],

    data(){
      return{
        defaulIndex:0,  //  默认有橙色框框的图片下标

        swiperOptions:{
          // direction: 'horizontal', // 垂直切换选项
          // loop: true, // 循环模式选项
          // autoplay:{  //自动轮播
          //   delay:4000,
          //   disableOnInteraction:false    //用户操作后是佛停止自动播放
          // },

          // 如果需要分页器
          // pagination: {
          //   el: '.swiper-pagination',
          // },

           slidesPerView: 4,
           slidesPerGroup:3,

          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next', 
            prevEl: '.swiper-button-prev',
          },
        }
      }  
    },
 
    methods:{
      changeDefaultIndex(index){
        this.defaulIndex = index

        // 通过全局事件总线把选中的index传递给zoom
        this.$bus.$emit('syncDefaultIndex',index)
      },
    }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        // &:hover {
        //   border: 2px solid #f60;
        //   padding: 1px;
        // }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>