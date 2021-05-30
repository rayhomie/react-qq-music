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
}

const Card: FC<CardProps> = ({ data, showListenNum = false, onPlay, onView }) => {
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
