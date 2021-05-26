import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getSongListDetail } from '@/api/songlist'
import { getSongListDetailPayload } from '@/api/songlist/index.d'
import List from '@/components/List'
import styles from './index.less'

interface SongListDetailProps {}

const SongListDetail: FC<SongListDetailProps> = props => {
  const param = useHistory().location.state as getSongListDetailPayload
  const [songListInfo, setSongListInfo] = useState<any>(null)

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
      <List
        data={songListInfo?.songlist}
        columns={columns}
        onClickSong={id => {
          console.log(id)
        }}
        onClickSinger={id => {
          console.log(id)
        }}
        onClickAlbum={id => {
          console.log(id)
        }}
      />
    </div>
  )
}

export default SongListDetail
