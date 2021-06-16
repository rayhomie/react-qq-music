import React, { FC } from 'react'
import classnames from 'classnames'
import Icon from '@/components/Icon'
import Transition from '@/components/Transition'
import usePlayer from '@/model/player/usePlayer'
import styles from './index.less'

interface SongModalProps {}

const SongModal: FC<SongModalProps> = props => {
  const { openSongModal, setOpenSongModal, curSong, setPlay, pic, errorImg, setErrorImg } =
    usePlayer()

  const clickArrow = () => {
    setOpenSongModal(false)
  }

  return (
    <Transition in={openSongModal} classNames="songmodal" timeout={500}>
      <div className={styles.container}>
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
            <div className={styles.lyric}></div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default SongModal
