import React, { FC } from 'react'
import classnames from 'classnames'
import styles from './index.less'

interface ButtonProps {
  children?: React.ReactNode
  type?: 'primary' | 'default'
  icon?: string
  style?: React.CSSProperties
  className?: string
}

const Button: FC<ButtonProps> = ({ children, type = 'default', icon, style, className }) => {
  return (
    <div
      className={classnames(className, styles.button, {
        [styles[type]]: type,
      })}
      style={style}
    >
      {icon && <i className={`iconfont ${icon}`} />}
      {children}
    </div>
  )
}

export default Button
