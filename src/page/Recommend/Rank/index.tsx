import React, { FC, useState, useEffect } from 'react'
import useRecom from '@/model/recommend/useRecom'
import RankCard from '@/components/RankCard'
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

  return (
    <div className={styles.container}>
      <RankCard data={info} />
    </div>
  )
}

export default Rank
