import React, { FC } from 'react'
import SideBar, { SideBarProps } from '@/components/SideBar'
import { dataSource } from './dataSource'
import styles from './index.less'

interface MyMusicProps extends Omit<SideBarProps, 'data'> {}
{
}

const MyMusic: FC<MyMusicProps> = ({ selected, onChange, onSelect }) => {
  return <SideBar selected={selected} onSelect={onSelect} onChange={onChange} data={dataSource} />
}

export default MyMusic
