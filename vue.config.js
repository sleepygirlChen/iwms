// module.exports = {
//   // 相对路径处理, 打包时不会出现查找不到文件夹的错误
//   publicPath: './',
//   // outputDir: 'dist', //build输出目录
//   // assetsDir: 'assets', //静态资源目录（js, css, img）
//   // lintOnSave: false, //是否开启eslint
//   devServer: {
//     open: true, //是否自动弹出浏览器页面
//     // host: "localhost",
//     // port: '8081',
//     // https: false, //是否使用https协议
//     // hotOnly: false, //是否开启热更新
//     proxy: {  // 服务器代理
//       '/Api': {
//         target: 'http://118.126.82.126:9999/api', //API服务器的地址
//         changeOrigin: true,
//         pathRewrite: {
//           '^/Api': ''
//         }
//       }
//     },
//   }
// }

module.exports = {
  publicPath: './'
}
