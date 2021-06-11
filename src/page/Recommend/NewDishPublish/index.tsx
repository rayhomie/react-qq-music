import React, { FC, useEffect, useState } from 'react'
import { getNewDisks } from '@/api/music'
import { getAlbumInfo } from '@/api/album'
import Card from '@/components/Card'
import { useHistory } from 'react-router-dom'
import usePlayer from '@/model/player/usePlayer'
import useScroll from '@/model/scroll/useScroll'
import styles from './index.less'

interface NewDishPublishProps {
  limit?: number
}

const NewDishPublish: FC<NewDishPublishProps> = ({ limit = 20 }) => {
  const history = useHistory()
  const [info, setInfo] = useState<any>([])
  const [current, setCurrent] = useState<number>(1)
  const { setPlaylist, setCurSong } = usePlayer()
  const { bottom, setBottom } = useScroll()

  //滚动底部分页
  useEffect(() => {
    if (bottom) {
      setCurrent(pre => {
        fetchNewDisks({ page: pre + 1, limit })
        setBottom(false)
        return pre + 1
      })
    }
  }, [bottom])

  useEffect(() => {
    fetchNewDisks({ page: current, limit })
  }, [])

  const fetchNewDisks = async (param: any) => {
    const {
      data: {
        response: {
          new_album: {
            data: { albums },
          },
        },
      },
    } = await getNewDisks(param)
    const newData = albums.map((item: any) => ({
      ...item,
      cover: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.mid}.jpg`,
      title: item.name,
      content_id: item.mid,
    }))
    setInfo((pre: any) => pre.concat(newData))
  }

  const fetchAlbumInfo = async (param: any) => {
    const { mid } = param
    const {
      data: {
        response: { data },
      },
    } = await getAlbumInfo({ albummid: mid })
    const newData = {
      ...data,
      list: data.list.map((i: any) => ({ ...i, id: i.songid, name: i.songname, mid: i.songmid })),
    }
    setPlaylist(newData?.list)
    setCurSong(newData?.list[0]['mid'])
  }

  return (
    <div className={styles.container}>
      <Card
        data={info}
        onPlay={mid => {
          fetchAlbumInfo({ mid })
        }}
        onView={mid => {
          history.push('/Album', { remoteplace: 'album', mid })
        }}
        clickSinger={mid => {
          history.push('/Singer', { remoteplace: 'singer', mid })
        }}
      />
    </div>
  )
}

export default NewDishPublish
