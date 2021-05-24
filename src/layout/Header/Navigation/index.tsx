import React, { FC } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import classnames from 'classnames'
import styles from './index.less'

interface NavigationProps {
  disabled?: [boolean, boolean]
  onBack?: () => void
  onForward?: () => void
}

const Navigation: FC<NavigationProps> = ({
  disabled = [false, false],
  onBack = () => {},
  onForward = () => {},
}) => {
  return (
    <div className={styles.container}>
      <div
        className={classnames({ [styles.disabled]: disabled[0] })}
        onClick={() => {
          !disabled[0] && onBack()
        }}
      >
        <LeftOutlined />
      </div>
      <div
        className={classnames({ [styles.disabled]: disabled[1] })}
        onClick={() => {
          !disabled[1] && onForward()
        }}
      >
        <RightOutlined />
      </div>
    </div>
  )
}

export default Navigation
