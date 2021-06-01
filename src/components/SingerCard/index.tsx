import React, { FC, useMemo } from 'react'
import styles from './index.less'

interface SingerCardProps {
  data: any[]
  onClick?: (mid: number) => void
}

const SingerCard: FC<SingerCardProps> = ({ data, onClick }) => {
  const card = useMemo(
    () =>
      data.map(({ name, id, mid }) => (
        <div className={styles.item} key={id}>
          <div>
            <img
              src={`http://imgcache.qq.com/music/photo/mid_singer_300/q/K/${mid}.jpg`}
              onClick={() => onClick && onClick(mid)}
            />
          </div>
          <div onClick={() => onClick && onClick(mid)}>{name}</div>
        </div>
      )),
    [data]
  )
  return <div className={styles.container}>{card}</div>
}

export default SingerCard
