<template>
    <div class="pagination">
        <button>1</button>
        <button class="disable">...</button>
        <button>3</button>
        <button>4</button>
        <button class="active">5</button>
        <button>6</button>
        <button>7</button>

        <button class="disable">...</button>
        <button>下一页</button>
        <button class="disable">共 35 条</button>
    </div>
</template>

<script>
   export default {
     name:'Pagination',
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

      &.disable{
          cursor: not-allowed;
      }
    }
  }
</style>