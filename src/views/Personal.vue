<template>
  <div class="personal">
    <NavTop />
    <div class="main">
      <el-row class="content-el-row">
        <el-col :xs="4" :sm="4" :lg="3" class="content-col side-nav">
          <el-menu :default-active="activeIndex" class="aside-menu" mode="vertical" @select="handleSelect"
            background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item :index="String(index+1)" :ref="index+1" :name="item.name" v-for="(item, index) in asideNav"
              :key="index">
              <i :class="item.icon"></i>
              <span>{{item.info}}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :xs="20" :sm="20" :lg="21" class="content-col main-conetent">
          <router-view />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import NavTop from "../components/Nav";
  import { mapState } from "vuex";
  export default {
    name: "personal",
    data() {
      return {
        asideNav: [
          {
            icon: "el-icon-coordinate",
            info: "个人信息",
            name: "person_info"
          }
        ],
        // aside-nav-active-index
        activeIndex: "1"
      };
    },
    components: {
      NavTop
    },
    computed: {
      ...mapState(["userInfo"])
    },
    mounted() {
      this.axios.get(`/users/${this.userInfo.uuid}?uuid=${this.userInfo.uuid}&username=${this.userInfo.username}`)
        .then(res => {
          if (res.data.body.role === "SYS_ROLE") {
            this.asideNav.splice(1, 1, {
              icon: "el-icon-s-operation",
              info: "用户管理",
              name: "person_device"
            });
          }
        });
    },
    created() {
      // 纠正侧边菜单栏index对应路由配置显示问题
      let currentRoute = this.$route.name;
      for (let i = 0; i < this.asideNav.length; i++) {
        if (this.asideNav[i].name === currentRoute) {
          this.activeIndex = String(i + 1);
          break;
        }
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        // // // consolelog('select')
        this.$router.push({ name: this.asideNav[key - 1].name });
      }
    }
  };
</script>

<style lang="less" scoped>
  .personal {
    height: 100%;
    background-color: #e9f0f8;
    letter-spacing: 1px;

    .main {
      height: calc(~"100% - 80px");

      .content-el-row {
        height: 100%;
        display: flex;
        overflow: hidden;

        .content-col {
          height: 100%;
          overflow-y: auto;

          ul {
            height: 100%;

            .icon {
              display: block;
            }
          }
        }

        .main-conetent {
          background-color: #fff;
        }
      }

      .aside-menu {
        .other {
          color: #9a9a9a;
          text-align: center;
          text-align: left;
          padding-left: 15px;
          width: 135px;
          height: 120px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }
    }
  }
</style>