import React, { FC, useState } from 'react'
import MacSwitch from './components/MacSwitch'
import styles from './index.less'

interface MenuProps {}

const Menu: FC<MenuProps> = props => {
  return (
    <div className={styles.container}>
      <MacSwitch />
    </div>
  )
}

export default Menu
