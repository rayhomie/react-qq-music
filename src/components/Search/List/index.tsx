import React, { FC, useMemo, useCallback, useEffect, useState } from 'react'
import { getMvPlay } from '@/api/mv'
import styles from './index.less'

interface ListProps {
  type: any
  data: any[]
}

const List: FC<ListProps> = ({ data, type }) => {
  //没有pic的data
  const [mvData, setMvData] = useState<any[]>([])
  const [reqMvInfo, setReqMvInfo] = useState<any[]>([])
  //有pic的data
  const [renderMv, setRenderMv] = useState<any[]>([])

  useEffect(() => {
    if (type === 'mv') {
      setMvData(data)
      data.forEach(i => {
        getMvPic(i.vid)
      })
    }
  }, [type, data])

  useEffect(() => {
    if (reqMvInfo.length) {
      setRenderMv(
        mvData.map(item => ({ ...item, pic: reqMvInfo.find(i => i.vid === item.vid)?.pic }))
      )
    }
  }, [reqMvInfo])

  const getMvPic = async (vid: string) => {
    const {
      data: {
        response: {
          mvinfo: { data },
        },
      },
    } = await getMvPlay({ vid })
    const item = Object.values(data) as any
    setReqMvInfo(pre => [...pre, { pic: item[0].cover_pic, vid: item[0].vid }])
  }

  const song = useMemo(
    () =>
      data?.map((item: any) => (
        <div key={item.id} className={styles[type]}>
          {item.name} - {item.singer}
        </div>
      )),
    [data, type]
  )

  const album = useMemo(
    () =>
      data?.map((item: any) => (
        <div key={item.id} className={styles[type]}>
          <img src={item.pic} />
          <div className={styles.right}>
            <div>{item.name}</div>
            <div>{item.singer}</div>
          </div>
        </div>
      )),
    [data, type]
  )

  const singer = useMemo(
    () =>
      data?.map((item: any) => (
        <div key={item.id} className={styles[type]}>
          <img src={item.pic} />
          <div>{item.name}</div>
        </div>
      )),
    [data, type]
  )

  const mv = useMemo(
    () =>
      renderMv?.map((item: any) => (
        <div key={`${item.id}`} className={styles[type]}>
          <img src={item.pic} />
          <div className={styles.right}>
            <div>{item.name}</div>
            <div>{item.singer}</div>
          </div>
        </div>
      )),
    [renderMv]
  )

  const render = useCallback(
    (type: any) => {
      //@ts-ignore
      return { song: song, album: album, mv: mv, singer: singer }[`${type}`]
    },
    [data, type, renderMv]
  )

  return <div className={styles.list}>{render(type)}</div>
}

export default List
