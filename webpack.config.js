// const path = require('path');

// module.exports = {

//   mode: 'development', // production

//   entry: __dirname + 'main.js',

//   output: {
//     path: path.resolve(__dirname, '/dist'),
//     filename: '[name].min.js'
//   },

//   module: {
//     rules: [
//       // url-loader
//       {
//         test: /\.(png|gif|jpg|jpeg)$/,
//         use: [{
//           loader: 'url-loader',
//           options: {
//             //如果图片小于等于1000B，图片被转为base64
//             limit: 1000
//           }
//         }]
//       },
//       // file-loader
//       {
//         test: /\.(wmv|mp4)$/,
//         loader: 'file-loader'
//       }

//     ]
//   }

// }
