import React, { FC, useEffect, useMemo } from 'react'
import Icon from '@/components/Icon'
import classnames from 'classnames'
import styles from './index.less'

export type DataType = {
  label: string
  id: number
  iconfont: string
  show?: boolean
}

export interface SideBarProps {
  data: DataType[]
  selected: number
  onSelect: (id: number) => void
  onChange?: (id: number) => void
}

const SideBar: FC<SideBarProps> = ({ data, selected, onSelect, onChange }) => {
  useEffect(() => {
    onChange && onChange(selected)
  }, [selected])
  const Render = useMemo(
    () =>
      data.map(
        ({ label, id, iconfont, show }) =>
          show && (
            <div
              key={id}
              className={classnames(styles.item, {
                [styles.click]: id === selected,
              })}
              onClick={() => onSelect(id)}
            >
              <div>
                <Icon type={id !== selected ? iconfont : `${iconfont}-active`} />
              </div>
              <div>{label}</div>
            </div>
          )
      ),
    [data, selected]
  )

  return <div className={styles.container}>{Render}</div>
}

export default SideBar
