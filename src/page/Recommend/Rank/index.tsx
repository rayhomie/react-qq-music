import React, { FC, useState, useEffect } from 'react'
import useRecom from '@/model/recommend/useRecom'
import RankCard from '@/components/RankCard'
import { getRanks } from '@/api/recommend'
import { getAlbumInfo } from '@/api/album'
import { useHistory } from 'react-router-dom'
import styles from './index.less'

interface RankProps {}

const Rank: FC<RankProps> = props => {
  const history = useHistory()
  const { allRecommend } = useRecom()
  const [info, setInfo] = useState<any>([])

  useEffect(() => {
    setInfo(allRecommend?.toplist.data.group)
    console.log(allRecommend?.toplist.data.group)
  }, [allRecommend])

  const clickSong = (mid: string) => {
    history.push('/Album', { remoteplace: 'album', mid })
  }

  const clickSinger = (mid: string) => {
    history.push('/Singer', { remoteplace: 'song', mid })
  }

  const playMusic = async (topId: string) => {
    const {
      data: {
        response: {
          detail: {
            data,
            // : {
            //   data: { song },
            // },
          },
        },
      },
    } = await getRanks({ topId, page: 1, limit: 100 })
    console.log(data)
  }

  return (
    <div className={styles.container}>
      <RankCard
        dataSource={info}
        clickSong={clickSong}
        clickSinger={clickSinger}
        playMusic={playMusic}
      />
    </div>
  )
}

export default Rank
