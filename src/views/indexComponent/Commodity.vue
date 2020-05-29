<template>
  <div class="commodity">
    <div class="title">
      <p>当前用户拥有的硬件数量：<span>{{deviceNo}}</span></p>
      <div class="btn">
        <el-button type="primary" @click="showForm">注册硬件</el-button>
      </div>
    </div>

    <!-- 分割线 -->
    <el-divider />

    <div v-if="deviceNo">
      <p class="listTitle">硬件详情列表
        <small>--- 在线硬件 <span style="color: brown;">{{onLine.onLineCount}}</span> </small>
      </p>
      <el-table :data="devicesList">
        <el-table-column prop="nodeId" label="节点ID" align="center" width="200" />
        <el-table-column prop="type" label="节点类型" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click.native.prevent="showDialog(scope.$index)" type="success" size="small">移除</el-button>
            <!-- <el-button @click.native.prevent="start(scope.$index)" type="primary" size="small">开启</el-button>
            <el-button @click.native.prevent="mount(scope.$index)" type="warning" size="small">挂起</el-button>
            <el-button @click.native.prevent="stop(scope.$index)" type="danger" size="small">停止</el-button> -->
            <el-button @click.native.prevent="history(scope.$index)" type="info" size="small">历史数据</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <!-- 硬件注册Modal -->
    <el-dialog title="硬件注册" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="用户ID" :label-width="formLabelWidth">
          <el-input v-model="form.uuid" autocomplete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="节点id" :label-width="formLabelWidth">
          <el-input v-model="form.nodeId" autocomplete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="type" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择传感器类型">
            <el-option label="温度" value="temp" />
            <el-option label="湿度" value="hum" />
            <el-option label="光照强度" value="light" />
            <el-option label="火焰" value="flame" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideForm">取 消</el-button>
        <el-button type="primary" @click="registerDevice">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 硬件注销Modal -->
    <el-dialog title="硬件注销" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div>
        <el-badge value="!" class="item" type="warning" style="margin-right: 10px;" />
        <span>确定移除硬件节点?</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="cancelDevice">确 定</el-button>
      </span>
    </el-dialog>



  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Message } from 'element-ui'
  import { keyId } from '../../utils/tool.js'

  export default {
    name: 'commodity',
    data() {
      return {
        rowIndex: '',
        deviceNo: 0,
        onLine: {},
        dialogFormVisible: false,
        dialogVisible: false,
        form: {
          hardware: "",
          nodeId: "",
          username: '',
          uuid: "",
          type: "",
        },
        formLabelWidth: '120px',
        devicesList: []
      }
    },
    created() {
      this.getDeviceNo()
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      // 获取硬件数量
      getDeviceNo(type) {
        this.axios.get(`/${this.userInfo.username}/hardware/count?username=${this.userInfo.username}`)
          .then(res => {
            // consolelog(res, '--------------res count')
            // consolelog(type, '--------------type count')

            this.deviceNo = res.data.body;
            if (res.data.body && type !== 'delete') {// consolelog('reload')
              this.getDeviceDetail()
            }
            this.deviceOnline();
          })
      },

      // 获取用户硬件详情列表
      getDeviceDetail() {
        this.axios.get(`${this.userInfo.username}/hardware`)
          .then(res => {
            // console.log(res.data.body, '----------------detail res')
            this.devicesList = res.data.body.map(item => {
              item.nodeId += keyId()
              return item
            });
          })
      },

      showForm() {
        this.dialogFormVisible = true;
        this.form.username = this.userInfo.username
        this.form.uuid = this.userInfo.uuid;
        this.form.nodeId = 1
      },

      hideForm() {
        this.dialogFormVisible = false;
        this.form.type = ""
      },

      // 获取在线硬件数量
      deviceOnline() {
        this.axios.get(`${this.userInfo.uuid}/equipments/counts`)
          .then(res => {
            // consolelog(res, '----------------online device count  ')
            if (res.data.statusCode === 200) {
              this.onLine = res.data.body;
            }
          })
      },

      cancelDevice() {
        this.dialogVisible = false

        Message('')
        Message({
          type: 'info',
          message: '正在移除……'
        })
        this.axios.post('/hardware/remove', { nodeId: this.devicesList[this.rowIndex].nodeId[0], username: this.userInfo.username })
          .then(res => {
            // consolelog(res, '-------------delete res')
            if (res.data.body) {
              Message({
                type: 'success',
                message: '节点移除成功'
              })
              this.devicesList.splice(this.rowIndex, 1);
              let timer = setTimeout(() => {
                Message.closeAll()
                clearTimeout(timer);
              }, 1000)
              this.getDeviceNo('delete')
            } else {
              Message({
                type: 'warning',
                message: '节点移除失败'
              })
            }
          })

      },

      handleClose() {
        this.dialogVisible = false
      },

      // 注册硬件
      registerDevice() {
        this.axios.post(`/register/hardware`, this.form)
          .then(res => {
            // // consolelog(res, '---------------res registerDevice')
            this.getDeviceNo()
            this.dialogFormVisible = false;
          })
      },

      // 注销硬件
      showDialog(index) {
        this.dialogVisible = true
        this.rowIndex = index
      },
      history(index) {
        // console.log(this.devicesList[index], '----------------------history')
        this.$router.push({ path: '/history', query: this.devicesList[index] })
      }

    },

  }
</script>

<style lang="less" scoped>
  .commodity {
    height: calc(~"100% - 60px");
    padding: 30px;

    .title {
      line-height: 40px;
      font-size: 20px;
      display: flex;
      justify-content: space-between;

      >p {
        span {
          color: brown;
          font-size: 30px;
        }
      }
    }

    .listTitle {
      margin: 50px 0;
      font-size: 20px;
    }
  }
</style>