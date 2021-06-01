import React, { FC, useState, useRef, useEffect, useMemo } from 'react'
import classnames from 'classnames'
import useClickOutside from '@/hooks/useClickOutside'
import Transition from '@/components/Transition'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import { s_to_hs } from '@/utils/common'
import styles from './index.less'

interface PlayListModalProps {
  show: boolean
  playlist: any[]
  curSong?: any
  onClickOutside?: () => void
  onDoubleClickItem?: (mid: string) => void
  clearPlaylist?: () => void
}

const PlayListModal: FC<PlayListModalProps> = ({
  show,
  onClickOutside,
  playlist,
  curSong,
  clearPlaylist,
  onDoubleClickItem,
}) => {
  const divRef = useRef(null)
  const curRef = useRef<any>(null)
  const [errorImg, setErrorImg] = useState<any>({})

  useClickOutside(divRef, () => onClickOutside && onClickOutside())

  useEffect(() => {
    //滚动视图
    curRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [curRef.current])

  const List = useMemo(
    () =>
      playlist?.map(item => (
        <div
          ref={curSong === item.mid ? curRef : null}
          className={classnames(styles.item, { [styles.active]: curSong === item.mid })}
          onDoubleClick={() => onDoubleClickItem && onDoubleClickItem(item.mid)}
          key={item.id}
        >
          <div>
            {errorImg[item.id] ? (
              <Icon type="icon-CD" style={{ fontSize: 50 }} />
            ) : (
              <img
                src={`https://y.gtimg.cn/music/photo_new/T002R300x300M000${
                  item?.album?.mid || item.albummid
                }.jpg`}
                onError={() => {
                  setErrorImg((pre: any) => ({ ...pre, [`${item.id}`]: true }))
                }}
              />
            )}
            <div className={styles.info}>
              <div style={{ fontSize: 14 }}>{item.name}</div>
              <div style={{ fontSize: 15 }}>
                {item.singer.map(({ name, mid }: any, _: number) => (
                  <span key={_}>
                    <span>{name}</span>
                    {item.singer.length !== 1 && _ !== item.singer.length - 1 ? ' / ' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.time}>
            <div>{s_to_hs(item.interval)}</div>
          </div>
        </div>
      )),
    [playlist, errorImg, curSong, curRef.current]
  )

  return (
    <Transition in={show} classNames="playlistmodal" timeout={500}>
      <div className={styles.container} ref={divRef}>
        <div className={styles.head}>
          <div className={styles.title}>播放列表</div>
          <div className={styles.bottom}>
            <div className={styles.songNum}>{`共${
              playlist?.length ? playlist?.length : 0
            }首歌曲`}</div>
            <div className={styles.botton}>
              {false && (
                <Button type="simple" icon="icon-add">
                  添加到
                </Button>
              )}
              <Button
                type="simple"
                icon="icon-trash"
                style={{ padding: '8px 0 8px 16px' }}
                onClick={() => clearPlaylist && clearPlaylist()}
              >
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
