import React, { FC } from 'react'
import classnames from 'classnames'
import styles from './index.less'

interface ButtonProps {
  children?: React.ReactNode
  type?: 'primary' | 'default'
  icon?: string
  style?: React.CSSProperties
  className?: string
  onClick?: () => void
}

const Button: FC<ButtonProps> = ({
  children,
  type = 'default',
  icon,
  style,
  className,
  onClick,
}) => {
  return (
    <div
      className={classnames(className, styles.button, {
        [styles[type]]: type,
      })}
      style={style}
      onClick={onClick}
    >
      {icon && <i className={`iconfont ${icon}`} />}
      {children}
    </div>
  )
}

export default Button
