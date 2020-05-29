<template>
  <div class="history">
    <p class="title">节点历史数据</p>
    <div class="btnBox">
      <el-button class="btn" type="success" @click="typeGet('hour')">近小时内</el-button>
      <el-button class="btn" type="danger" @click="typeGet('six')">近六小时内</el-button>
      <el-button class="btn" type="primary" @click="typeGet('today')">当天</el-button>
      <el-button class="btn" type="warning" @click="typeGet('three')">近三天</el-button>
      <el-button class="btn" type="info" @click="typeGet('week')">近一周</el-button>
    </div>
    <div style="padding: 10px 20px;">
      <el-table ref="filterTable" :data="historydataList" style="width: 100%">
        <el-table-column prop="time" label="日期" align="center" />
        <el-table-column prop="nodeId" label="节点ID" align="center" />
        <el-table-column prop="data" label="度数" align="center" />
        <el-table-column prop="type" label="类型" align="center" />
        <!-- <el-table-column prop="status" label="状态" align="center" /> -->
      </el-table>
    </div>

  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import { dateFormat, getDay } from '../../utils/dateFormat.js'
  import { dataSplit, keyId } from '../../utils/tool.js'
  import { Message } from 'element-ui'
  export default {
    name: 'history',
    data() {
      return {
        info: {},
        first: '',
        last: '',
        historydataList: [],
        hour: 3600000,  //60 * 60 *1000
        week: 604800000  // 7 * 24 * 60 * 60 * 1000
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    created() {

      // // consolelog(this.$route.query, '------------------------query')
      this.info = this.$route.query
    },
    mounted() {
      const date = new Date().getTime()
      this.getHisoryDatas({ first: `${dateFormat(date - this.hour)}`, last: `${dateFormat(date)}` })
    },

    methods: {
      typeGet(type) {

        const { week, hour, getHisoryDatas } = this

        const today = getDay(0), three = getDay(-2)
        const f = '00:00:00', l = '23:59:59'

        const date = new Date().getTime()
        if (type === 'week') {
          getHisoryDatas({ first: `${dateFormat(date - week)}`, last: `${dateFormat(date)}` })
        }

        if (type === 'three') {
          getHisoryDatas({ first: `${three} ${f}`, last: `${today} ${l}` })
        }

        if (type === 'six') {
          getHisoryDatas({ first: `${dateFormat(date - hour * 6)}`, last: `${dateFormat(date)}` })
        }

        if (type === 'hour') {
          getHisoryDatas({ first: `${dateFormat(date - hour)}`, last: `${dateFormat(date)}` })
        }

        if (type === 'today') {
          getHisoryDatas({ first: `${today} ${f}`, last: `${today} ${l}` })
        }

      },

      getHisoryDatas({ last, first }) {
        // consolelog(first, '----------------first')
        // consolelog(last, '----------------last')

        const { userInfo, info } = this

        const nodeId = info.nodeId[0]

        Message('数据获取中……')

        this.axios.get(`/hardware/${userInfo.uuid}/history/${nodeId}?uuid=${userInfo.uuid}&nodeId=${nodeId}&first=${first}&last=${last}`)
          .then(res => {
            // consolelog(res, '----------------historydataList---res')
            if (res.data.statusCode === 200) {

              this.historydataList = dataSplit(res.data.body).map(item => {
                item.nodeId += keyId()
                return item
              })
              // this.historydataList.
              // consolelog(timeArr, '----------------time key')
              Message({
                type: 'success',
                message: '数据获取成功'
              })
              // consolelog(this.historydataList, '---------------------------this.historydataList')

              const timer = setTimeout(() => {
                Message.closeAll()
                clearTimeout(timer)
              }, 1000)
            } else if (res.data.statusCode === 500) {
              Message({
                type: 'warning',
                message: '暂无数据'
              })
              const timer = setTimeout(() => {
                Message.closeAll()
                clearTimeout(timer)
              }, 1000)
            }
          })
          .catch(err => {
            // consolelog(err, '------------------history catch err')
          })
      },

    }
  }
</script>

<style lang="less" scoped>
  .history {

    .title {
      text-align: center;
      font-size: 24px;
      margin: 30px;
    }

    .btnBox {
      padding: 5px;
      width: fit-content;
      margin: 20px auto;

      .btn {
        margin: 0 20px;
      }
    }
  }
</style>