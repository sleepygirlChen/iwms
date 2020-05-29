<template>
  <div id="app" class="app">
    <router-view />
  </div>
</template>

<script>
  import * as fn from './utils/tool.js'
  export default {
    name: 'app',
    data() {
      return {}
    },
    created() {
      let isLogin = localStorage.getItem('isLogin')
      let userInfo = fn.decodeInfo(localStorage.getItem('userInfo')) || {}
      isLogin == null || isLogin == undefined
        ?
        localStorage.setItem('isLogin', 0)
        :
        this.$store.commit('changeState', { isLogin, userInfo })
    },
    mounted() { }
  }
</script>

<style lang="less">
  html,
  body,
  .app {
    height: 100%;
    min-width: 800px;
    user-select: none;
  }

  body,
  p {
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  .auto-img {
    display: block;
    width: 100%;
  }

  .ellipsis {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>