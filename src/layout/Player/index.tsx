import React, { FC, useEffect, useState } from 'react'
import { getSongInfo as fetchSongInfo } from '@/api/music'
import { getImageUrl } from '@/api/recommend'
import classnames from 'classnames'
import usePlayer from '@/model/player/usePlayer'
import styles from './index.less'

interface PlayerProps {}

const Player: FC<PlayerProps> = props => {
  const [pic, setPic] = useState<string>('')
  const [info, setInfo] = useState<any>(null)
  const { play, setPlay } = usePlayer()
  useEffect(() => {
    getSongInfo()
  }, [])

  const getSongInfo = async () => {
    const {
      data: {
        response: {
          songinfo: { data },
        },
      },
    } = await fetchSongInfo({ songmid: '000K40UW2j6rXq' })
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
        <img src={pic} alt="" style={!pic ? { visibility: 'hidden' } : {}} />
      </div>
      <div className={styles.info}>
        <span>{info?.track_info.name}</span>
        <span> - {info?.track_info?.singer[0].name}</span>
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
