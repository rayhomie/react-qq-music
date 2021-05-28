import React, { FC, useState, useRef, useEffect } from 'react'
import classnames from 'classnames'
import styles from './index.less'

interface ProgressProps {
  progress: number
  onMouseDownProgress?: (cur: number) => void
}

const Progress: FC<ProgressProps> = ({ progress, onMouseDownProgress }) => {
  const [dot, setDot] = useState<boolean>(false)
  const containerRef = useRef<any>(null)

  const mouse = (type: boolean) => {
    setDot(type)
  }

  return (
    <div
      className={styles.container}
      onMouseEnter={() => mouse(true)}
      onMouseLeave={() => mouse(false)}
      ref={containerRef}
      onMouseDown={e => {
        const width = e.nativeEvent.offsetX <= 0 ? 0 : e.nativeEvent.offsetX
        onMouseDownProgress && onMouseDownProgress(width / containerRef.current.offsetWidth)
      }}
    >
      <div className={classnames(styles.progress)} style={{ width: `${progress * 100}%` }}>
        <div className={classnames({ [styles.dot]: dot })}></div>
      </div>
    </div>
  )
}

export default Progress
