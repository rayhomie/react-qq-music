import React, { FC, useMemo, useState, useEffect, useCallback } from 'react'
import Icon from '@/components/Icon'
import { CardListProps, DataType } from './index.d'
import styles from './index.less'

const CardList: FC<CardListProps> = ({ data }) => {
  const [list, setList] = useState<DataType[]>([])
  const [current, setCurrent] = useState<number>(1)

  const Slice = useCallback((data, cur, size) => {
    return data?.slice((cur - 1) * size, cur * size)
  }, [])

  useEffect(() => {
    setList(Slice(data, current, 8))
  }, [data, current])

  const RenderCard = useMemo(
    () =>
      list?.map(({ cover, title }) => (
        <div key={title}>
          <img src={cover} alt={title} />
          <div>{title}</div>
        </div>
      )),
    [list]
  )

  const prev = () => {
    if (current <= 1) return
    setCurrent(pre => pre - 1)
  }

  const next = () => {
    if (current >= Math.ceil(data?.length / 8)) return
    setCurrent(pre => pre + 1)
  }

  return (
    <div className={styles.container}>
      <Icon className={styles.icon} type="icon-left-arrow" onClick={() => prev()} />
      <div className={styles.cardBox}>{RenderCard}</div>
      <Icon className={styles.icon} type="icon-right-arrow" onClick={() => next()} />
    </div>
  )
}

export default CardList
