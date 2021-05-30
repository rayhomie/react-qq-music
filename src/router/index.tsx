import React from 'react'
import styles from './index.less'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from '@/layout/Header'
import Menu from '@/layout/Menu'
import Player from '@/layout/Player'
import MusicListModal from '@/layout/MusicListModal'
import Recommend from '@/page/Recommend'
import MusicLab from '@/page/MusicLab'
import Video from '@/page/Video'
import Redio from '@/page/Redio'
import MyLike from '@/page/MyLike'
import LocalSongs from '@/page/LocalSongs'
import DownSongs from '@/page/DownSongs'
import LastPlay from '@/page/LastPlay'
import SongListDetail from '@/page/Other/SongListDetail'
import CommonSearch from '@/page/Other/CommonSearch'

const MyRouter = () => {
  return (
    <BrowserRouter>
      <Menu />
      <div className={styles.rightContainer}>
        <Header />
        <div className={styles.page}>
          <Route exact path="/" component={Recommend}></Route>
          <Route exact path="/MusicLab" component={MusicLab}></Route>
          <Route exact path="/Video" component={Video}></Route>
          <Route exact path="/Redio" component={Redio}></Route>
          <Route exact path="/MyLike" component={MyLike}></Route>
          <Route exact path="/LocalSongs" component={LocalSongs}></Route>
          <Route exact path="/DownSongs" component={DownSongs}></Route>
          <Route exact path="/LastPlay" component={LastPlay}></Route>
          {/* other */}
          <Route exact path="/SongListDetail" component={SongListDetail}></Route>
          <Route exact path="/CommonSearch" component={CommonSearch}></Route>
        </div>
        <MusicListModal />
        <Player />
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
  album: '/',
  singer: '/',
  mv: '/',
}

export default MyRouter
