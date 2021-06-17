import React, { FC, useEffect, useState, useRef } from 'react'
import { getSongInfo as fetchSongInfo, getMusicPlay as fetchMusicPlay } from '@/api/music'
import { getImageUrl } from '@/api/recommend'
import { s_to_hs } from '@/utils/common'
import Progress from '@/components/Progress'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import Icon from '@/components/Icon'
import Volume from '@/components/Volume'
import Transition from '@/components/Transition'
import useMsg from '@/model/msg/useMsg'
import classnames from 'classnames'
import usePlayer from '@/model/player/usePlayer'
import { useHistory } from 'react-router-dom'
import styles from './index.less'

interface PlayerProps {}

const Player: FC<PlayerProps> = props => {
  const history = useHistory()
  const {
    play,
    setPlay,
    playlist,
    setPlaylist,
    curSong,
    setCurSong,
    setOpenPlaylist,
    volume,
    setVolume,
    circle,
    setCircle,
    openSongModal,
    setOpenSongModal,
    pic,
    setPic,
    errorImg,
    setErrorImg,
    info,
    setInfo,
    setCurTime,
    playTime,
  } = usePlayer()
  const { setConfig } = useMsg()
  const [musicUrl, setMusicUrl] = useState<string>('')
  const [progress, setProgress] = useState<number>(0)
  const [volumeShow, setVolumeShow] = useState<boolean>(false)
  const [showArrow, setShowArrow] = useState<boolean>(false)

  const audio = useRef<any>(null)

  useEffect(() => {
    play ? audio.current.pause() : audio.current.play()
  }, [play])

  //如果localstorge有自动播放
  useEffect(() => {
    if (localStorage.getItem('playlist') && localStorage.getItem('curSong')) {
      setTimeout(() => setPlay(true), 300)
    }
  }, [])

  useEffect(() => {
    audio.current.volume = volume >= 1 ? 1 : volume <= 0 ? 0 : volume
  }, [volume])

  useEffect(() => {
    if (curSong) {
      getSongInfo()
      getMusicPlay()
      setPlay(false)
    } else {
      reset()
    }
  }, [curSong])

  useEffect(() => {
    setErrorImg(false)
  }, [pic])

  useEffect(() => {
    audio.current.currentTime = playTime
  }, [playTime])

  const reset = () => {
    setMusicUrl('')
    setPic('')
    setInfo(null)
    setPlay(true)
    setProgress(0)
  }

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
      if (playUrl[item].error) {
        setConfig(pre => ({
          ...pre,
          content: (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ExclamationCircleOutlined style={{ marginRight: 10, color: '#FF7F00' }} />
              {`${playUrl[item].error}，2s后播放下一首`}
            </div>
          ),
          show: true,
          delay: 2000,
          onClose: nextMusic,
        }))
      }
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
    switch (circle) {
      case 0:
        nextMusic()
        break
      case 1:
        randomMusic()
        break
      case 2:
        soloMusic()
        break
    }
  }

  const findIndex: any = (playlist: any[], curSong: string) => {
    let index
    playlist.forEach((item, _index) => {
      if (curSong === item.mid) {
        index = _index
        return
      }
    })
    return index || 0
  }

  //上一首
  const preMusic = () => {
    if (circle !== 1) {
      const pre = findIndex(playlist, curSong) - 1
      setCurSong(playlist[pre >= 0 ? pre : playlist.length - 1].mid)
    } else {
      randomMusic()
    }
  }

  //下一首
  const nextMusic = () => {
    if (circle !== 1) {
      const pre = findIndex(playlist, curSong) + 1
      setCurSong(playlist[pre > playlist.length - 1 ? 0 : pre].mid)
    } else {
      randomMusic()
    }
  }

  //随机播放
  const randomMusic = () => {
    const randomIndex = ((Math.random() * 1000) | 0) % playlist.length
    setCurSong(playlist[randomIndex].mid)
  }

  //单曲循环
  const soloMusic = () => {
    audio.current.currentTime = 0
    audio.current.play()
    setPlay(false)
  }

  const circleChange = () => {
    setCircle(pre => (pre === 0 ? 1 : pre === 1 ? 2 : 0))
  }

  const OpenSongModal = () => {
    setOpenSongModal(pre => !pre)
  }

  const mouse = (type: boolean) => {
    setShowArrow(type)
  }

  const clickSinger = (mid: string) => {
    history.push('/Singer', { remoteplace: 'singer', mid })
    setOpenSongModal(false)
  }

  return (
    <>
      <Progress progress={progress} onControl={modifyProgress} />
      <Volume
        visible={volumeShow}
        volumeChange={volume => setVolume(volume)}
        //解决异步bug
        onClickOutside={() => (volumeShow ? setVolumeShow(false) : () => {})}
      />
      <div className={styles.container}>
        <div
          className={styles.pic}
          onMouseLeave={() => mouse(false)}
          onMouseEnter={() => mouse(true)}
        >
          {errorImg && pic ? (
            <Icon type="icon-CD" style={{ fontSize: 50, margin: '0 10px' }} />
          ) : (
            <img
              src={pic}
              alt=""
              onError={() => setErrorImg(true)}
              style={!pic ? { visibility: 'hidden' } : {}}
              onClick={OpenSongModal}
            />
          )}
          {
            <Transition in={curSong && showArrow} classNames="songimg" timeout={500}>
              <div className={styles.mask} onClick={OpenSongModal}>
                <i
                  className={classnames(
                    'iconfont',
                    `icon-dou-arrow-${openSongModal ? 'down' : 'up'}`,
                    styles.arrowImg
                  )}
                />
              </div>
            </Transition>
          }
        </div>
        <div className={styles.info}>
          <div onClick={OpenSongModal}>{info?.track_info.name}</div>
          {info && (
            <div>
              {info?.track_info?.singer?.map(({ name, mid }: any, _: number) => (
                <span key={_} className={styles.singers}>
                  <span className={styles.singer} onClick={() => clickSinger(mid)}>
                    {name}
                  </span>
                  {info?.track_info?.singer.length !== 1 &&
                  _ !== info?.track_info?.singer.length - 1
                    ? ' / '
                    : ''}
                </span>
              ))}
              {/* {info?.track_info?.singer[0].name} */}
            </div>
          )}
        </div>
        <div className={styles.control}>
          <audio
            ref={audio}
            autoPlay
            src={musicUrl}
            onTimeUpdate={() => {
              setProgress(audio.current.currentTime / audio.current.duration || 0)
              setCurTime(audio.current.currentTime * 1000)
            }}
            onEnded={() => musicEnd()}
          >
            您的浏览器不支持 audio 元素。
          </audio>
          <i
            className={classnames('iconfont', `icon-hanhan-${circle}`, styles.circle)}
            onClick={() => circleChange()}
          />
          <i
            className={classnames('iconfont', 'icon-shangyishou', styles.arrow)}
            onClick={preMusic}
          />
          <i
            className={classnames(
              'iconfont',
              play ? 'icon-toplay-hover' : 'icon-bofang1',
              styles.play
            )}
            onClick={() => setPlay(pre => !pre)}
          />
          <i
            className={classnames('iconfont', 'icon-xiayishou', styles.arrow)}
            onClick={nextMusic}
          />
          {!volume ? (
            <i
              className={classnames('iconfont', 'icon-mute', styles.voice)}
              onClick={() => setVolumeShow(true)}
            />
          ) : (
            <i
              className={classnames('iconfont', 'icon-soound-min', styles.voice)}
              onClick={() => setVolumeShow(true)}
            />
          )}
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
            <div className={styles.num}>{playlist?.length ? playlist?.length : ''}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Player
