import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'element-ui/lib/theme-chalk/display.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import Router from 'vue-router'

import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-flash'

import {
  Menu,
  MenuItem,
  Submenu,
  Row,
  Col,
  Popover,
  Button,
  Divider,
  Tag,
  Alert,
  Dialog,
  Form,
  FormItem,
  Input,
  Checkbox,
  Table,
  TableColumn,
  Select,
  Option,
  Badge,
  Pagination,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Radio,
  RadioGroup,
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

// 防止路由重复点击错误
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//关闭生产环境错误警告信息提示
Vue.config.productionTip = false

//配置请求时携带cookie
// axios.defaults.withCredentials = true; //配置为true

//配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// axios.defaults.baseURL = 'http://118.126.82.126:9997/api';
axios.defaults.baseURL = 'http://118.126.82.126:9998/api';
// axios.defaults.baseURL = 'http://118.126.82.126:9999/api';

// 组件注册
Vue.use(VueAxios, axios)
  .use(VueVideoPlayer)
  .use(Menu)
  .use(MenuItem)
  .use(Submenu)
  .use(Row)
  .use(Col)
  .use(Popover)
  .use(Button)
  .use(Divider)
  .use(Tag)
  .use(Alert)
  .use(Dialog)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Checkbox)
  .use(Table)
  .use(TableColumn)
  .use(Select)
  .use(Option)
  .use(Badge)
  .use(Pagination)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Radio)
  .use(RadioGroup)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
