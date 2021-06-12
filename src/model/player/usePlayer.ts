import { useState, useEffect } from 'react'
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
  //音量
  const [volume, setVolume] = useState<number>(1)
  //循环模块
  const [circle, setCircle] = useState<number>(0)

  useEffect(() => {
    setPlaylist(JSON.parse(localStorage.getItem('playlist') || '[]'))
    setCurSong(localStorage.getItem('curSong'))
    setCircle(+(localStorage.getItem('circle') || 0))
  }, [])

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist))
  }, [playlist])

  useEffect(() => {
    localStorage.setItem('curSong', curSong || '')
  }, [curSong])

  useEffect(() => {
    localStorage.setItem('circle', circle.toString())
  }, [circle])

  return {
    play,
    setPlay,
    playlist,
    setPlaylist,
    curSong,
    setCurSong,
    openPlaylist,
    setOpenPlaylist,
    volume,
    setVolume,
    circle,
    setCircle,
  }
}

export default createModel(usePlayer)
