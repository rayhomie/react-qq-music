import React, { FC } from 'react'
import styles from './index.less'

interface PlayerProps {}

const Player: FC<PlayerProps> = props => {
  return <div className={styles.container}>123</div>
}

export default Player
