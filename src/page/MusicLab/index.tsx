import React, { FC } from 'react'
import styles from './index.less'

interface MusicLabProps {}

const MusicLab: FC<MusicLabProps> = props => {
  return <div style={{ height: 1000, width: 300, backgroundColor: 'pink' }}>MusicLab</div>
}

export default MusicLab
