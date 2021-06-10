import React, { FC, useState, useEffect } from 'react'
import useRecom from '@/model/recommend/useRecom'
import styles from './index.less'

interface NewSongPublishProps {}

const NewSongPublish: FC<NewSongPublishProps> = props => {
  const { allRecommend } = useRecom()
  const [recomPlaylist, setRecomPlaylist] = useState<any>([])

  useEffect(() => {
    setRecomPlaylist(allRecommend?.new_song.data)
    console.log(allRecommend?.new_song.data)
  }, [allRecommend])

  return <div>NewSongPublish</div>
}

export default NewSongPublish
