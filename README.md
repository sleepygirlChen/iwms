# iwms

>- 智能仓储管理系统 (Intelligent warehouse management system)

# 安装element-ui组件库
>- npm i element-ui -S

### 配置按需导入组件
>- npm i babel-plugin-component -D
>- npm i babel-preset-es2015 -D

### 导入文件样式
>- import 'element-ui/lib/theme-chalk/index.css'

### 按需引入组件
>- 导入：import { Button, Select } from 'element-ui';
>- 注册：Vue.use(Button).use(Select)