import React, { FC, useMemo, useState, useEffect, useCallback } from 'react'
import Icon from '@/components/Icon'
import Transition from '@/components/Transition'
import classnames from 'classnames'
import { CardListProps, DataType } from './index.d'
import { numberFormat } from '@/utils/common'
import styles from './index.less'

const CardList: FC<CardListProps> = ({ data, size = 8, showListenNum = false, onPlay, onView }) => {
  const [list, setList] = useState<DataType[]>([])
  const [current, setCurrent] = useState<number>(1)
  const [show, setShow] = useState<boolean>(false)
  const [toplay, setToplay] = useState<{ show: boolean; title: string }>({
    show: false,
    title: '',
  })

  const Slice = useCallback((data, cur, size) => {
    const res = data?.slice((cur - 1) * size, cur * size)
    return new Array(size)
      .fill({
        title: 'no123',
        cover: '',
      })
      .map((i, index) => ({ ...i, ...res?.[index] }))
  }, [])

  useEffect(() => {
    setList(Slice(data, current, size))
  }, [data, current])

  const RenderCard = useMemo(
    () =>
      list?.map(({ cover, title, listen_num, content_id }, index) => (
        <div key={index} style={title === 'no123' ? { visibility: 'hidden' } : {}}>
          <div
            className={styles.item}
            onMouseEnter={() => mouseImg(1, title)}
            onMouseLeave={() => mouseImg(0, title)}
            onClick={() => onView && onView(content_id)}
          >
            <Transition
              classNames="toplayAnim"
              in={toplay.title === title && toplay.show}
              timeout={300}
            >
              <i
                className={classnames('iconfont', 'icon-toplay', styles.toplay)}
                onClick={e => {
                  e.stopPropagation()
                  onPlay && onPlay(content_id)
                }}
              />
            </Transition>
            {showListenNum && (
              <Transition in={!(toplay.title === title && toplay.show)} timeout={0}>
                <div className={styles.listen}>
                  <i className={classnames('iconfont', 'icon-listen')} />
                  {numberFormat(listen_num)}
                </div>
              </Transition>
            )}
            <img src={cover} alt={title} />
          </div>
          <div onClick={() => onView && onView(content_id)}>{title}</div>
        </div>
      )),
    [list, toplay]
  )

  const prev = () => {
    if (current <= 1) return
    setCurrent(pre => pre - 1)
  }

  const next = () => {
    if (current >= Math.ceil(data?.length / 8)) return
    setCurrent(pre => pre + 1)
  }

  const mouse = (type: number) => {
    setShow(type ? true : false)
  }

  const mouseImg = (type: number, title: string) => {
    setToplay({ show: type ? true : false, title: type ? title : '' })
  }

  return (
    <div className={styles.container} onMouseEnter={() => mouse(1)} onMouseLeave={() => mouse(0)}>
      <div className={classnames(styles.icon)}>
        <Transition in={show} animation="zoom-in-right" timeout={500}>
          <Icon type="icon-left-arrow" onClick={() => prev()} />
        </Transition>
      </div>
      <div className={styles.cardBox}>{RenderCard}</div>
      <div className={classnames(styles.icon, styles.rightIcon)}>
        <Transition in={show} animation="zoom-in-left" timeout={500}>
          <Icon type="icon-right-arrow" onClick={() => next()} />
        </Transition>
      </div>
    </div>
  )
}

export default CardList
