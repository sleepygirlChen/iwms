<template>

  <div class="mainbody">

    <el-form label-width="100px" style="width: 400px;">
      <el-form-item label="用户ID :  ">
        <el-input v-model='userInfo.uuid' :data-id='userInfo.id' :disabled="true" />
      </el-form-item>
      <el-form-item label="用户名 :  ">
        <el-input v-model='userInfo.username' :disabled="true" />
      </el-form-item>
      <el-form-item label="真实姓名 :  ">
        <el-input v-model='userInfo.fullName' :disabled="isEdit" />
      </el-form-item>
      <el-form-item label="手机号码 :  ">
        <el-input v-model='userInfo.phone' :disabled="isEdit" />
      </el-form-item>
      <el-form-item label="邮箱 :  ">
        <el-input v-model='userInfo.email' :disabled="isEdit" />
      </el-form-item>
      <el-form-item label="住址 :  ">
        <el-input v-model='userInfo.addr' :disabled="isEdit" />
      </el-form-item>
      <el-row style="margin-top: 50px; display: flex; justify-content: center;">
        <el-button type="primary" @click="editChange('change')" v-if="isEdit">修改</el-button>
        <el-button type="primary" @click="editChange('cancel')" v-else>取消</el-button>
        <el-button @click="svaeInfo" :disabled="isEdit">保存</el-button>
      </el-row>
    </el-form>


  </div>

</template>

<script>
  import { mapState } from 'vuex'
  import { Message } from 'element-ui'
  import * as fn from '../../utils/tool.js'

  export default {
    name: 'person_info',
    data() {
      return {
        isEdit: true,
        currentInfo: {}
      }
    },


    computed: {
      ...mapState(['userInfo'])
    },

    methods: {
      editChange(type) {
        // // consolelog(type, '---------------btn type')
        this.isEdit = !this.isEdit;
        type === 'change' ? (this.currentInfo = Object.assign({}, this.userInfo)) : ''
        type === 'cancel' ? this.$store.commit('changeState', { userInfo: this.currentInfo }) : '';
        // consolelog(this.currentInfo, '--------------currentInfo')
        // consolelog(this.userInfo, '--------------this.userInfo')
      },

      svaeInfo() {
        Message('正在修改……')
        // // consolelog()
        // consolelog( this.userInfo, '--------------- this.userInfo')
        this.axios.post(`/users/update?uuid=${this.userInfo.uuid}&username=${this.userInfo.username}`, this.userInfo)
          .then(res => {
            // consolelog(res, '------------------save info')
            this.editChange();
            // // consolelog(res.body, '-----------------res.body')
            if (res.data.body) {
              this.axios.get(`/users/${this.userInfo.uuid}`)
                .then(res => {
                  // // consolelog(res, '----------------get new userInfo')
                  if (res.data.statusCode === 200) {
                    Message({
                      type: 'success',
                      message: '信息修改成功，已保存'
                    })
                    this.$store.commit('changeState', { userInfo: res.data.body })
                    localStorage.setItem('userInfo', fn.encodeInfo(res.data.body))
                    let timer = setTimeout(() => {
                      Message.closeAll()
                      clearTimeout(timer)
                    }, 1000)
                  }
                })
            } else {
              this.$store.commit('changeState', { userInfo: this.currentInfo })
              Message({
                type: 'warning',
                message: '用户信息修改失败'
              })
              let timer = setTimeout(() => {
                Message.closeAll()
                clearTimeout(timer)
              }, 1000)
              // // consolelog(res)
            }
          }).catch(err => {
            Message({
              type: 'warning',
              message: '网络错误, 连接失败……'
            })
            // // consolelog(res)
          })
      }
    }

  }

</script>

<style lang="less" scoped>
  .mainbody {

    padding: 50px 20px;

  }
</style>