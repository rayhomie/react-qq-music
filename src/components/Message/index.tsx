import React, { FC } from 'react'
import useMsg from '@/model/msg/useMsg'
import Transition from '@/components/Transition'
import styles from './index.less'

interface MessageProps {}

const Message: FC<MessageProps> = props => {
  const { config } = useMsg()
  return (
    <Transition in={config.show} classNames="message" className={styles.container} timeout={1000}>
      <div>{config.content}</div>
    </Transition>
  )
}

export default Message
