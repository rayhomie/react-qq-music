import React, { FC, useState, useEffect } from 'react'
import Icon from '@/components/Icon'
import MacSwitch from './MacSwitch'
import OnlineMusic from './OnlineMusic'
import MyMusic from './MyMusic'
import { useHistory } from 'react-router-dom'
import styles from './index.less'
import CONST from '@/const'
import { router } from '@/router'

interface MenuProps {}

const Menu: FC<MenuProps> = props => {
  const [selected, setSelected] = useState<number>(1)
  const history = useHistory()

  //选择侧边栏
  const handleSelect = (id: number) => {
    setSelected(id)
  }
  //侧边栏变化
  const handleChange = (id: number) => {
    history.push(router[id])
  }

  return (
    <div className={styles.container}>
      <MacSwitch />
      <Icon className={styles.logo} type="icon-qqmusic" />
      <div className={styles.title}>{CONST['ONLINE_MUSIC']}</div>
      <OnlineMusic selected={selected} onSelect={handleSelect} />
      <div className={styles.title}>{CONST['MY_MUSIC']}</div>
      <MyMusic selected={selected} onSelect={handleSelect} onChange={handleChange} />
    </div>
  )
}

export default Menu
