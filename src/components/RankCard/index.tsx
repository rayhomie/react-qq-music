import React, { FC, useMemo } from 'react'
import classnames from 'classnames'
import styles from './index.less'

interface RankCardProps {
  data: any[]
}

const RankCard: FC<RankCardProps> = ({ data }) => {
  const Item = useMemo(
    () =>
      data?.map((_item: any) => {
        return _item.toplist?.map((item: any) => (
          <div className={classnames(styles.card, [styles[`bg_${(Math.random() * 10) % 5 | 0}`]])}>
            <div className={styles.head}>
              <div className={styles.title}>巅峰榜</div>
              <div className={styles.child}>热歌</div>
            </div>
            <div className={styles.playIcon}>
              <i
                className={classnames('iconfont', 'icon-toplay', styles.toplay)}
                onClick={e => {
                  e.stopPropagation()
                }}
              />
            </div>
            <div className={styles.songlist}></div>
          </div>
        ))
      }),
    [data]
  )

  return <div className={styles.container}>{Item}</div>
}

export default RankCard
