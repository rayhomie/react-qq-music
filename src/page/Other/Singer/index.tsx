import React, { FC, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getSingerHotsong, getSimilarSinger, getSingerDesc } from '@/api/singer'
import { getSingerAlbum } from '@/api/music'
import Tab from '@/components/Tab'
import List from '@/components/List'
import Button from '@/components/Button'
import usePlayer from '@/model/player/usePlayer'
import Card from '@/components/Card'
import SingerCard from '@/components/SingerCard'
import { XML_CDATA, numberFormat } from '@/utils/common'
import styles from './index.less'

interface SingerProps {}

const Singer: FC<SingerProps> = props => {
  const param = useHistory().location.state as any
  const [tab, setTab] = useState<any>(null)
  const [current, setCurrent] = useState<number>(1)
  const [singerInfo, setSingerInfo] = useState<any>(null)
  const [similarSinger, setSimilarSinger] = useState<any>(null)
  const [album, setAlbum] = useState<any>(null)
  const [desc, setDesc] = useState<any>(null)
  const { setPlaylist, curSong, setCurSong } = usePlayer()

  useEffect(() => {
    if (param.remoteplace === 'album') {
      //进入是专辑需要请求歌手信息
      fetchSingerHotsong(param, current)
    }
    fetchSingerDesc(param)
    setTab(param.remoteplace)
  }, [param])

  useEffect(() => {
    if (!tab) return
    switch (tab) {
      case 'singer':
        fetchSingerHotsong(param, current)
        fetchSimilarSinger(param)
        fetchSingerAlbum(param, current)
        break
      case 'song':
        fetchSingerHotsong(param, current)
        break
      case 'album':
        fetchSingerAlbum(param, current)
        break
    }
    setCurrent(1)
  }, [tab, param])

  //获取歌手歌曲
  const fetchSingerHotsong = async (param: any, current: number, limit: number = 10) => {
    const { mid } = param
    const {
      data: {
        response: {
          singer: { data },
        },
      },
    } = await getSingerHotsong({ singermid: mid, page: current, limit })
    setSingerInfo(data)
    console.log(data)
  }

  //获取相似歌手
  const fetchSimilarSinger = async (param: any) => {
    const { mid } = param
    const {
      data: {
        response: {
          singers: { items },
        },
      },
    } = await getSimilarSinger({ singermid: mid })
    setSimilarSinger(items)
    console.log(items)
  }

  //获取专辑
  const fetchSingerAlbum = async (param: any, current: number, limit: number = 8) => {
    const { mid } = param
    const {
      data: {
        response: {
          singer: { data },
        },
      },
    } = await getSingerAlbum({ singermid: mid, page: current, limit })
    setAlbum(data)
    console.log(data)
  }

  //获取歌手详情
  const fetchSingerDesc = async (param: any) => {
    const { mid } = param
    const {
      data: { response },
    } = await getSingerDesc({ singermid: mid })
    const res = XML_CDATA(response)
    setDesc(res)
  }

  const onChangeTab = (remoteplace: string) => {
    setTab(remoteplace)
  }

  const playAll = () => {
    setPlaylist(singerInfo?.songlist)
    setCurSong(singerInfo?.songlist[0]['mid'])
  }

  const SINGER_TITLE = [
    { key: 'singer', label: `精选` },
    { key: 'song', label: `歌曲${singerInfo?.total_song || 0}` },
    { key: 'album', label: `专辑${singerInfo?.total_album || 0}` },
    { key: 'desc', label: `详情` },
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
      <div className={styles.singerInfo}>
        {singerInfo ? (
          <img
            className={styles.img}
            src={`http://y.gtimg.cn/music/photo_new/T001R300x300M000${singerInfo?.singer_info.mid}.jpg`}
          />
        ) : (
          <div className={styles.img} />
        )}
        <div className={styles.right}>
          <div className={styles.name}>{singerInfo?.singer_info.name || ''}</div>
          <div className={styles.simpledesc}>
            {desc?.slice(1, 4).map((item: any[], _: number) => (
              <span key={_} style={{ marginRight: 40 }}>
                <span>{item[0]}：</span>
                <span>{item[1]}</span>
              </span>
            )) || ''}
          </div>
          <div className={styles.fans}>{`粉丝数：${numberFormat(
            singerInfo?.singer_info.fans || 0
          )}`}</div>
        </div>
      </div>
      <Tab
        data={SINGER_TITLE}
        itemStyle={{ width: 100, margin: '10px' }}
        activeKey={tab}
        onChange={key => onChangeTab(key)}
      />

      {tab === 'singer' && (
        <div className={styles.singer}>
          <div className={styles.title}>
            <div className={styles.left}>
              <span>热门歌曲</span>
              <Button icon="icon-play" type="default" onClick={() => playAll()}>
                播放全部
              </Button>
            </div>
            <Button icon="icon-arrow" type="more" onClick={() => playAll()}>
              更多
            </Button>
          </div>
          <List
            data={singerInfo?.songlist}
            columns={columns}
            onClickSong={id => {
              setPlaylist(singerInfo?.songlist)
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
          <div className={styles.title}>
            <span>热门专辑</span>
            <Button icon="icon-arrow" type="more" onClick={() => playAll()}>
              更多
            </Button>
          </div>
          <Card
            data={album?.albumList.slice(0, 4).map((item: any) => ({
              cover: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albumMid}.jpg`,
              title: item.albumName,
              content_id: item.albumMid,
            }))}
          />

          {similarSinger && (
            <>
              <div className={styles.title}>
                <span>相似歌手</span>
              </div>
              <SingerCard
                data={similarSinger}
                onClick={id => {
                  console.log(id)
                }}
              />
            </>
          )}
        </div>
      )}

      {tab === 'song' && (
        <div className={styles.song}>
          <Button
            icon="icon-play"
            type="default"
            style={{ margin: '10px 0 20px 10px' }}
            onClick={() => playAll()}
          >
            播放全部
          </Button>
          <List
            data={singerInfo?.songlist}
            columns={columns}
            onClickSong={id => {
              setPlaylist(singerInfo?.songlist)
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
      )}

      {tab === 'album' && (
        <div className={styles.album}>
          <Card
            data={album?.albumList.map((item: any) => ({
              cover: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albumMid}.jpg`,
              title: item.albumName,
              content_id: item.albumMid,
            }))}
          />
        </div>
      )}

      {tab === 'desc' && (
        <div className={styles.desc}>
          <div className={styles.content}>{desc?.[0][1]}</div>
          <div className={styles.title}>基本资料</div>
          {desc?.slice(1, desc.length)?.map((item: any, _: number) => (
            <div className={styles.content} key={_}>
              {item[0]}：{item[1]}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Singer
