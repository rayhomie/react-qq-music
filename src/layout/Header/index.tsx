import React, { FC } from 'react'
import styles from './index.less'

interface HeaderProps {}

const Header: FC<HeaderProps> = props => {
  return <div className={styles.container}>123</div>
}

export default Header
