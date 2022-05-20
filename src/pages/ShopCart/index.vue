<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(shopCart,index) in shopCartList" :key="shopCart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="shopCart.isChecked" @click="updateOne(shopCart)">
          </li>
          <li class="cart-list-con2">
            <img :src="shopCart.imgUrl">
            <div class="item-msg">{{shopCart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{shopCart.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeCartNum(shopCart,-1,true)">-</a>
            <input autocomplete="off" type="text" :value="shopCart.skuNum" minnum="1" class="itxt" @change="changeCartNum(shopCart,$event.target.value * 1,false)">
            <a href="javascript:void(0)" class="plus" @click="changeCartNum(shopCart,1,true)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{shopCart.cartPrice * shopCart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteOne(shopCart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isAllCheck">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAll()">删除选中的商品</a>
        <a href="javascript:;">移到我的关注</a>
        <a href="javascript:;">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{checkedNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{allMoney}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

  export default {
    name: 'ShopCart',

    mounted(){
      this.getCartList()
    },

    methods:{
      // 重新发送请求
      getCartList(){
        this.$store.dispatch('getCartList')
      },
      // 修改购物车中商品数量
      async changeCartNum(shopCart,disNum,flag){
        // 正对输入的数据是最终的商品熟练，我们得转化为变化的量
        if(!flag){
          // 输入正数表示用户 想要的数量
          if(disNum > 0){
            disNum = disNum - shopCart.skuNum
          }else{
            disNum = 1-shopCart.skuNum
          }
        }else{
          // 输入负数
            //针对点击+-的数据，传递过来的是变化的量
            if(disNum + shopCart.skuNum <= 0){
              disNum = 1 - shopCart.skuNum
            }
        }
        try {
          // 吧传递古来的数据全部转化为正确的变化的量之后就可以发起请求
          // 修改数据库数据
          await this.$store.dispatch('addOrUpdateCart',{skuId:shopCart.skuId,skuNum:disNum})
          alert('修改数量成功')
          // 重新发起请求
          this.getCartList()
        } catch (error) {
          alert(error.message)
        }

      },
      // 修改购物车中商品的选中状态
      async updateOne(shopCart){
        try {
          await this.$store.dispatch('updateCartChecked',{skuId:shopCart.skuId,isChecked:shopCart.isChecked?0:1})
          alert('修改状态成功')
          this.getCartList()
        } catch (error) {
          alert(error.message)
        }

      },
      // 删除购物车单个
      async deleteOne(shopCart){
        try {
          await this.$store.dispatch('deleteCart',shopCart.skuId)
          alert('删除成功')
          this.getCartList()          
        } catch (error) {
          alert(error.message)
        }
      },
      // 删除购物车多个
      deleteAll(){
        try {
          this.$store.dispatch('deleteCartAll')
          alert('删除多个成功')
          this.getCartList()
        } catch (error) {
          alert(error.message)
        }
      }

    },
    computed:{
      // mapState使用数组   必须名字相同    数据只能总的state当中的数据才能使用，模块化后不能使用
      ...mapState({
        // shopCartList:state => state.shopcart.shopCartList[0].cartInfoList
        /* 
        出现意外问题
        在购物车内刷新出现如下问题
        TypeError: Cannot read properties of undefined (reading 'cartInfoList')
        */
        shopCartList:state => state.shopcart.shopCartList
      }),
      /* 
      选择的数量
      */
      checkedNum(){
        return this.shopCartList.reduce((prev,item) => {
          if(item.isChecked){
            prev += 1
          }
          return prev
        },0)
      },
      /* 
      总共支付
      */
      allMoney(){
        return this.shopCartList.reduce((prev,item) => { 
          if(item.isChecked){
            prev += item.cartPrice * item.skuNum
          }
          return prev
         },0)
      },
      /* 
      判断全选   可读  可写
      */
      isAllCheck:{
        get(){
          return this.shopCartList.every(item => item.isChecked)
        },
        async set(val){
          // this.$store.dispatch('updateCartChecked',cal?1:0)    是调用updateCartCheckedAll异步函数
          // 它的结果拿的是异步函数的返回值   固定的那个promise，不是函数return后面Promise.all的返回值promise
          try {
            const result = await this.$store.dispatch('updateCartCheckedAll',val?1:0)
            alert('修改所有数据成功')
            this.getCartList()
          } catch (error) {
            alert(error.message)
          } 
        }
      },

    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>