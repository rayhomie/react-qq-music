import React, { FC, useState } from 'react'
import Icon from '@/components/Icon'
import MacSwitch from './MacSwitch'
import OnlineMusic from './OnlineMusic'
import MyMusic from './MyMusic'
import styles from './index.less'
import CONST from '@/const'

interface MenuProps {}

const Menu: FC<MenuProps> = props => {
  const [selected, setSelected] = useState<number>(0)
  //选择侧边栏
  const handleSelect = (id: number) => {
    setSelected(id)
  }
  //侧边栏变化
  const handleChange = (id: number) => {
    console.log(id)
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
