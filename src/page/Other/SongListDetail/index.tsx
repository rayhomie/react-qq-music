import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getSongListDetail } from '@/api/songlist'
import { getSongListDetailPayload } from '@/api/songlist/index.d'
import List from '@/components/List'
import Icon from '@/components/Icon'
import usePlayer from '@/model/player/usePlayer'
import Button from '@/components/Button'
import styles from './index.less'

interface SongListDetailProps {}

const SongListDetail: FC<SongListDetailProps> = props => {
  const history = useHistory()
  const param = history.location.state as getSongListDetailPayload
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
    setSongListInfo(cdlist[0])
  }

  const playAll = () => {
    setPlaylist(songListInfo?.songlist)
    setCurSong(songListInfo?.songlist[0]['mid'])
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
        {songListInfo?.logo ? (
          <img src={songListInfo?.logo} alt="" />
        ) : (
          <Icon type="icon-CD" style={{ fontSize: 200 }} />
        )}
        <div className={styles.rightBox}>
          <h1 className={styles.title}>{songListInfo?.dissname ? songListInfo?.dissname : '-'}</h1>
          <div className={styles.author}>
            {songListInfo?.headurl ? (
              <img className={styles.headurl} src={songListInfo?.headurl} alt="" />
            ) : (
              <Icon className={styles.headurl} type="icon-headpic" />
            )}
            <div className={styles.nickname}>{songListInfo?.nickname}</div>
            {songListInfo?.tags.map(({ name, id }: any) => (
              <div className={styles.tags} key={id}>{`#${name}`}</div>
            ))}
          </div>
          <div className={styles.description}>{songListInfo?.desc}</div>
          <div className={styles.button}>
            <Button icon="icon-play" type="primary" onClick={() => playAll()}>
              播放全部
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.songNum}>歌曲{songListInfo?.total_song_num}</div>
      <List
        data={songListInfo?.songlist}
        columns={columns}
        onClickSong={id => {
          setPlaylist(songListInfo?.songlist)
          setCurSong(id)
        }}
        onClickSinger={id => {
          history.push('/Singer', { remoteplace: 'singer', mid: id })
        }}
        onClickAlbum={id => {
          history.push('/Album', { remoteplace: 'album', mid: id })
        }}
        currentSongId={curSong}
      />
    </div>
  )
}

export default SongListDetail
