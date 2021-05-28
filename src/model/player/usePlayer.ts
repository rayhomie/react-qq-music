import { useState } from 'react'
import { createModel } from 'hox'

const usePlayer = () => {
  // 播放/暂停
  const [play, setPlay] = useState<boolean>(false)
  // 播放列表
  const [playlist, setPlaylist] = useState<any[]>([])
  // 当前播放歌曲
  const [curSong, setCurSong] = useState<any>(null)
  //打开播放列表
  const [openPlaylist, setOpenPlaylist] = useState<boolean>(false)

  return {
    play,
    setPlay,
    playlist,
    setPlaylist,
    curSong,
    setCurSong,
    openPlaylist,
    setOpenPlaylist,
  }
}

export default createModel(usePlayer)
