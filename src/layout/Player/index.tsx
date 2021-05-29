import React, { FC, useEffect, useState, useRef } from 'react'
import { getSongInfo as fetchSongInfo, getMusicPlay as fetchMusicPlay } from '@/api/music'
import { getImageUrl } from '@/api/recommend'
import { s_to_hs } from '@/utils/common'
import Progress from '@/components/Progress'
import Icon from '@/components/Icon'
import classnames from 'classnames'
import usePlayer from '@/model/player/usePlayer'
import styles from './index.less'

interface PlayerProps {}

const Player: FC<PlayerProps> = props => {
  const [pic, setPic] = useState<string>('')
  const [info, setInfo] = useState<any>(null)
  const { play, setPlay, playlist, setPlaylist, curSong, setCurSong, setOpenPlaylist } = usePlayer()
  const [errorImg, setErrorImg] = useState<boolean>(false)
  const [musicUrl, setMusicUrl] = useState<string>('')
  const [progress, setProgress] = useState<number>(0)

  const audio = useRef<any>(null)

  useEffect(() => {
    play ? audio.current.pause() : audio.current.play()
  }, [play])

  useEffect(() => {
    if (curSong) {
      getSongInfo()
      getMusicPlay()
      setPlay(false)
    } else {
      setPlay(true)
    }
  }, [curSong])

  useEffect(() => {
    setErrorImg(false)
  }, [pic])

  const getSongInfo = async () => {
    const {
      data: {
        response: {
          songinfo: { data },
        },
      },
    } = await fetchSongInfo({ songmid: curSong })
    setInfo(data)
    const {
      data: {
        response: {
          data: { imageUrl },
        },
      },
    } = await getImageUrl({ id: data.track_info.album.mid })
    setPic(imageUrl)
  }

  const getMusicPlay = async () => {
    const {
      data: {
        data: { playUrl },
      },
    } = await fetchMusicPlay({ songmid: curSong })
    for (let item in playUrl) {
      setMusicUrl(playUrl[item].url)
    }
  }

  const modifyProgress = (cur: number) => {
    const currentTime = cur * audio.current.duration
    audio.current.currentTime = currentTime
    setPlay(false)
  }

  //音乐结束
  const musicEnd = () => {
    setPlay(true)
  }

  return (
    <>
      <Progress progress={progress} onControl={modifyProgress} />
      <div className={styles.container}>
        <div className={styles.pic}>
          {errorImg && pic ? (
            <Icon type="icon-CD" style={{ fontSize: 50, margin: '0 10px' }} />
          ) : (
            <img
              src={pic}
              alt=""
              onError={() => setErrorImg(true)}
              style={!pic ? { visibility: 'hidden' } : {}}
            />
          )}
        </div>
        <div className={styles.info}>
          <span>{info?.track_info.name}</span>
          {info && <span> - {info?.track_info?.singer[0].name}</span>}
        </div>
        <div className={styles.control}>
          <audio
            ref={audio}
            autoPlay
            src={musicUrl}
            onTimeUpdate={() =>
              setProgress(audio.current.currentTime / audio.current.duration || 0)
            }
            onEnded={() => musicEnd()}
          >
            您的浏览器不支持 audio 元素。
          </audio>
          <i className={classnames('iconfont', 'icon-hanhan-01-01', styles.circle)} />
          <i className={classnames('iconfont', 'icon-shangyishou', styles.arrow)} />
          <i
            className={classnames(
              'iconfont',
              play ? 'icon-toplay-hover' : 'icon-bofang1',
              styles.play
            )}
            onClick={() => setPlay(pre => !pre)}
          />
          <i className={classnames('iconfont', 'icon-xiayishou', styles.arrow)} />
          <i className={classnames('iconfont', 'icon-soound-min', styles.voice)} />
        </div>
        <div className={styles.playlist}>
          <div className={styles.timeAround}>
            {audio.current?.currentTime && audio.current?.duration
              ? `${s_to_hs(audio.current?.currentTime)} / ${s_to_hs(audio.current?.duration)}`
              : ''}
          </div>
          <div
            onClick={() => {
              //异步解决ClickOut的Bug
              setTimeout(() => setOpenPlaylist(pre => !pre), 0)
            }}
          >
            <i className={classnames('iconfont', 'icon-musiclist', styles.musiclist)} />
            <div className={styles.num}>{playlist?.length}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Player
