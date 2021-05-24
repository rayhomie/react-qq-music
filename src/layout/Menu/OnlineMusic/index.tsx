import React, { FC, useState } from 'react'
import SideBar, { SideBarProps } from '@/components/SideBar'
import { dataSource } from './dataSource'
import styles from './index.less'

interface OnlineMusicProps extends Omit<SideBarProps, 'data'> {}

const OnlineMusic: FC<OnlineMusicProps> = ({ selected, onChange, onSelect }) => {
  return <SideBar selected={selected} onSelect={onSelect} onChange={onChange} data={dataSource} />
}

export default OnlineMusic
