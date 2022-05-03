<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="hideFirst" @mouseenter="showFirst">
        <h2 class="all">全部商品分类</h2>
        <transition name="slide">
          <div class="sort" v-show="isShowFirst">
            <div class="all-sort-list2" @click="toSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ active: currentIndex === index }"
                @mouseenter="showSubList(index)"
              >
                <h3>
                  <a
                    href="javascript:"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- <a href="javascript:" @click="$router.push(`search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`)">{{c1.categoryName}}</a> -->
                  <!-- <router-link :to="`search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`">{{c1.categoryName}}</router-link> -->
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a
                          href="javascript:"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                        <!-- <router-link :to="`search?categoryName=${c2.categoryName}&category2Id=${c2.categoryId}`">{{c2.categoryName}}</router-link> -->
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            href="javascript:"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                          <!-- <router-link :to="`search?categoryName=${c3.categoryName}&category3Id=${c3.categoryId}`">{{c3.categoryName}}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>


<script>
/* 
1.dispatch()触发发请求的异步action调用  ===>   数据从后台接口请求到vuex的state中
2.store.state  /  mapState()读取vuex的state数据   ===>  数据从state到组件的computed
3.在模板中动态显示

*/
import { mapState } from "vuex";
// import _ from 'lodash'   //打包整个库    4M
import throttle from 'lodash/throttle'  //只引入需要的模块  ==> 减小打包文件    2.7M

export default {
  name: "TypeNav",

  data() {
    console.log('data()');
    const path = this.$route.path
    return {
      // isShowFirst:false,  //是否显示以及列表
      isShowFirst:path === '/',
      currentIndex: -2, //需要显示子列表的分类项下标
    };
  },

  beforeCreate(){
    console.log('beforeCreate()');
  },

  // created(){
  //   // 判断当前请求的是否是首页,如果是显示一级列表
  //   const path = this.$route.path
  //   if(path == '/'){
  //     this.isShowFirst = true
  //   }
// },

  mounted(){  //在初始显示之后更新数据 ===> 导致界面多更新一次
    // // 判断当前请求的是否是首页,如果是显示一级列表
    // const path = this.$route.path
    // if(path == './'){
    //   this.isShowFirst = true
    // }
  },

  computed: {
    // categoryList(){
    //   return this.$store.state.home.categoryList
    // }
    // ...mapState(['categoryList'])   //对于多模块不行

    ...mapState({
      categoryList: (state) => state.home.categoryList, //函数接收的是总状态,返回值作为计算属性值
    }),
  },

  methods: {

    /* 
    隐藏一级列表
    */
    hideFirst(){
      // 标识当前已经离开包含分类div了
      this.currentIndex=-2
      // 如果当前不是首页，隐藏一级列表
      if(this.$route.path !== '/'){
        this.isShowFirst = false
      }
    },

    /* 显示一级列表 */
    showFirst(){
      // 标识当前已经进入包含分类div了
      this.currentIndex = -1
      //保证显示一级列表
      this.isShowFirst = true
    },

    /* 
    显示指定下标的子分类列表
    */
    // showSubList:_.throttle((index) => {  //不可以，原因在于箭头函数没有自己的this，且不能通过bind来指定特定的this
    showSubList:throttle(function(index) {  //这个事件监听回调函数调用的频率太高
      console.log('throttle',index);
      // 只有当还没有离开整个分类的div是才更新下标
      if(this.currentIndex !== -2)
        this.currentIndex = index;

    },60,/* {
      trailing:'false'  //最后一次事件不延迟处理
    } */),

    /* 
    跳转到搜索
    */
    toSearch(event) {
      const target = event.target;
      console.dir(target);
      const { categoryname, category1id, category2id, category3id } =
        target.dataset;

      // if(target.tagName.toUpperCase() === 'A'){
      if (categoryname) {
        //准备query参数
        // categoryName=图书、影像、电子书刊&category1Id=1
        const query = {
          categoryName: categoryname,
        };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }

        // 准备一个用跳转的对象
        const location = {
          name:'search',
          query,
          params:this.$route.params  //需要携带上当前已有params参数
        }

        // 跳转到search
        /* 
        从其他到搜索页：push()
        从搜索到搜索页：replace()
        */
       if(this.$route.name === "search"){ //当前是搜索
          this.$router.replace(location)
       }else{
         this.$router.push(location);
       }

        // 隐藏一级列表
        this.hideFirst()
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      /* 指定过渡的样式 */
      &.slide-enter-active,&.slide-leave-active{
        transition:all .3s
      }

      /* 指定隐藏时的样式 */
      &.slide-enter,&.slide-leave-to{
        opacity: 0;
        height: 0;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.active {
            background: #ccc;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>