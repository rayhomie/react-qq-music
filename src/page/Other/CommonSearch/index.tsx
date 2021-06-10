import React, { FC, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getSearchByKeyPayload } from '@/api/other/index.d'
import { getAlbumInfo } from '@/api/album'
import { getSearchByKey as fetchSearchByKey } from '@/api/other'
import usePlayer from '@/model/player/usePlayer'
import Tab from '@/components/Tab'
import Button from '@/components/Button'
import Pagination from '@/components/Pagination'
import List from '@/components/List'
import Card from '@/components/Card'
import CONST from '@/const'
import styles from './index.less'

interface CommonSearchProps {}

const CommonSearch: FC<CommonSearchProps> = props => {
  const history = useHistory()
  const param = history.location.state as getSearchByKeyPayload
  const [zhidaSinger, setZhidaSinger] = useState<any>(null)
  const [songListInfo, setSongListInfo] = useState<any>(null)
  const [tab, setTab] = useState<any>(null)
  const [current, setCurrent] = useState<number>(1)
  const { setPlaylist, curSong, setCurSong } = usePlayer()

  useEffect(() => {
    const { remoteplace, key } = param
    setCurrent(1)
    setTab('song')
    getSearchByKey({ remoteplace, key, page: 1 })
  }, [param])

  const getSearchByKey = async (param: getSearchByKeyPayload) => {
    const {
      data: {
        response: { data },
      },
    } = await fetchSearchByKey(param)
    setZhidaSinger(data.zhida.zhida_singer)
    setSongListInfo(data.song)
  }

  const playAll = () => {
    setPlaylist(songListInfo?.list)
    setCurSong(songListInfo?.list[0]['mid'])
  }

  const onChangeTab = (remoteplace: string) => {
    const { key } = param
    setTab(remoteplace)
    getSearchByKey({ remoteplace, key, page: 1 })
    setCurrent(1)
  }

  const paginationChange = (cur: number) => {
    const { key, remoteplace } = param
    getSearchByKey({ remoteplace: tab || remoteplace, key, page: cur })
    setCurrent(cur)
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
      <div className={styles.title}>
        搜索<span>{param.key}</span>
      </div>
      {zhidaSinger && (
        <div className={styles.singerlan}>
          <img
            src={zhidaSinger.singerPic}
            onClick={() =>
              history.push('/Singer', { remoteplace: 'singer', mid: zhidaSinger.singerMID })
            }
          />
          <div
            onClick={() =>
              history.push('/Singer', { remoteplace: 'singer', mid: zhidaSinger.singerMID })
            }
          >
            歌手：{zhidaSinger.singerName}
          </div>
          <div
            onClick={() =>
              history.push('/Singer', { remoteplace: 'song', mid: zhidaSinger.singerMID })
            }
          >
            单曲 {zhidaSinger.songNum}
          </div>
          <div
            onClick={() =>
              history.push('/Singer', { remoteplace: 'album', mid: zhidaSinger.singerMID })
            }
          >
            专辑 {zhidaSinger.albumNum}
          </div>
        </div>
      )}
      <Tab
        data={CONST['TAB_TITLE']}
        itemStyle={{ width: 100, margin: '10px 0' }}
        activeKey={tab}
        onChange={key => onChangeTab(key)}
      />

      {tab === 'song' && (
        <>
          <Button icon="icon-play" type="primary" onClick={() => playAll()}>
            播放全部
          </Button>
          <List
            data={songListInfo?.list}
            columns={columns}
            onClickSong={id => {
              setPlaylist(songListInfo?.list)
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
        </>
      )}
      {tab === 'album' && (
        <Card
          data={songListInfo?.list.map((item: any) => ({
            cover: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.mid}.jpg`,
            title: item.album.name,
            content_id: item.album.mid,
          }))}
          onPlay={mid => {
            fetchAlbumInfo({ mid })
          }}
          onView={mid => {
            history.push('/Album', { remoteplace: 'album', mid })
          }}
        />
      )}
      {/* {tab === 'playlist' && (
        <Card
          data={songListInfo?.list.map((item: any) => ({
            cover: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.mid}.jpg`,
            title: item.album.name,
            content_id: item.album.mid,
          }))}
        />
      )} */}
      <div className={styles.pagination}>
        <Pagination
          total={songListInfo?.totalnum - 100}
          current={current || 1}
          pageSize={10}
          onChange={paginationChange}
        />
      </div>
    </div>
  )
}

export default CommonSearch
