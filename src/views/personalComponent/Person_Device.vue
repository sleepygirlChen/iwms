<template>
  <div class="userAdmin">
    <div style="padding: 10px 20px;">
      <el-table ref="filterTable" :data="users" style="width: 100%">
        <el-table-column width="60" label="序号" type="index" align="center" />
        <el-table-column prop="username" label="用户名" column-key="username" align="center" />
        <el-table-column prop="email" label="邮箱" align="center" />
        <el-table-column prop="phone" label="电话" align="center" />
        <el-table-column prop="addr" label="住址" align="center" />
        <el-table-column prop="role" label="用户角色" align="center">
          <template slot-scope="scope">
            <div>
              <el-tag
                :type="scope.row.role === '系统管理员' ? 'warning' : (scope.row.role === '管理员' ? 'success' : 'info')"
                disable-transitions
              >{{scope.row.role}}</el-tag>
              <el-tag class="meTag" type="primary" v-if="scope.row.uuid === userInfo.uuid">我</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="handleDelete(scope)"
              type="text"
              size="small"
            >{{ scope.row.role === '系统管理员' ? '' : '删除' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        :page-size="pageSize"
        :hide-on-single-page="hidePage"
        :total="pageTotal"
        layout="prev, pager, next"
        @current-change="handleChange"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Message, MessageBox } from "element-ui";
export default {
  name: "person_device",
  data() {
    return {
      hidePage: true,
      users: [],
      pageSize: 8,
      pageTotal: 12
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },

  mounted() {
    this.handleChange();
  },
  methods: {
    handleChange(pageNum = 1, init = true) {
      // // consolelog(pageNum, "-------------------pageNum");
      if (init) {
        Message({
          type: "info",
          message: "数据请求中……!"
        });
      }
      this.axios
        .get(
          `/users?pageSize=${this.pageSize}&pageNum=${pageNum}&username=${this.userInfo.username}`
        )
        .then(res => {
          // // consolelog(res, "----------------info   users");
          if (res.data.statusCode === 200) {
            if (init) {
              Message({
                type: "success",
                message: "请求成功!"
              });

              let timer = setTimeout(() => {
                Message.closeAll();
                clearTimeout(timer);
              }, 1000);
            }
            this.pageTotal = res.data.body.total;
            this.users = res.data.body.list.map(item => {
              item.role =
                item.role === "SYS_ROLE"
                  ? "系统管理员"
                  : item.role === "ADMIN_ROLE"
                  ? "管理员"
                  : "普通用户";
              return item;
            });
          } else {
            Message({
              type: "warning",
              message: "网络错误!"
            });
          }
        })
        .catch(err => {
          Message({
            type: "success",
            message: "网络出错，请稍后重试！"
          });
          // // consolelog(err);
        });
    },

    handleDelete(scope) {
      const { row } = scope;
      // // consolelog(scope, "----------scope");
      // // consolelog(row, "------handleDelete");
      MessageBox.confirm(`确认删除 - ${row.username} - 用户?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        iconClass: "el-icon-warning"
      })
        .then(() => {
          this.axios
            .delete(`/users/delete/`, {
              params: {
                username: this.userInfo.username,
                uuid: row.uuid
              }
            })
            .then(res => {
              // // consolelog(res, "-----------user delete");
              if (res.data.statusCode === 200) {
                Message({
                  type: "success",
                  message: "删除成功!"
                });
                this.handleChange(this.pageNum, false);
              }else {
                Message({
                  type: "warning",
                  message: "网络错误!"
                });
              }
            })
            .catch(err => {
              // // consolelog(err, "-----------user delete");
              Message({
                type: "warning",
                message: "网络错误，稍后重试"
              });
            });
        })
        .catch(() => {});
    }
  }
};
</script>


<style lang="less" scoped>
.userAdmin {
  width: 100%;
  height: 100%;

  .pagination {
    margin: 20px 10px;
    width: fix-conent;
    float: right;
  }

  .meTag {
    margin-left: 5px;
  }
}
</style>