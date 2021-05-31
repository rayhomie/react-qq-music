import React, { FC, useMemo, useCallback, useEffect, useState } from 'react'
import { getMvPlay } from '@/api/mv'
import styles from './index.less'

interface ListProps {
  type: any
  data: any[]
  input?: string
  onSelect?: (res: string, type: string, id?: string) => void
}

const List: FC<ListProps> = ({ data, type, onSelect = () => {}, input = '' }) => {
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

  const highlight = (value: string, input: string) => {
    const data = value.split(input)
    return data.map((item, _) => (
      <span key={_}>
        <span>{item}</span>
        {_ !== data.length - 1 && <span className={styles.highlight}>{input}</span>}
      </span>
    ))
  }

  const song = useMemo(
    () =>
      data?.map((item: any) => (
        <div
          key={item.id}
          className={styles[type]}
          onClick={() => onSelect(`${item.name} ${item.singer}`, 'song')}
        >
          {highlight(`${item.name} - ${item.singer}`, input)}
        </div>
      )),
    [data, type, input]
  )

  const album = useMemo(
    () =>
      data?.map((item: any) => (
        <div
          key={item.id}
          className={styles[type]}
          onClick={() => onSelect(`${item.name} ${item.singer}`, 'album', `${item.mid}`)}
        >
          <img src={item.pic} />
          <div className={styles.right}>
            <div>{highlight(item.name, input)}</div>
            <div>{highlight(item.singer, input)}</div>
          </div>
        </div>
      )),
    [data, type, input]
  )

  const singer = useMemo(
    () =>
      data?.map((item: any) => (
        <div
          key={item.id}
          className={styles[type]}
          onClick={() => onSelect(`${item.name}`, 'singer', `${item.mid}`)}
        >
          <img src={item.pic} />
          <div>{highlight(item.name, input)}</div>
        </div>
      )),
    [data, type, input]
  )

  const mv = useMemo(
    () =>
      renderMv?.map((item: any) => (
        <div
          key={`${item.id}`}
          className={styles[type]}
          onClick={() => onSelect(`${item.name} ${item.singer}`, 'mv')}
        >
          <img src={item.pic} />
          <div className={styles.right}>
            <div>{highlight(item.name, input)}</div>
            <div>{highlight(item.singer, input)}</div>
          </div>
        </div>
      )),
    [renderMv, input]
  )

  const render = useCallback(
    (type: any) => {
      //@ts-ignore
      return { song: song, album: album, mv: mv, singer: singer }[`${type}`]
    },
    [data, type, renderMv, input]
  )

  return <div className={styles.list}>{render(type)}</div>
}

export default List
