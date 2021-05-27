import { useState } from 'react'
import { createModel } from 'hox'

const usePlayer = () => {
  // 播放/暂停
  const [play, setPlay] = useState<boolean>(false)
  // 播放列表
  const [playlist, setPlaylist] = useState<any[]>([])
  // 当前播放歌曲
  const [curSong, setCurSong] = useState<any>(null)

  return {
    play,
    setPlay,
    playlist,
    setPlaylist,
    curSong,
    setCurSong,
  }
}

export default createModel(usePlayer)
