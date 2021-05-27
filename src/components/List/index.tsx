import React, { FC, useEffect, useState, useMemo, useCallback } from 'react'
import classnames from 'classnames'
import { s_to_hs } from '@/utils/common'
import styles from './index.less'

type Columns = {
  title: string
  dataIndex: string
  key: string
}

type DataType = { key?: string } & any

interface ListProps {
  data: DataType[]
  columns: Columns[]
  onClickSong?: (id: number) => void
  onClickSinger?: (item: any) => void
  onClickAlbum?: (item: any) => void
  currentSongId?: string | number
}

const List: FC<ListProps> = ({
  data,
  columns,
  onClickSong,
  onClickSinger,
  onClickAlbum,
  currentSongId,
}) => {
  const [select, setSelect] = useState<string | number>()

  const method = useCallback((data, dataIndex, index) => {
    return [
      data[dataIndex],
      data[dataIndex]?.[0]?.name,
      data[dataIndex]?.name,
      s_to_hs(data[dataIndex]),
    ][index]
  }, [])

  const renderTitle = useMemo(
    () => (
      <div className={classnames(styles.wrapper, styles.title)}>
        {columns.map((item, index) => (
          <div
            className={classnames(styles.item, styles[`title${index}`])}
            key={item.key || item.dataIndex}
          >
            {item.title}
          </div>
        ))}
      </div>
    ),
    [columns]
  )

  const renderContent = useMemo(
    () =>
      data?.map(item => (
        <div key={item.id} className={classnames(styles.wrapper, styles.content)}>
          {columns.map(({ dataIndex, key }, index) => {
            return (
              <div
                className={classnames(styles.item, styles[`title${index}`])}
                key={key || dataIndex}
              >
                <span
                  onClick={() => {
                    index === 0 && setSelect(item.mid)
                    onClickSong && index === 0 && onClickSong(item['mid'])
                    onClickSinger && index === 1 && onClickSinger(item[dataIndex])
                    onClickAlbum && index === 2 && onClickAlbum(item[dataIndex])
                  }}
                  className={classnames({
                    [styles.select]: select ? select === item.mid : currentSongId === item.mid,
                  })}
                >
                  {method(item, dataIndex, index)}
                </span>
              </div>
            )
          })}
        </div>
      )),
    [data, columns, select, currentSongId]
  )

  return (
    <div className={styles.container}>
      {renderTitle}
      {renderContent}
    </div>
  )
}

export default List
