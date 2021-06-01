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
  onClickSong?: (id: any) => void
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
  const method = useCallback((data, dataIndex, index) => {
    return [
      data[dataIndex],
      dataIndex === 'singer' &&
        data[dataIndex]?.map(({ name, mid }: any, _: number) => (
          <span key={_}>
            <span onClick={() => onClickSinger && onClickSinger(mid)}>{name}</span>
            {data[dataIndex].length !== 1 && _ !== data[dataIndex].length - 1 ? ' / ' : ''}
          </span>
        )),
      (dataIndex === 'album' && data[dataIndex]?.name) || data.albumname,
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
                    onClickSong && index === 0 && onClickSong(item['mid'])
                    onClickAlbum &&
                      index === 2 &&
                      onClickAlbum(item?.[dataIndex]?.['mid'] || item.albummid)
                  }}
                  className={classnames({
                    [styles.select]: currentSongId === item.mid,
                  })}
                >
                  {method(item, dataIndex, index)}
                </span>
              </div>
            )
          })}
        </div>
      )),
    [data, columns, currentSongId]
  )

  return (
    <div className={styles.container}>
      {renderTitle}
      {renderContent}
    </div>
  )
}

export default List
