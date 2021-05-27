import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getSongListDetail } from '@/api/songlist'
import { getSongListDetailPayload } from '@/api/songlist/index.d'
import List from '@/components/List'
import usePlayer from '@/model/player/usePlayer'
import Button from '@/components/Button'
import styles from './index.less'

interface SongListDetailProps {}

const SongListDetail: FC<SongListDetailProps> = props => {
  const param = useHistory().location.state as getSongListDetailPayload
  const [songListInfo, setSongListInfo] = useState<any>(null)
  const { setPlaylist, curSong, setCurSong } = usePlayer()

  useEffect(() => {
    fetchApi()
  }, [param])

  const fetchApi = async () => {
    const {
      data: {
        response: { cdlist },
      },
    } = await getSongListDetail(param)
    // console.log(cdlist[0])
    setSongListInfo(cdlist[0])
  }
  const columns = [
    {
      title: '歌曲',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '歌手',
      dataIndex: 'singer',
      key: 'singer',
    },
    {
      title: '专辑',
      dataIndex: 'album',
      key: 'album',
    },
    {
      title: '时长',
      dataIndex: 'interval',
      key: 'interval',
    },
  ]

  return (
    <div>
      <div className={styles.topBox}>
        <img src="" alt="" />
        <div className={styles.rightBox}>
          <div className={styles.title}></div>
          <div className={styles.author}></div>
          <div className={styles.description}></div>
          <div className={styles.button}>
            <Button icon="icon-play" type="primary">
              播放全部
            </Button>
          </div>
        </div>
      </div>
      <List
        data={songListInfo?.songlist}
        columns={columns}
        onClickSong={id => {
          setPlaylist(songListInfo?.songlist)
          setCurSong(id)
        }}
        onClickSinger={id => {
          console.log(id)
        }}
        onClickAlbum={id => {
          console.log(id)
        }}
        currentSongId={curSong}
      />
    </div>
  )
}

export default SongListDetail
