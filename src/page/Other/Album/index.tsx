import React, { FC, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getAlbumInfo } from '@/api/album'
import Icon from '@/components/Icon'
import Button from '@/components/Button'
import List from '@/components/List'
import Tab from '@/components/Tab'
import usePlayer from '@/model/player/usePlayer'
import CONST from '@/const'
import styles from './index.less'

interface AlbumProps {}

const Album: FC<AlbumProps> = props => {
  const history = useHistory()
  const param = history.location.state as any
  const [errImg, setErrImg] = useState<boolean>(false)
  const [tab, setTab] = useState<any>(null)
  const [albumInfo, setAlbumInfo] = useState<any>(null)
  const { setPlaylist, curSong, setCurSong } = usePlayer()

  useEffect(() => {
    fetchAlbumInfo(param)
    setTab(param.remoteplace)
  }, [param])

  const fetchAlbumInfo = async (param: any) => {
    const { mid } = param
    const {
      data: {
        response: { data },
      },
    } = await getAlbumInfo({ albummid: mid })
    setAlbumInfo({
      ...data,
      list: data.list.map((i: any) => ({ ...i, id: i.songid, name: i.songname, mid: i.songmid })),
    })
  }

  const playAll = () => {
    setPlaylist(albumInfo?.list)
    setCurSong(albumInfo?.list[0]['mid'])
  }

  const onChangeTab = (remoteplace: string) => {
    setTab(remoteplace)
  }

  const SINGER_TITLE = [
    { key: 'album', label: `歌曲${albumInfo?.total || 0}` },
    { key: 'desc', label: `专辑信息` },
  ]

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
    <div className={styles.container}>
      <div className={styles.albumInfo}>
        {!errImg ? (
          <img
            className={styles.img}
            src={`https://y.gtimg.cn/music/photo_new/T002R300x300M000${param.mid}.jpg`}
            onError={() => setErrImg(true)}
          />
        ) : (
          <Icon type="icon-CD" style={{ fontSize: 200 }} />
        )}
        <div className={styles.right}>
          <div className={styles.name}>{albumInfo?.name || ''}</div>
          <div className={styles.simpledesc}>{albumInfo?.singername || ''}</div>
          <div className={styles.simpledesc}>
            {albumInfo?.aDate || ''}&nbsp;&nbsp;&nbsp;&nbsp;
            {albumInfo?.genre || ''}
          </div>
          <Button icon="icon-play" type="primary" onClick={() => playAll()}>
            播放全部
          </Button>
        </div>
      </div>
      <Tab
        data={SINGER_TITLE}
        itemStyle={{ width: 100, margin: '0 0 20px 10px' }}
        activeKey={tab}
        onChange={key => onChangeTab(key)}
      />
      {tab === 'album' && (
        <List
          data={albumInfo?.list}
          columns={columns}
          onClickSong={id => {
            setPlaylist(albumInfo?.list)
            setCurSong(id)
          }}
          onClickSinger={id => {
            history.push('/Singer', { remoteplace: 'singer', mid: id })
          }}
          currentSongId={curSong}
        />
      )}

      {tab === 'desc' && (
        <div className={styles.desc}>
          {albumInfo?.name && (
            <div>
              <span>{(CONST['ALBUM'] as any)['name']}：</span>
              <span className={styles.name}>{albumInfo?.name}</span>
            </div>
          )}
          {albumInfo?.singername && (
            <div>
              <span>{(CONST['ALBUM'] as any)['singername']}：</span>
              <span
                className={styles.singername}
                onClick={() => {
                  history.push('/Singer', { remoteplace: 'singer', mid: albumInfo?.singermid })
                }}
              >
                {albumInfo?.singername}
              </span>
            </div>
          )}
          {albumInfo?.genre && (
            <div>
              <span>{(CONST['ALBUM'] as any)['genre']}：</span>
              <span className={styles.genre}>{albumInfo?.genre}</span>
            </div>
          )}
          {albumInfo?.lan && (
            <div>
              <span>{(CONST['ALBUM'] as any)['lan']}：</span>
              <span className={styles.lan}>{albumInfo?.lan}</span>
            </div>
          )}
          {albumInfo?.company && (
            <div>
              <span>{(CONST['ALBUM'] as any)['company']}：</span>
              <span className={styles.company}>{albumInfo?.company}</span>
            </div>
          )}
          {albumInfo?.desc && (
            <div>
              <span>{(CONST['ALBUM'] as any)['desc']}：</span>
              <span className={styles.desc}>{albumInfo?.desc}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Album
