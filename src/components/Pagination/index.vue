<template>
    <div class="pagination">
        <button :disabled="myCurrentPage===1" :class="{disable:myCurrentPage===1}" @click="setCurrentPage(myCurrentPage-1)">上一页</button>
        <button v-if="startEnd.start!=1" @click="setCurrentPage(1)">1</button>
        <button class="disable" v-if="startEnd.start>2">...</button>
        <!-- 
        多执行了从start-1的v-for遍历和v-if的的判断
        v-for与v-if同时使用的问题：
            问题：效率低，多执行了一些v-if的解析判断
            解决：
                情况一：如果v-if的判断是更具数组每一项来判断 ===> 解决办法就是定义计算提前对数组进行过滤处理
                情况二：如果v-if的判断是更具数据判断的 ==> 解决办法就是在外边加一层标签并在他上用v-if ==> 只执行一次v-if判断

        <button
        v-for="item in startEnd.end" v-if="item>=startEnd.start"
        :class="{active:item===myCurrentPage}" @click="setCurrentPage(item)">{{item}}</button>
         -->
         <button
        v-for="item in startEndArr" :key="item"
        :class="{active:item===myCurrentPage}" @click="setCurrentPage(item)">{{item}}</button>
        <!-- <button>4</button>
        <button class="active">5</button>
        <button>6</button>
        <button>7</button> -->
        <button class="disable" v-if="startEnd.end<totalPages">...</button>
        <button v-if="startEnd.end<totalPages" @click="setCurrentPage(totalPages)">{{totalPages}}</button>
        <button :disabled="myCurrentPage===totalPages" :class="{disable:myCurrentPage===totalPages}" @click="setCurrentPage(myCurrentPage+1)">下一页</button>
        <button class="disable">共 {{total}} 条</button>
    </div>
</template>

<script>
   export default {
     name:'MyPagination',
        props:{
         currentPage:{
             type:Number,
             default:1
         },
         total:{
             type:Number,
             default:0
         },
         pageSize:{
             type:Number,
             default:10
         },
         showPageNo:{
             type:Number,
             default:5,
            //  要求传的值要是奇数
            validator:function(value){
                return value%2 === 1
            }
         },
     },

     data(){
         return {
             myCurrentPage:this.currentPage,  //初始值由父组件来指定
         }
     },

     computed:{
         /* 
         总页数
         */
        totalPages(){
            const {total,pageSize} = this
            return Math.ceil(total/pageSize)
        },

        /* 
        包含从start到end的数组
        */
        startEndArr(){
            const arr = []
            const {start,end} = this.startEnd
            for(let page=start;page<=end;page++){
                arr.push(page)
            }
            return arr
        },

        /* 
        start/end:连续页码数的开始页码与结束页码    {start:3,end:7}
        */
        startEnd(){
            let start,end
            const {myCurrentPage,showPageNo,totalPages} = this

            // 计算start
            /* 
            举例子

            myCurrentPage,showPageNo,totalPages
            4               5           8       23[4]56
            start = 4-2
            */
            //   start = myCurrentPage - (showPageNo-1)/2
            start = myCurrentPage - Math.floor(showPageNo/2)
            // 如果myCurrentPage比较小，计算的结果可能小于1   start>=1
            /* 
            myCurrentPage,showPageNo,totalPages
            4               5           8       [1]2345
            */
            if(start<1){
                start = 1
            }

            // 计算end
            /* 
            myCurrentPage,showPageNo,totalPages
            4               5           8       23[4]56
            start = 2
            end = 2 + 5 - 1
            */
            end = start + showPageNo - 1
            // end的最大值为totalPages
            /* 
            myCurrentPage,showPageNo,totalPages
            8               5           8       45[6]78
            start = 6   ==> 4
            end = 10 ==> 超过了totalPages  8
            */
            if(end>totalPages){
                // 修改end 为 totalPages
                end = totalPages
                // 修正start    
                start = end - showPageNo +1
                // 一旦总页数小于最大连续页码数 ==>  start<1
                /* 
                myCurrentPage,showPageNo,totalPages
                5               5           4       12[3]4
                end = 4
                start = 0    ===> 1
                */
                if(start<1){
                    start = 1
                }
            }
            return {start,end}
        }
     },

     watch:{
         /* 
         子组件监视父组件传入的数据变化
         */
        currentPage(value){
            this.myCurrentPage = value 
        },
     },

     methods:{
         /* 
         设置新的当前页码
         */
        setCurrentPage(page){
            // 如果页码没有变化，直接结束
            if(this.currentPage === page) return 

            // 更新页码
            this.myCurrentPage = page
            // 分发自定义事件通知父组件
            this.$emit('currentChange',page)
        }
     },
   }
</script>

<style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      //   & 表示嵌套的上一级
      // 这是sass的语法，代表上一级选择器
      &.active{
          background: blue;
          color: white;
          cursor: not-allowed;
      }

      &.disable {
        color: #c0c4cc;
        cursor: not-allowed;
      }
    }
  }
</style>