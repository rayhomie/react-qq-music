import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.less'

interface AlbumProps {}

const Album: FC<AlbumProps> = props => {
  const history = useHistory()
  const param = history.location.state as any
  return <div>Album</div>
}

export default Album
