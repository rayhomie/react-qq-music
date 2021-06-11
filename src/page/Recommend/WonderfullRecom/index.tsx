import React, { FC, useState, useEffect, useRef } from 'react'
import useRecom from '@/model/recommend/useRecom'
import classnames from 'classnames'
import { useHistory } from 'react-router-dom'
import styles from './index.less'

interface WonderfullRecomProps {
  intervalIime?: number
}

const WonderfullRecom: FC<WonderfullRecomProps> = ({ intervalIime = 3000 }) => {
  const history = useHistory()
  const { allRecommend } = useRecom()
  const [info, setInfo] = useState<any>([])
  //当前索引
  const [cur, setCur] = useState<number>(0)
  const img = useRef<any>(null)

  useEffect(() => {
    setInfo(allRecommend?.focus.data.content)
  }, [allRecommend])

  useEffect(() => {
    const interval = setInterval(() => {
      setCur(pre => {
        if (pre === info.length - 1) {
          return 0
        } else {
          return pre + 1
        }
      })
    }, intervalIime)
    return () => clearInterval(interval)
  }, [info])

  const goUrl = (url: string) => {
    history.push('/Album', { remoteplace: 'album', mid: url })
  }

  return (
    <div className={styles.container}>
      {info?.map((item: any, index: number) => (
        <img
          className={styles.img}
          key={item?.id}
          src={item?.pic_info.url}
          ref={index ? undefined : img}
          style={{
            transform: `translateX(-${
              cur * (img.current?.clientWidth ? img.current?.clientWidth + 20 : 0)
            }px)`,
          }}
          onClick={() => goUrl(item.jump_info.url)}
        />
      ))}
      <div className={styles.dotContainer}>
        {info?.map((item: any, index: number) => (
          <div
            key={item?.id}
            className={classnames(styles.dot, {
              [styles.active]: cur === index,
            })}
            onClick={() => {
              setCur(index)
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default WonderfullRecom
