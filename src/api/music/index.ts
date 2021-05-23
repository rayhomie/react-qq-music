import request from '@/utils/request'
import qs from 'qs'
import {
  getLyricPayload,
  getMvPayload,
  getNewDisksPayload,
  getSingerAlbumPayload,
  getSongInfoPayload,
  batchGetSongInfoPayload,
  getMusicPlayPayload,
} from './index.d'

//获取歌曲歌词
export const getLyric = (payload: getLyricPayload) =>
  request({ method: 'GET', url: `/getLyric?${qs.stringify(payload)}` })

//获取MV
export const getMv = (payload: getMvPayload) =>
  request({ method: 'GET', url: `/getMv?${qs.stringify(payload)}` })

//获取新碟信息
export const getNewDisks = (payload: getNewDisksPayload) =>
  request({ method: 'GET', url: `/getNewDisks?${qs.stringify(payload)}` })

//获取歌手专辑
export const getSingerAlbum = (payload: getSingerAlbumPayload) =>
  request({ method: 'GET', url: `/getSingerAlbum?${qs.stringify(payload)}` })

//获取歌曲相关信息
export const getSongInfo = (payload: getSongInfoPayload) =>
  request({ method: 'GET', url: `/getSongInfo?${qs.stringify(payload)}` })

//批量获取歌曲相关信息
export const batchGetSongInfo = (payload: batchGetSongInfoPayload) =>
  request({ method: 'POST', url: `/batchGetSongInfo`, data: payload })

//获取歌曲播放链接
export const getMusicPlay = (payload: getMusicPlayPayload) =>
  request({ method: 'GET', url: `/getMusicPlay?${qs.stringify(payload)}` })
