import React, { FC, useMemo, useState, useEffect, useCallback } from 'react'
import Icon from '@/components/Icon'
import Transition from '@/components/Transition'
import classnames from 'classnames'
import { numberFormat } from '@/utils/common'
import styles from './index.less'

interface CardProps {
  data: any[]
  showListenNum?: boolean
  onPlay?: (id: number) => void
  onView?: (id: number) => void
  clickSinger?: (id: number) => void
}

const Card: FC<CardProps> = ({ data, showListenNum = false, onPlay, onView, clickSinger }) => {
  const [list, setList] = useState<any[]>([])
  const [toplay, setToplay] = useState<{ show: boolean; title: string }>({
    show: false,
    title: '',
  })

  useEffect(() => {
    setList(data)
  }, [data])

  const RenderCard = useMemo(
    () =>
      list?.map(({ cover, title, listen_num, content_id, singers, release_time }, index) => (
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
          <div className={styles.title} onClick={() => onView && onView(content_id)}>
            {title}
          </div>
          {singers?.map(({ name, mid }: any, _: number) => (
            <span key={_} className={styles.singers}>
              <span
                className={styles.singer}
                onClick={() => {
                  clickSinger && clickSinger(mid)
                }}
              >
                {name}
              </span>
              {singers.length !== 1 && _ !== singers.length - 1 ? ' / ' : ''}
            </span>
          ))}
          <span className={styles.time}>{release_time}</span>
        </div>
      )),
    [list, toplay]
  )

  const mouseImg = (type: number, title: string) => {
    setToplay({ show: type ? true : false, title: type ? title : '' })
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardBox}>{RenderCard}</div>
    </div>
  )
}

export default Card
