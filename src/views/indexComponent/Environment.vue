<template>
  <div class="environment">
    <!-- <p>环境管理: 温度、湿度、光照强度 (数值型) 火焰传感器(开关型)</p> -->
    <div style="padding: 10px 20px;">
      <el-table ref="filterTable" :data="datas" style="width: 100%">
        <el-table-column prop="time" label="日期" column-key="time" align="center" />
        <el-table-column prop="nodeId" label="节点ID" align="center" />
        <el-table-column prop="data" label="度数" align="center" />
        <el-table-column prop="type" label="类型" :filters="typeFilter" :filter-method="filterTag"
          filter-placement="bottom-end" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.type === 'temp' ? 'primary' : 'success'" disable-transitions>{{scope.row.type}}
            </el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="status" label="状态" align="center" /> -->
      </el-table>
      <el-pagination class="pagination" background :page-size="pageSize" :hide-on-single-page="hidePage"
        :total="pageTotal" layout="prev, pager, next" @current-change="handleChange" />
    </div>
  </div>
</template>

<script>
  import { dataSplit, keyId } from '../../utils/tool.js'
  import { Message } from 'element-ui'
  import { mapState } from 'vuex'
  export default {
    name: "environment",
    data() {
      return {
        hidePage: true,
        pageSize: 8,
        pageNum: '',
        pageTotal: 8,
        datas: [],
        typeFilter: [
          { text: '温度', value: 'temp' },
          { text: '湿度', value: 'humi' },
          { text: '光照强度', value: 'light' },
          { text: '火焰', value: 'flame' }
        ],
        timer: ''
      };
    },
    created() {
      // 获取当前分页数据
      this.handleChange()
    },
    computed: {
      ...mapState(['userInfo'])
    },
    mouted() { },
    unmounted() {
      clearInterval(this.timer);
    },
    methods: {
      handleChange(pageNum = 1, init = true) {
        // // consolelog(pageNum, '-------------------pageNum')
        if (init) {
          Message('数据请求中……')
        }
        this.pageNum = pageNum;
       this.axios.get(`/hardware/data/get/page?uuid=${this.userInfo.uuid}&pageSize=${this.pageSize}&pageNum=${pageNum}`)
          .then(res => {
            // consolelog(res, '---------------------获取硬件节点详情--res')
            if (res.data.statusCode === 200) {
              if (init) {
                Message({
                  type: 'success',
                  message: '数据获取成功'
                })
                let timer = setTimeout(() => {
                  Message.closeAll();
                }, 1000)
              }
              this.dataFormat(res.data.body)
            } else {
              if (init) {
                Message({
                  type: 'warning',
                  message: '暂无数据'
                })
              }
            }
          })
          .catch(err => {
            if (init) {
              Message({
                type: 'warning',
                message: '网络错误, 连接失败……'
              })
            }
            // // consoleerror(err)
          })
      },

      dataFormat(els) {
        let dataParse = JSON.parse(els);
        this.pageTotal = dataParse.count;
        this.datas = dataSplit(dataParse.data).map(item => {
          item.nodeId += keyId()
          return item
        })
        // // consolelog(this.datas, '-----------------------------获取硬件节点详情')
      },

      formatter(row, column) {
        return row.data;
      },
      filterTag(value, row) {
        return row.type === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
    }
  };
</script>

<style lang="less" scoped>
  .environment {
    width: 100%;
    height: 100%;

    .pagination {
      margin: 20px 10px;
      width: fix-conent;
      float: right;
    }
  }
</style>