import React, { FC } from 'react'
import classnames from 'classnames'
import styles from './index.less'

interface ButtonProps {
  children?: React.ReactNode
  type?: 'primary' | 'default' | 'simple' | 'more'
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
      {icon && type !== 'more' && <i className={`iconfont ${icon}`} />}
      {children}
      {icon && type === 'more' && <i className={`iconfont ${icon}`} />}
    </div>
  )
}

export default Button
