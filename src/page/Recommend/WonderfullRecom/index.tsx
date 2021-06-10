import React, { FC, useState, useEffect, useRef } from 'react'
import useRecom from '@/model/recommend/useRecom'
import classnames from 'classnames'
import { useHistory } from 'react-router-dom'
import styles from './index.less'

interface WonderfullRecomProps {}

const WonderfullRecom: FC<WonderfullRecomProps> = props => {
  const history = useHistory()
  const { allRecommend } = useRecom()
  const [info, setInfo] = useState<any>([])
  const [curBanner, setCurBanner] = useState<number>(0)
  const img = useRef<any>(null)

  useEffect(() => {
    setInfo(allRecommend?.focus.data.content)
    console.log(allRecommend?.focus.data.content)
  }, [allRecommend])

  // useEffect(() => {
  //   intervalBanner(2)
  // }, [img.current])

  // const intervalBanner = (index: number) => {
  //   let width = (img.current as any)?.clientWidth + 20
  //   let i = index
  // }

  return (
    <div className={styles.container}>
      {info?.map((item: any, index: number) => (
        <img
          className={styles.img}
          key={item?.id}
          src={item?.pic_info.url}
          ref={index ? undefined : img}
          style={{
            transform: curBanner ? `translateX(-${curBanner}px)` : `translateX(${curBanner}px)`,
          }}
        />
      ))}
      <div className={styles.dotContainer}>
        {info?.map((item: any, index: number) => (
          <div
            key={item?.id}
            className={classnames(styles.dot, {
              [styles.active]: index
                ? curBanner / index === (img.current as any)?.clientWidth + 20
                : curBanner === 0,
            })}
            onClick={() => {
              let width = (img.current as any)?.clientWidth + 20
              setCurBanner(width * index)
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default WonderfullRecom
