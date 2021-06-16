import React, { FC, useEffect } from 'react'
import classnames from 'classnames'
import { getLyric } from '@/api/music'
import Icon from '@/components/Icon'
import Transition from '@/components/Transition'
import usePlayer from '@/model/player/usePlayer'
import { useHistory } from 'react-router-dom'
import styles from './index.less'

interface SongModalProps {}

const SongModal: FC<SongModalProps> = props => {
  const history = useHistory()
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
      console.log(lyric)
    } catch (err) {
      setLyric({})
    }
  }

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

  return (
    <Transition in={openSongModal} classNames="songmodal" timeout={500}>
      <div
        className={styles.bgc}
        style={
          pic && !errorImg
            ? {
                background: `url('${pic}')`,
                backgroundSize: `2000px 2000px`,
                backgroundPosition: `center center`,
                backgroundRepeat: `no-repeat`,
                filter: 'blur(20px)',
              }
            : {}
        }
      ></div>
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
            <div className={styles.lyric}>
              {lyric?.lines?.map(({ time, txt }: any) => (
                <div className={styles.item} key={time}>
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
