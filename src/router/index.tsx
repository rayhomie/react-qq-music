import React from 'react'
import styles from './index.less'
import { BrowserRouter, Route } from 'react-router-dom'
import { AsyncComponent } from './AsyncComponent'
import useScroll from '@/model/scroll/useScroll'
import Header from '@/layout/Header'
import Menu from '@/layout/Menu'
import Player from '@/layout/Player'
import MusicListModal from '@/layout/MusicListModal'
import SongModal from '@/layout/SongModal'
import Message from '@/components/Message'
// import Recommend from '@/page/Recommend'
// import MusicLab from '@/page/MusicLab'
// import Video from '@/page/Video'
// import Redio from '@/page/Redio'
// import MyLike from '@/page/MyLike'
// import LocalSongs from '@/page/LocalSongs'
// import DownSongs from '@/page/DownSongs'
// import LastPlay from '@/page/LastPlay'
// import SongListDetail from '@/page/Other/SongListDetail'
// import CommonSearch from '@/page/Other/CommonSearch'
// import Album from '@/page/Other/Album'
// import Singer from '@/page/Other/Singer'

const Recommend = AsyncComponent(
  () => import(/* webpackChunkName: "Recommend" */ '@/page/Recommend')
)
const MusicLab = AsyncComponent(() => import(/* webpackChunkName: "MusicLab" */ '@/page/MusicLab'))
const SongListDetail = AsyncComponent(
  () => import(/* webpackChunkName: "SongListDetail" */ '@/page/Other/SongListDetail')
)
const CommonSearch = AsyncComponent(
  () => import(/* webpackChunkName: "CommonSearch" */ '@/page/Other/CommonSearch')
)
const Album = AsyncComponent(() => import(/* webpackChunkName: "Album" */ '@/page/Other/Album'))
const Singer = AsyncComponent(() => import(/* webpackChunkName: "Singer" */ '@/page/Other/Singer'))

const MyRouter = () => {
  const { setBottom, singerTab } = useScroll()
  return (
    <BrowserRouter>
      <Menu />
      <div className={styles.rightContainer}>
        <Header />
        <div
          id="page"
          className={styles.page}
          onScroll={(e: any) => {
            const { scrollHeight, clientHeight, scrollTop } = e.target
            //歌手详情页:单曲、专辑滑动分页
            const isSinger =
              window.location.pathname === '/Singer' && ['song', 'album'].includes(singerTab)
            //首页：新碟首发
            const isNewDisk = window.location.pathname === '/' && singerTab === '3'
            ;(isSinger || isNewDisk) &&
              !(scrollHeight - clientHeight - scrollTop) &&
              setBottom(true)
          }}
        >
          <Route exact path="/" component={Recommend}></Route>
          <Route exact path="/MusicLab" component={MusicLab}></Route>
          {/* <Route exact path="/Video" component={Video}></Route>
          <Route exact path="/Redio" component={Redio}></Route>
          <Route exact path="/MyLike" component={MyLike}></Route>
          <Route exact path="/LocalSongs" component={LocalSongs}></Route>
          <Route exact path="/DownSongs" component={DownSongs}></Route>
          <Route exact path="/LastPlay" component={LastPlay}></Route> */}
          {/* other */}
          <Route exact path="/SongListDetail" component={SongListDetail}></Route>
          <Route exact path="/CommonSearch" component={CommonSearch}></Route>
          <Route exact path="/Album" component={Album}></Route>
          <Route exact path="/Singer" component={Singer}></Route>
        </div>
        <MusicListModal />
        <SongModal />
        <Player />
        <Message />
      </div>
    </BrowserRouter>
  )
}
export const router = [
  '/',
  '/MusicLab',
  '/Video',
  '/Redio',
  '/MyLike',
  '/LocalSongs',
  '/DownSongs',
  '/LastPlay',
]

export const searchTab = {
  song: '/CommonSearch',
  hotkey: '/CommonSearch',
  album: '/Album',
  singer: '/Singer',
  mv: '/',
}

export default MyRouter
