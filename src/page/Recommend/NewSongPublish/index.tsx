import React, { FC, useState, useEffect, useMemo } from 'react'
import useRecom from '@/model/recommend/useRecom'
import usePlayer from '@/model/player/usePlayer'
import Transition from '@/components/Transition'
import { useHistory } from 'react-router-dom'
import Icon from '@/components/Icon'
import { s_to_hs } from '@/utils/common'
import styles from './index.less'

interface NewSongPublishProps {}

const NewSongPublish: FC<NewSongPublishProps> = props => {
  const history = useHistory()
  const { allRecommend } = useRecom()
  const { setPlaylist, curSong, setCurSong } = usePlayer()
  const [recomPlaylist, setRecomPlaylist] = useState<any>([])
  const [toplay, setToplay] = useState<{ show: boolean; title: string }>({
    show: false,
    title: '',
  })

  useEffect(() => {
    setRecomPlaylist(allRecommend?.new_song?.data.songlist)
  }, [allRecommend])

  const playMusic = (mid: string) => {
    setCurSong(mid)
    setPlaylist(recomPlaylist)
  }

  const clickSinger = (mid: string) => {
    history.push('/Singer', { remoteplace: 'singer', mid })
  }

  const clickAlbum = (mid: string) => {
    history.push('/Album', { remoteplace: 'album', mid })
  }

  const card = useMemo(
    () => (
      <div className={styles.list}>
        {recomPlaylist?.map((item: any) => (
          <div className={styles.card} key={item.id}>
            <div
              className={styles.left}
              onMouseEnter={() => setToplay(pre => ({ ...pre, show: true, title: item.name }))}
              onMouseLeave={() => setToplay(pre => ({ ...pre, show: false, title: '' }))}
            >
              <Transition
                classNames="toplay"
                in={toplay.title === item.name && toplay.show}
                timeout={300}
                className={styles.toplay}
              >
                <Icon
                  type="icon-toplay"
                  onClick={e => {
                    e.stopPropagation()
                    playMusic(item.mid)
                  }}
                />
              </Transition>
              <img
                src={`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item?.album.mid}.jpg`}
                onClick={() => clickAlbum(item.album.mid)}
              />
            </div>
            <div className={styles.right}>
              <div className={styles.name}>
                <span onClick={() => clickAlbum(item.album.mid)}>{item.name}</span>
                <div className={styles.singerCon}>
                  {item.singer?.map(({ name, mid }: any, _: number) => (
                    <span key={_}>
                      <span
                        className={styles.singer}
                        onClick={() => {
                          clickSinger(mid)
                        }}
                      >
                        {name}
                      </span>
                      {item.singer.length !== 1 && _ !== item.singer.length - 1 ? ' / ' : ''}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.time}>{s_to_hs(item.interval)}</div>
            </div>
          </div>
        ))}
      </div>
    ),
    [recomPlaylist, toplay]
  )

  return <div className={styles.container}>{card}</div>
}

export default NewSongPublish
