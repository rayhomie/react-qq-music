import React, { FC, useMemo, useState, useEffect } from 'react'
import classnames from 'classnames'
import Transition from '@/components/Transition'
import styles from './index.less'

interface RankCardProps {
  dataSource: any[]
  clickSong?: (id: string) => void
  clickSinger?: (id: string) => void
  playMusic?: (id: string) => void
}

const RankCard: FC<RankCardProps> = ({ dataSource, clickSong, clickSinger, playMusic }) => {
  const [showPlayId, setShowPlayId] = useState<string>('')
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setData(
      dataSource?.map(i => ({
        ...i,
        toplist: i.toplist?.map((item: any) => ({ ...item, color: item.topId % 5 | 0 })),
      }))
    )
  }, [dataSource])

  const mouse = (type: boolean, id: string) => {
    setShowPlayId(type ? id : '')
  }

  const Item = useMemo(
    () =>
      data?.map((_item: any) =>
        _item.toplist?.map((item: any) => (
          <div
            className={classnames(styles.card, [styles[`bg_${item.color}`]])}
            key={item.topId}
            onMouseEnter={() => mouse(true, item.topId)}
            onMouseLeave={() => mouse(false, item.topId)}
          >
            <div className={styles.head}>
              <div className={styles.title}>{_item.groupName}</div>
              <div className={styles.child}>{item.title.slice(0, -1)}</div>
            </div>
            <div className={styles.playIcon}>
              <Transition in={item.topId === showPlayId} classNames="rank" timeout={300}>
                <i
                  className={classnames('iconfont', 'icon-toplay', styles.toplay)}
                  onClick={e => {
                    e.stopPropagation()
                    playMusic && playMusic(item.topId)
                  }}
                />
              </Transition>
              {item.topId !== showPlayId && <div className={styles.line} />}
            </div>
            <div className={styles.songlist}>
              {item.song.map((song: any) => (
                <div className={styles.item} key={song.songId}>
                  <div className={styles.left}>{song.rank}</div>
                  <div className={styles.right}>
                    <div
                      className={styles.name}
                      onClick={() => clickSong && clickSong(song.albumMid)}
                    >
                      {song.title}
                    </div>
                    <div
                      className={styles.singer}
                      onClick={() => clickSinger && clickSinger(song.singerMid)}
                    >
                      {song.singerName}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ),
    [data, showPlayId]
  )

  return <div className={styles.container}>{Item}</div>
}

export default RankCard
