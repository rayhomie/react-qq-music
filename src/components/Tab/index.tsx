import React, { FC, useMemo, useEffect, useState } from 'react'
import classnames from 'classnames'
import styles from './index.less'

export type DataType = {
  label: string
  key: string
}

export interface TabProps {
  data: DataType[]
  defaultActiveKey?: string
  onSelect?: (key: string, label?: string) => void
  onChange?: (key: string, label?: string) => void
}

const Tab: FC<TabProps> = ({ data, defaultActiveKey, onSelect, onChange }) => {
  const [active, setActive] = useState<string>(defaultActiveKey || data[0].key)

  useEffect(() => {
    onChange && onChange(active, data.find(item => item.key === active)?.label)
  }, [active])

  const click = (key: string, label?: string) => {
    onSelect && onSelect(key, label)
    setActive(key)
  }

  const RenderTab = useMemo(
    () =>
      data.map(({ label, key }) => {
        return (
          <div
            key={key}
            className={classnames(styles.item, {
              [styles.active]: active === key,
            })}
          >
            <div onClick={() => click(key, label)}>{label}</div>
          </div>
        )
      }),
    [data, active]
  )

  return <div className={styles.container}>{RenderTab}</div>
}

export default Tab
