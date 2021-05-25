import React, { FC, useEffect, useState } from 'react'
import CardList from '@/components/CardList'
import useRecom from '@/model/recommend/useRecom'
import styles from './index.less'

interface SongListRecomProps {}

const SongListRecom: FC<SongListRecomProps> = props => {
  const { allRecommend } = useRecom()
  const [recomPlaylist, setRecomPlaylist] = useState<any>([])

  useEffect(() => {
    setRecomPlaylist(allRecommend?.recomPlaylist?.data?.v_hot)
  }, [allRecommend])

  return (
    <div>
      <CardList data={recomPlaylist} />
    </div>
  )
}

export default SongListRecom
