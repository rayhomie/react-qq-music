import React, { FC, useEffect, useState } from 'react'
import RecomTab from './RecomTab'
import { getRecommend } from '@/api/recommend'
import useRecom from '@/model/recommend/useRecom'
import SongListRecom from './SongListRecom'
import NewSongPublish from './NewSongPublish'
import WonderfullRecom from './WonderfullRecom'
import NewDishPublish from './NewDishPublish'
import Rank from './Rank'
import MV from './MV'
import styles from './index.less'

interface RecommendProps {}

const TabMap: any = {
  '0': <SongListRecom />,
  '1': <NewSongPublish />,
  '2': <WonderfullRecom />,
  '3': <NewDishPublish />,
  '4': <Rank />,
  '5': <MV />,
}

const Recommend: FC<RecommendProps> = props => {
  const { setAllRecommend } = useRecom()
  const [active, setActive] = useState<string>('0')

  useEffect(() => {
    fetchApi()
  }, [])

  const fetchApi = async () => {
    const {
      data: { response },
    } = await getRecommend()

    setAllRecommend(response)
  }

  const tabChange = (key: string, label?: string) => {
    setActive(key)
  }

  return (
    <div className={styles.container}>
      <RecomTab onChange={(key, label) => tabChange(key, label)} />
      {TabMap[active]}
    </div>
  )
}

export default Recommend
