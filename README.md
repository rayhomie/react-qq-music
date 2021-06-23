# 🎵 基于 React 的QQ音乐 mac 客户端播放器（PC） Online Music Player

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
|       |--Button         // 按钮组件
|       |--Card           // 常规的专辑等卡片
|       |--CardList       // 歌单推荐的卡片列表
|       |--Icon           // 包裹使用@ant-design/icons和IconFont
|       |--List           // 歌曲列表组件
|       |--MacBtn         // mac按钮组件
|       |--Message        // 全局提示
|       |--Pagination     // 分页组件
|       |--PlayListModal  // 播放列表弹窗
|       |--Progress       // 播放的进度
|       |--RankCard       // 排行榜卡片
|       |--Search         // 搜索框（包含业务）
|       |--SideBar        // 侧边栏
|       |--SingerCard     // 歌手卡片
|       |--Tab            // 标签组件
|       |--Transition     // 动画过渡组件透传CSSTransition所有属性
|       |--Volume         // 音量组件
|   |-- font         // iconfont图标字体目录
|   |-- hooks        // 自定义hooks工具目录
|   |-- layout       // 整体页面布局目录
|       |--Header           // 路由前进后退按钮、搜索框
|       |--Menu             // 左侧菜单栏
|       |--MusicListModal   // 播放列表侧弹窗
|       |--Player           // 播放器模块
|       |--SongModal        // 歌词弹窗
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

### 进度

- [x] 搜索建议
- [x] 搜索详情页
- [x] 歌手页
- [x] 专辑页
- [x] 播放音乐（版权歌曲无法播放）
- [x] 播放列表（支持本地存储当前列表）
- [x] 播放模式（单曲循环、列表循环、随机播放）
- [x] 调整音量
- [x] 查看歌词
- [x] 歌单推荐
- [x] 新歌首发
- [x] 精彩推荐
- [x] 新碟首发
- [x] 排行榜
- [ ] 音乐馆
- [ ] MV
- [ ] 电台
- [ ] 主题换肤

### 效果截屏

![歌单推荐](https://personal-financ.oss-cn-chengdu.aliyuncs.com/qqmusic/Snipaste_2021-06-22_21-45-20.png)

![歌词](https://personal-financ.oss-cn-chengdu.aliyuncs.com/qqmusic/Snipaste_2021-06-22_21-45-59.png)

![排行榜](https://personal-financ.oss-cn-chengdu.aliyuncs.com/qqmusic/Snipaste_2021-06-22_21-46-49.png)

![新碟首发](https://personal-financ.oss-cn-chengdu.aliyuncs.com/qqmusic/Snipaste_2021-06-22_21-47-18.png)

![新歌首发](https://personal-financ.oss-cn-chengdu.aliyuncs.com/qqmusic/Snipaste_2021-06-22_21-47-47.png)



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





