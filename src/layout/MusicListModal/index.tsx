import React, { FC } from 'react'
import PlayListModal from '@/components/PlayListModal'
import usePlayer from '@/model/player/usePlayer'
import styles from './index.less'

interface MusicListModalProps {}

const MusicListModal: FC<MusicListModalProps> = props => {
  const { openPlaylist, setOpenPlaylist, playlist, setPlaylist, curSong, setCurSong, setPlay } =
    usePlayer()
  return (
    <PlayListModal
      show={openPlaylist}
      onClickOutside={() => {
        openPlaylist && setOpenPlaylist(false)
      }}
      clearPlaylist={() => {
        setCurSong(null)
        setPlaylist([])
      }}
      onDoubleClickItem={mid => {
        setCurSong(mid)
      }}
      playlist={playlist}
      curSong={curSong}
    />
  )
}

export default MusicListModal
