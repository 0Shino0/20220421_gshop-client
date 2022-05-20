<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <table
          class="order-item"
          v-for="(order, index) in myOrderList"
          :key="order.id"
        >
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle"
                  >{{ order.createTime }} 订单编号：{{ order.outTradeNo }}
                  <span class="pull-right delete"
                    ><img src="./images/delete.png"
                  /></span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(orderDetail,index) in order.orderDetailList"
              :key="orderDetail.id"
            >
              <td width="60%">
                <div class="typographic">
                  <img
                    :src="orderDetail.imgUrl"
                    style="width: 80px; height: 100px"
                  />
                  <a href="#" class="block-text">{{ orderDetail.skuName }}</a>
                  <span>x1</span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>

              <!-- 注意处理第一个单元格以外，每行其他的单元格都要合并 -->
              <!--  template是 h5 新加的一个无意义的标签 
                template这个标签是html标签，它是没有任何语义的，它不会影响原有的html结构  -->
              <template v-if="index === 0">
                <td
                  :rowspan="order.orderDetailList.length"
                  width="8%"
                  class="center"
                >
                  {{ order.consignee }}
                </td>
                <td
                  :rowspan="order.orderDetailList.length"
                  width="13%"
                  class="center"
                >
                  <ul class="unstyled">
                    <li>总金额¥{{ order.totalAmount }}</li>
                    <li>
                      {{
                        order.paymentWay === "ONLINE" ? "在线支付" : "货到付款"
                      }}
                    </li>
                  </ul>
                </td>
                <td
                  :rowspan="order.orderDetailList.length"
                  width="8%"
                  class="center"
                >
                  <a href="#" class="btn">{{ order.orderStatusName }} </a>
                </td>
                <td
                  :rowspan="order.orderDetailList.length"
                  width="13%"
                  class="center"
                >
                  <ul class="unstyled">
                    <li>
                      <a href="mycomment.html" target="_blank">评价|晒单</a>
                    </li>
                  </ul>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="choose-order">

      <!-- 
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"

      :page-sizes="[100, 200, 300, 400]"
      :page-sizes="[5, 10, 15, 20]"

      
       -->

      <!-- layouts是用来调整布局顺序的    
      layout="prev, pager, next, jumper,->,sizes,total"
      -->
      <el-pagination
        background
        :current-page="page"
        :page-size="limit"
        :total="total"
        :pager-count="7"
        :page-sizes="[5, 10, 15, 20]"
        @current-change="getMyOrderInfo"
        @size-change="handleSizeChange"
        layout="prev, pager, next, jumper,->,sizes,total"
        >
      </el-pagination>

        <!-- <MyPagination 
        :currentPage="page"
        :total="total"
        :pageSize="limit"
        :showPageNo="5"
        @currentChange="getMyOrderInfo"
        ></MyPagination> -->
        <!-- @currentChange="currentChange" -->
        
        <!-- {
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
         }, -->
     
      </div>
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="./images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="./images/itemlike02.png" />
          </div>
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="./images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="./images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyOrder",
  data() {
    return {
      page: 1,
      limit: 3,
      myOrderList: [],
      total: 0,

      // myOrderInfo:{}
    };
  },
  mounted() {
    this.getMyOrderInfo();
  },
  methods: {
    // 默认page为1
    async getMyOrderInfo(page=1) {
      this.page = page
      // // page  和 limit 是一上来就要使用的请求参数，但是此时我们是没有的，要让我们自己给定
      const result = await this.$API.reqMyOrderInfo(this.page, this.limit);

      if (result.code === 200) {
        this.myOrderList = result.data.records;
        this.total = result.data.total;
      }
    },

    handleSizeChange(size){
      this.limit = size
      this.getMyOrderInfo()
    }
    // currentChange(page){
    //   // 更新页码
    //   this.page = page
    //   // 重新发送请求
    //   this.getMyOrderInfo()
    // }
  },
};
</script>

<style lang="less" scoped>
//右边
.order-right {
  float: right;
  width: 83.33%;

  //订单部分
  .order-content {
    margin: 0 20px;
    color: #666;

    //标题
    .title {
      margin-bottom: 22px;
      border: 1px solid #ddd;

      h3 {
        padding: 12px 10px;
        font-size: 15px;
        background-color: #f1f1f1;
      }
    }

    //表头
    .chosetype {
      margin-bottom: 15px;
      color: #666;

      table {
        border: 1px solid #e6e6e6;
        border-collapse: separate;
        border-radius: 2px;
        width: 100%;
        max-width: 100%;
        border-spacing: 0;

        th {
          padding: 6px 8px;
          color: #666;
          font-weight: 700;
          vertical-align: bottom;
          background-color: #f4f4f4;
          line-height: 18px;
          border-bottom: 1px solid #e6e6e6;
          font-size: 12px;
          text-align: left;
        }
      }
    }

    // 表单内容
    .orders {
      font-size: 12px;

      a {
        &:hover {
          color: #4cb9fc;
        }
      }

      table {
        border: 1px solid #e6e6e6;
        border-collapse: collapse;
        border-radius: 2px;
        width: 100%;
        margin-bottom: 18px;
        max-width: 100%;

        th {
          padding: 6px 8px;
          line-height: 18px;
          text-align: left;
          vertical-align: bottom;
          background-color: #f4f4f4;
          font-size: 12px;
          color: #666;

          .pull-right {
            float: right;
            cursor: pointer;

            img {
              margin-right: 10px;
              vertical-align: middle;
            }
          }
        }

        td {
          font-size: 12px;
          color: #666;
          padding: 6px 8px;
          line-height: 18px;
          text-align: left;
          vertical-align: middle;
          border: 1px solid #e6e6e6;

          &.center {
            text-align: center;
          }

          .typographic {
            img {
              float: left;
              margin-right: 10px;
            }

            a {
              float: left;
              min-width: 80px;
              max-width: 250px;
              color: #e1251b;

              &.service {
                color: #666;
              }
            }

            span {
              float: left;
              min-width: 80px;
              max-width: 250px;
              text-align: center;
            }
          }
        }
      }
    }

    // 分页
    .choose-order {
      .pagination {
        margin: 38px 0;

        ul {
          font-size: 0;
          display: inline-block;

          li {
            display: inline-block;
            padding: 4px 9px;
            font-size: 14px;
            border: 1px solid #e0e9ee;

            &.prev,
            &.next {
              background-color: #fafafa;
            }

            &.prev {
              border-right-color: #28a3ef;
            }

            &.page {
              border-color: #28a3ef;
              border-left: 0;

              &.actived {
                background-color: #28a3ef;

                a {
                  color: #fff;
                }
              }
            }
          }
        }

        div {
          display: inline-block;
          font-size: 14px;
          color: #333;
        }
      }
    }
  }

  // 猜你喜欢
  .like {
    border: 1px solid #ddd;
    margin: 15px 20px;

    .kt {
      border-bottom: 1px solid #ddd;
      background: #f1f1f1;
      color: #666;
      margin: 0;
      padding: 12px;
      font-size: 15px;
    }

    .like-list {
      padding: 15px 11px;
      overflow: hidden;

      .likeItem {
        width: 25%;
        float: left;

        .p-img {
          text-align: left;

          img {
            width: 167px;
            height: 123px;
          }
        }

        .attr {
          padding: 0 15px;
        }

        .price {
          padding: 0 15px;
          font-size: 16px;
          color: #c81623;
          margin-bottom: 20px;
        }

        .commit {
          padding: 0 15px;
        }
      }
    }
  }
}
</style>