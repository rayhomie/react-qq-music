import React, { FC, useState, useEffect, useRef } from 'react'
import useRecom from '@/model/recommend/useRecom'
import usePlayer from '@/model/player/usePlayer'
import RankCard from '@/components/RankCard'
import { getRanks } from '@/api/recommend'
import { getAlbumInfo } from '@/api/album'
import { useHistory } from 'react-router-dom'
import styles from './index.less'

interface RankProps {}

const Rank: FC<RankProps> = props => {
  const history = useHistory()
  const { allRecommend } = useRecom()
  const { setCurSong, setPlaylist } = usePlayer()
  const [info, setInfo] = useState<any>([])
  const [drag, setDrag] = useState<boolean>(false)
  const [dragCur, setDragCur] = useState<number>(0)
  const container = useRef<any>(null)

  useEffect(() => {
    setInfo(allRecommend?.toplist.data.group)
  }, [allRecommend])

  const clickSong = (mid: string) => {
    history.push('/Album', { remoteplace: 'album', mid })
  }

  const clickSinger = (mid: string) => {
    history.push('/Singer', { remoteplace: 'song', mid })
  }

  const playMusic = async (topId: string) => {
    const {
      data: {
        response: {
          detail: {
            data: {
              data: { song },
            },
          },
        },
      },
    } = await getRanks({ topId, page: 1, limit: 100 })
    const {
      data: {
        response: {
          data: { list },
        },
      },
    } = await getAlbumInfo({ albummid: song[0].albumMid })
    setPlaylist(list)
    setCurSong(list?.[0].songmid)
  }

  const mouseDown = (e: any) => {
    setDrag(true)
    setDragCur(e.clientX)
    container.current.style.cursor = 'default'
  }

  const mouseUp = (e: any) => {
    setDrag(false)
    setDragCur(0)
    container.current.style.cursor = 'default'
  }

  const mouseMove = (e: any) => {
    if (!drag) return
    const horizontal = e.clientX - container.current.offsetLeft
    const vertical = e.clientY - container.current.offsetTop
    if (
      horizontal <= 0 ||
      horizontal >= container.current.clientWidth ||
      vertical <= 0 ||
      vertical >= container.current.clientHeight
    ) {
      setDrag(false)
      return
    }
    container.current.style.cursor = 'pointer'
    const move = -(e.clientX - dragCur) / 10
    if (container.current.scrollLeft >= 0 && container.current.scrollLeft <= 8540) {
      container.current.scrollLeft += move
    }
  }

  const wheel = (e: any) => {
    container.current.scrollLeft += -e.nativeEvent.wheelDelta
  }

  return (
    <div
      className={styles.container}
      ref={container}
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
      onMouseMove={mouseMove}
      onWheel={wheel}
    >
      <RankCard
        dataSource={info}
        clickSong={clickSong}
        clickSinger={clickSinger}
        playMusic={playMusic}
      />
    </div>
  )
}

export default Rank
