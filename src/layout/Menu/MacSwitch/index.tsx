import React, { FC, useState, useEffect } from 'react'
import MacBtn from '@/components/MacBtn'
import usePlayer from '@/model/player/usePlayer'
import useRecom from '@/model/recommend/useRecom'
import { useHistory } from 'react-router-dom'
import { launchFullscreen, exitFullscreen, isFullScreen } from '@/utils/common'
import styles from './index.less'

interface MacSwitchProps {}

const MacSwitch: FC<MacSwitchProps> = props => {
  const { setOpenSongModal } = usePlayer()
  const { setActive } = useRecom()
  const history = useHistory()
  const [showIcon, setShowIcon] = useState<boolean>(false)
  const [min, setMin] = useState<boolean>(true)

  const handleMouseEnter = () => {
    setShowIcon(true)
  }

  const handleMouseLeave = () => {
    setShowIcon(false)
  }

  const full = () => {
    launchFullscreen(document.documentElement)
    setMin(!min)
  }

  const mid = () => {
    exitFullscreen(document)
    setMin(!min)
  }

  const minWindow = () => {
    exitFullscreen(document)
    setMin(true)
  }

  const toHome = () => {
    history.push('/')
    setActive('0')
    setOpenSongModal(false)
  }

  return (
    <div className={styles.switch} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <MacBtn type="home" show={showIcon} onClick={toHome} />
      <MacBtn type="min" show={showIcon} onClick={minWindow} />
      {min ? (
        <MacBtn type="full" show={showIcon} onClick={full} />
      ) : (
        <MacBtn type="mid" show={showIcon} onClick={mid} />
      )}
    </div>
  )
}

export default MacSwitch
