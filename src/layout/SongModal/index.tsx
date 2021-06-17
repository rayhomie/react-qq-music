import React, { FC, useState, useEffect, useRef, useMemo } from 'react'
import classnames from 'classnames'
import { getLyric } from '@/api/music'
import Icon from '@/components/Icon'
import Transition from '@/components/Transition'
import usePlayer from '@/model/player/usePlayer'
import { useHistory } from 'react-router-dom'
import { s_to_hs } from '@/utils/common'
import styles from './index.less'

interface SongModalProps {}

const SongModal: FC<SongModalProps> = props => {
  const history = useHistory()
  const [scrollTime, setScrollTime] = useState<number>(0)
  const [isScroll, setIsScroll] = useState<boolean>(false)
  const lyricRef = useRef<any>(null)
  const scrollRef = useRef<any>(null)
  const timmer = useRef<any>(null)
  const {
    openSongModal,
    setOpenSongModal,
    curSong,
    setPlay,
    pic,
    errorImg,
    setErrorImg,
    lyric,
    setLyric,
    info,
    curTime,
    setPlayTime,
  } = usePlayer()

  useEffect(() => {
    fetchLyric({ songmid: curSong, isFormat: true })
  }, [curSong])

  const fetchLyric = async (param: { songmid: number | string; isFormat?: boolean }) => {
    try {
      const {
        data: {
          response: { lyric },
        },
      } = await getLyric(param)
      setLyric(lyric)
    } catch (err) {
      setLyric(null)
    }
  }

  useEffect(() => {
    lyricRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [lyricRef.current])

  const clickArrow = () => {
    setOpenSongModal(false)
  }

  const clickSinger = (mid: string) => {
    history.push('/Singer', { remoteplace: 'singer', mid })
    setOpenSongModal(false)
  }

  const clickAlbum = (mid: string) => {
    history.push('/Album', { remoteplace: 'album', mid })
    setOpenSongModal(false)
  }

  const scrollLyric = () => {
    const scrollIndex = Math.floor((scrollRef.current.scrollTop + 20) / 58)
    setScrollTime(lyric?.lines?.[scrollIndex]?.time)
  }

  const wheel = () => {
    if (timmer.current) {
      clearTimeout(timmer.current)
    }
    setIsScroll(true)
    let timer = setTimeout(() => {
      setIsScroll(false)
    }, 3000)
    timmer.current = timer
  }

  const toTime = () => {
    setPlayTime(scrollTime / 1000)
    setIsScroll(false)
  }

  const bcg = useMemo(
    () => (
      <>
        <div
          className={styles.bgc}
          style={
            pic && !errorImg
              ? {
                  background: `url('${pic}')`,
                  backgroundSize: `1600px 1600px`,
                  backgroundPosition: `center center`,
                  backgroundRepeat: `no-repeat`,
                  filter: 'blur(50px)',
                }
              : {}
          }
        ></div>
        {/* 解决高斯模糊透视问题 */}
        <div
          className={styles.bgc}
          style={
            pic && !errorImg
              ? {
                  backgroundColor: '#ffffff',
                  zIndex: -1,
                }
              : {}
          }
        ></div>
        {/* 白色为基准色调 */}
        <div
          className={styles.bgc}
          style={
            pic && !errorImg
              ? {
                  backgroundColor: '#ffffff80',
                }
              : {}
          }
        ></div>
      </>
    ),
    [pic, errorImg]
  )

  return (
    <Transition in={openSongModal} classNames="songmodal" timeout={500}>
      {bcg}
      <div className={classnames(styles.container, { [styles.noPicBg]: errorImg })}>
        <i
          className={classnames('iconfont', 'icon-arrow-down', styles.arrow)}
          onClick={clickArrow}
        />
        <div className={styles.main}>
          <div className={styles.pic}>
            {errorImg && pic ? (
              <Icon type="icon-CD" style={{ fontSize: 300 }} />
            ) : (
              <img
                src={pic}
                alt=""
                onError={() => setErrorImg(true)}
                style={!pic ? { visibility: 'hidden' } : {}}
              />
            )}
          </div>
          <div className={styles.right}>
            <div className={styles.info}>
              <div className={styles.name}>{info?.track_info.name}</div>
              <div className={styles.singerinfo}>
                <span>歌手：</span>
                {info && (
                  <span>
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
                  </span>
                )}
              </div>
              <div className={styles.album}>
                <span>专辑：</span>
                <span onClick={() => clickAlbum(info?.track_info?.album?.mid)}>
                  {info?.track_info?.album?.name}
                </span>
              </div>
            </div>
            {lyric?.lines?.length > 0 && isScroll && (
              <div className={styles.pointer}>
                <div>{s_to_hs(scrollTime / 1000)}</div>
                <i className={classnames('iconfont', 'icon-toplay')} onClick={toTime} />
              </div>
            )}
            <div className={styles.lyric} onWheel={wheel} onScroll={scrollLyric} ref={scrollRef}>
              {lyric?.lines?.map(({ time, txt }: any, index: number) => (
                <div
                  className={classnames(styles.item, {
                    [styles.active]:
                      curTime >= time && curTime < (lyric?.lines?.[index + 1]?.time || 99999999),
                    [styles.last]: lyric?.lines?.length - 1 === index,
                  })}
                  key={time}
                  ref={
                    curTime >= time && curTime < (lyric?.lines?.[index + 1]?.time || 99999999)
                      ? lyricRef
                      : null
                  }
                >
                  {txt}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default SongModal
