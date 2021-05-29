import React, { FC, useState, useRef, useEffect, useMemo } from 'react'
import useClickOutside from '@/hooks/useClickOutside'
import Transition from '@/components/Transition'
import Button from '@/components/Button'
import { s_to_hs } from '@/utils/common'
import styles from './index.less'

interface PlayListModalProps {
  show: boolean
  playlist: any[]
  onClickOutside?: () => void
}

const PlayListModal: FC<PlayListModalProps> = ({ show, onClickOutside, playlist }) => {
  const divRef = useRef(null)

  useClickOutside(divRef, () => onClickOutside && onClickOutside())

  // useEffect(() => {
  //   const song = playlist[0]
  //   console.log(
  //     song?.name,
  //     song?.singer[0].name,
  //     song?.interval,
  //     `https://y.gtimg.cn/music/photo_new/T002R300x300M000${song?.album.mid}.jpg?max_age=2592000`
  //   )
  // }, [playlist])

  const List = useMemo(
    () =>
      playlist?.map(item => (
        <div>
          <img src={`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.mid}.jpg`} />
          <div>
            <div>{item.name}</div>
            <div>{item.singer[0].name}</div>
          </div>
          <div>
            <div>{s_to_hs(item.interval)}</div>
          </div>
        </div>
      )),
    [playlist]
  )

  return (
    <Transition in={show} classNames="playlistmodal" timeout={500}>
      <div className={styles.container} ref={divRef}>
        <div className={styles.head}>
          <div className={styles.title}>播放列表</div>
          <div className={styles.bottom}>
            <div className={styles.songNum}>{`共${playlist?.length}首歌曲`}</div>
            <div className={styles.botton}>
              {false && (
                <Button type="simple" icon="icon-add">
                  添加到
                </Button>
              )}
              <Button type="simple" icon="icon-trash">
                清空
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.content}>{List}</div>
      </div>
    </Transition>
  )
}

export default PlayListModal
