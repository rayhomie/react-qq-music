import React, { FC, useState, useEffect } from 'react'
import MacBtn from '@/components/MacBtn'
import { launchFullscreen, exitFullscreen, isFullScreen } from '@/utils/common'
import styles from './index.less'

interface MacSwitchProps {}

const MacSwitch: FC<MacSwitchProps> = props => {
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

  return (
    <div className={styles.switch} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <MacBtn type="home" show={showIcon} />
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
