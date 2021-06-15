import React, { FC } from 'react'
import Icon from '@/components/Icon'
import Transition from '@/components/Transition'
import usePlayer from '@/model/player/usePlayer'
import styles from './index.less'

interface SongModalProps {}

const SongModal: FC<SongModalProps> = props => {
  const { openSongModal, setOpenSongModal, curSong, setPlay } = usePlayer()

  const clickArrow = () => {
    setOpenSongModal(false)
  }

  return (
    <Transition in={openSongModal} classNames="songmodal" timeout={500}>
      <div className={styles.container}>
        SongModal
        <Icon type="icon-arrow-down" onClick={clickArrow} />
      </div>
    </Transition>
  )
}

export default SongModal
