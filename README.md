# 🎵 基于 React 的高仿QQ音乐 mac 客户端播放器（PC） Online Music Player

由于之前在github上看到了一个高仿mac版网易云客户端播放器的项目。由于在github上目前还没有高仿mac版QQ音乐的项目。

所以就手撸了一个  react 版的qq音乐mac客户端播放器，这里还非常感谢 [Rain120](https://github.com/Rain120) 👬提供了QQ音乐API。欢迎提出意见和 star🌟~

🌟[预览地址](http://music.rayhomie.icu/)🌟

🌟[源码地址](https://github.com/rayhomie/react-qq-music)🌟



### 后端接口

https://rain120.github.io/qq-music-api/#/?id=qqmusicapi



### 技术栈

- **React Hooks** （几乎全使用函数式组件）
- **Hox**（react的hooks式全局状态管理器）
- **ESNext**（JavaScript 语言的下一代标准）
- **Less**（CSS 预处理器）
- **react-router-dom**（路由）
- **Webpack**（打包器）
- **IconFont**（图标）
- ...

### 项目结构

```js

|-- dll              // 动态链接库（'react','react-dom','hox'）
|-- src              // 源码目录 
|   |-- api          // QQ音乐Api目录   
|   |-- components   // 组件目录
|   |-- font         // iconfont图标字体目录
|   |-- hooks        // 自定义hooks工具目录
|   |-- layout       // 整体页面布局目录
|   |-- model        // 全局状态hox目录
|   |-- page         // 页面目录
|   |-- router       // 路由配置目录（可动态加载）
|   |-- style        //	全局样式目录
|   |-- utils        // 工具目录
|   |-- app.less     // 全局样式入口文件
|   |-- App.tsx      // 入口文件
|   |-- const.t      // 常量定义
|   |-- index.html   // 入口模板文件
|   |-- index.js     // spa入口文件
|-- .gitignore       // 忽略git
|-- .prettierignore	 // 忽略prettier
|-- .prettierrc.js   // 配置prettier
|-- package.json     // npm入口	 
|-- postcss.config.js // 配置postcss
|-- README.md        // 项目说明
|-- tsconfig.json    // ts配置
|-- webpack_dll.config.js  //	dll动态链接库文件打包配置文件
|-- webpack.config.js      // webpack打包入口配置文件			 
```

### 安装与使用

```bash
#安装依赖
npm i
#启动项目
npm start
#打包react动态链接库
npm run dll 
#打包项目
npm run build
```

### 

