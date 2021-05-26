import React, { FC, useState } from 'react'
import classnames from 'classnames'
import Transition from '@/components/Transition'
import { numberFormat } from '@/utils/common'
import styles from './index.less'

interface CardProps {
  listen_num?: number
  title: string
}

const Card: FC<CardProps> = ({ listen_num, title }) => {
  const [toplay, setToplay] = useState<{ show: boolean; title: string }>({
    show: false,
    title: '',
  })
  return (
    <>
      <Transition classNames="toplayAnim" in={toplay.title === title && toplay.show} timeout={300}>
        <i className={classnames('iconfont', 'icon-toplay', styles.toplay)} />
      </Transition>
      <Transition in={!(toplay.title === title && toplay.show)} timeout={0}>
        {listen_num && (
          <div className={styles.listen}>
            <i className={classnames('iconfont', 'icon-listen')} />
            {numberFormat(listen_num)}
          </div>
        )}
      </Transition>
    </>
  )
}

export default Card
