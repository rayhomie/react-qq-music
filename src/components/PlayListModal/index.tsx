import React, { FC, useState, useRef, useEffect } from 'react'
import useClickOutside from '@/hooks/useClickOutside'
import Transition from '@/components/Transition'
import styles from './index.less'

interface PlayListModalProps {
  show: boolean
  onClickOutside?: () => void
}

const PlayListModal: FC<PlayListModalProps> = ({ show, onClickOutside }) => {
  const divRef = useRef(null)

  useClickOutside(divRef, () => onClickOutside && onClickOutside())

  return (
    <Transition in={show} classNames="playlistmodal" timeout={500}>
      <div className={styles.container} ref={divRef}>
        <div className={styles.head}>
          <div className={styles.title}>播放列表</div>
          <div className={styles.bottom}>
            <div className={styles.songNum}>{`共${30}首歌曲`}</div>
            <div className={styles.botton}></div>
          </div>
        </div>
        <div className={styles.content}></div>
      </div>
    </Transition>
  )
}

export default PlayListModal
