import React, { FC } from 'react'
import styles from './index.less'

interface ProgressProps {
  progress: number
}

const Progress: FC<ProgressProps> = ({ progress }) => {
  return (
    <div className={styles.container}>
      <div className={styles.progress} style={{ width: `${progress * 100}%` }}></div>
    </div>
  )
}

export default Progress
