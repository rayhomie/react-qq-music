import React, { FC, useEffect, useState } from 'react'
import { getSongInfo as fetchSongInfo } from '@/api/music'
import { getImageUrl } from '@/api/recommend'
import Icon from '@/components/Icon'
import classnames from 'classnames'
import usePlayer from '@/model/player/usePlayer'
import styles from './index.less'

interface PlayerProps {}

const Player: FC<PlayerProps> = props => {
  const [pic, setPic] = useState<string>('')
  const [info, setInfo] = useState<any>(null)
  const { play, setPlay, playlist, setPlaylist, curSong, setCurSong } = usePlayer()
  const [errorImg, setErrorImg] = useState<boolean>(false)

  useEffect(() => {
    curSong && getSongInfo()
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

  return (
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
      <div className={styles.playlist}></div>
    </div>
  )
}

export default Player
