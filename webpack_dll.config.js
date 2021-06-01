const path = require('path')
const webpack = require('webpack')
module.exports = {
  mode: 'development',
  entry: {
    /*把项目需要所有的 react 相关的放到一个单独的动态链接库
      又例如：vue: ['vue', 'vuex', 'vue-router'],
      jquery: ['jQuery']*/
    react: ['react', 'react-dom', 'hox'],
  },
  output: {
    filename: '[name].dll.js', //打包后的文件名称
    path: path.resolve(__dirname, 'dll'), //输出到的文件夹
    library: '_dll_[name]', //存放动态链接库的全局变量名称，加上_dll_是为了防止全局变量冲突
  },
  plugins: [
    //使用webpack内置的生成动态链接库dll的插件（会生成两个文件，一个是打包好的库代码，另一个是映射文件）
    new webpack.DllPlugin({
      /*动态链接库的全局变量名称，需要和 output.library 中保持一致
        该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
        例如 react.manifest.json 中就有 "name": "_dll_react"*/
      name: '_dll_[name]',
      // 描述动态链接库的 manifest.json 文件输出时的文件名称
      path: path.join(__dirname, 'dll', '[name].manifest.json'),
    }),
  ],
}
