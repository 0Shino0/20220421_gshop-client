<template>
  <div class="spec-preview">
    <img :src="defaultImg.imgUrl" />
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <img :src="defaultImg.imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['imgList'],
    data(){
      return {
        defaultIndex:0    //显示图片的默认下标s
      }
    },

    mounted(){
      this.$bus.$on('syncDefaultIndex',this.syncDefaultIndex)
    },

    computed:{
      defaultImg(){
        // 1、解决家报错  不能在上面直接写   imgList[defaultIndex].imgUrl
        return this.imgList[this.defaultIndex] || {}
      }
    },
    methods:{
      syncDefaultIndex(index){
        this.defaultIndex = index
      },
      move(event){
        // 添加移动事件。代表鼠标移动

        // 获取鼠标位置
        let mouseX = event.offsetX
        let mouseY = event.offsetY



        // 2、计算遮罩的位置让遮罩动
        let mask = this.$refs.mask        // 蒙版
        let maskX = mouseX - mask.offsetWidth/2
        let maskY = mouseY - mask.offsetHeight/2
        let big = this.$refs.big

        // 限定临界值
        if(maskX < 0){
          maskX = 0
        }else if(maskX > mask.offsetWidth){
          maskX = mask.offsetWidth
        }
        if(maskY < 0){
          maskY = 0
        }else if(maskY > mask.offsetHeight){
          maskY = mask.offsetHeight
        }

        mask.style.left = maskX +'px'
        mask.style.top = maskY +'px'

        // 3、大图动        大图向着鼠标相反方向移动两倍
        big.style.left = -maskX * 2 + 'px'
        big.style.top = -maskY * 2 + 'px'
        

      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>