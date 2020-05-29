<template>
  <div class="index">
    <NavTop />
    <div class="content">
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

  export default {
    name: "home",
    data() {
      return {
        asideNav: [
          {
            icon: "el-icon-coordinate",
            info: "环境管理",
            name: "environment"
          },
          {
            icon: "el-icon-date",
            info: "硬件管理",
            name: "commodity"
          },
          {
            icon: "el-icon-view",
            info: "仓储监控",
            name: "monitor"
          }
        ],
        // aside-nav-active-index
        activeIndex: "1"
      };
    },

    components: {
      NavTop
    },

    created() {
      this.getIndexRight()
    },

    methods: {
      handleSelect(key, keyPath) {
        this.$router.push({ name: this.asideNav[key - 1].name });
      },
      getIndexRight() {
        // 更正侧边导航对应main-content
        let currentRoute = this.$route.name;
        // // // consolelog('currentRoute', currentRoute)
        for (let i = 0; i < this.asideNav.length; i++) {
          if (this.asideNav[i].name === currentRoute) {
            this.activeIndex = String(i + 1);
            break;
          }
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .index {
    height: 100%;
    background-color: #e9f0f8;
    letter-spacing: 1px;

    .content {
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