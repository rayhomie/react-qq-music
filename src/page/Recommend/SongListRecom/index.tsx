import React, { FC, useEffect, useState } from 'react'
import CardList from '@/components/CardList'
import useRecom from '@/model/recommend/useRecom'
import { useHistory } from 'react-router-dom'
import { getSongListDetail } from '@/api/songlist'
import usePlayer from '@/model/player/usePlayer'
import styles from './index.less'

interface SongListRecomProps {}

const SongListRecom: FC<SongListRecomProps> = props => {
  const history = useHistory()
  const { allRecommend } = useRecom()
  const [recomPlaylist, setRecomPlaylist] = useState<any>([])
  const { setPlaylist, curSong, setCurSong } = usePlayer()

  useEffect(() => {
    setRecomPlaylist(allRecommend?.recomPlaylist?.data?.v_hot)
  }, [allRecommend])

  const fetchApi = async (param: any) => {
    const {
      data: {
        response: { cdlist },
      },
    } = await getSongListDetail(param)
    setPlaylist(cdlist[0]?.songlist)
    setCurSong(cdlist[0]?.songlist[0]['mid'])
  }

  return (
    <div>
      <CardList
        data={recomPlaylist}
        showListenNum
        onPlay={id => {
          fetchApi({ disstid: id })
        }}
        onView={id => {
          history.push('/SongListDetail', { disstid: id })
        }}
      />
    </div>
  )
}

export default SongListRecom
