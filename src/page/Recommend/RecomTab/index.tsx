import React, { FC } from 'react'
import Tab from '@/components/Tab'
import { dataSource } from './dataSource'

interface RecomTabProps {
  onChange: (key: string, label?: string) => void
}

const RecomTab: FC<RecomTabProps> = ({ onChange }) => {
  return (
    <Tab
      data={dataSource}
      onChange={(key, label) => {
        onChange(key, label)
      }}
    />
  )
}

export default RecomTab
