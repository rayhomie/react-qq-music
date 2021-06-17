import { useState, useEffect } from 'react'
import { createModel } from 'hox'

const usePlayer = () => {
  // 播放/暂停
  const [play, setPlay] = useState<boolean>(false)
  // 播放列表
  const [playlist, setPlaylist] = useState<any[]>([])
  // 当前播放歌曲
  const [curSong, setCurSong] = useState<any>(null)
  // 打开播放列表
  const [openPlaylist, setOpenPlaylist] = useState<boolean>(false)
  // 音量
  const [volume, setVolume] = useState<number>(1)
  // 循环模块
  const [circle, setCircle] = useState<number>(0)
  // 搜索是否focus
  const [searchFocus, setSearchFocus] = useState<boolean>(false)
  // 打开歌曲modal
  const [openSongModal, setOpenSongModal] = useState<boolean>(false)
  // 歌曲的专辑图
  const [pic, setPic] = useState<string>('')
  // 无专辑图
  const [errorImg, setErrorImg] = useState<boolean>(false)
  // 歌词
  const [lyric, setLyric] = useState<any>(null)
  // 歌曲信息
  const [info, setInfo] = useState<any>(null)
  // 当前播放时间
  const [curTime, setCurTime] = useState<number>(0)
  // 滚动歌词的播放时间
  const [playTime, setPlayTime] = useState<number>(0)

  useEffect(() => {
    setPlaylist(JSON.parse(localStorage.getItem('playlist') || '[]'))
    setCurSong(localStorage.getItem('curSong'))
    setCircle(+(localStorage.getItem('circle') || 0))
  }, [])

  useEffect(() => {
    //监听空格播放进行播放，并且屏蔽其他的输入
    function keypress(e: any) {
      if (!searchFocus) {
        switch (e.code) {
          case 'Space':
            setPlay(pre => !pre)
            break
        }
      }
    }
    document.addEventListener('keydown', keypress)
    return () => document.removeEventListener('keydown', keypress)
  }, [searchFocus])

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist))
  }, [playlist])

  useEffect(() => {
    localStorage.setItem('curSong', curSong || '')
    // 当切歌时收起歌的modal
    // setOpenSongModal(false)
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
    searchFocus,
    setSearchFocus,
    openSongModal,
    setOpenSongModal,
    pic,
    setPic,
    errorImg,
    setErrorImg,
    lyric,
    setLyric,
    info,
    setInfo,
    curTime,
    setCurTime,
    playTime,
    setPlayTime,
  }
}

export default createModel(usePlayer)
