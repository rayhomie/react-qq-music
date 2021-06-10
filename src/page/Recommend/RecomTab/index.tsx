import React, { FC } from 'react'
import Tab from '@/components/Tab'
import { dataSource } from './dataSource'

interface RecomTabProps {
  onChange: (key: string, label?: string) => void
  defaultActiveKey?: string
  activeKey?: string
}

const RecomTab: FC<RecomTabProps> = ({ onChange, defaultActiveKey, activeKey }) => {
  return (
    <Tab
      data={dataSource}
      onChange={(key, label) => {
        onChange(key, label)
      }}
      defaultActiveKey={defaultActiveKey}
      activeKey={activeKey}
    />
  )
}

export default RecomTab
