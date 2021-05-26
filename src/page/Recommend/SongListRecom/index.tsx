import React, { FC, useEffect, useState } from 'react'
import CardList from '@/components/CardList'
import useRecom from '@/model/recommend/useRecom'
import { useHistory } from 'react-router-dom'
import styles from './index.less'

interface SongListRecomProps {}

const SongListRecom: FC<SongListRecomProps> = props => {
  const history = useHistory()
  const { allRecommend } = useRecom()
  const [recomPlaylist, setRecomPlaylist] = useState<any>([])

  useEffect(() => {
    setRecomPlaylist(allRecommend?.recomPlaylist?.data?.v_hot)
  }, [allRecommend])

  return (
    <div>
      <CardList
        data={recomPlaylist}
        showListenNum
        onPlay={id => {
          console.log('onPlay:', id)
        }}
        onView={id => {
          history.push('/SongListDetail', { disstid: id })
        }}
      />
    </div>
  )
}

export default SongListRecom
