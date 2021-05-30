import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.less'

interface SingerProps {}

const Singer: FC<SingerProps> = props => {
  const param = useHistory().location.state as any
  return <div>Singer</div>
}

export default Singer
