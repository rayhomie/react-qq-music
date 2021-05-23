import React, { FC } from 'react'
import styles from './index.less'

interface MacBtnProps {
  show?: boolean
  type?: string
  onClick?: () => void
}

const TypeMap: any = {
  home: ['icon-home', '#ec6a5e'],
  min: ['icon-jian', '#f6bd4f'],
  black: ['', '#424242'],
  full: ['icon-screen-stretch', '#62c455'],
  mid: ['icon-screen-shrink', '#62c455'],
}

const MacBtn: FC<MacBtnProps> = ({ show = false, type = 'close', onClick }) => {
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: TypeMap[type][1] }}
      onClick={onClick}
    >
      {show && <i className={`iconfont ${TypeMap[type][0]} ${styles.icon}`} />}
    </div>
  )
}

export default MacBtn
