import request from '@/utils/request'
import qs from 'qs'
import {
  getSingerHotsongPayload,
  getSimilarSingerPayload,
  getSingerDescPayload,
  getSingerListPayload,
  getSingerStarNumPayload,
} from './index.d'

// 获取歌手热门歌曲
export const getSingerHotsong = (payload: getSingerHotsongPayload) =>
  request({ method: 'GET', url: `/getSingerHotsong?${qs.stringify(payload)}` })

// 获取相似歌手
export const getSimilarSinger = (payload: getSimilarSingerPayload) =>
  request({ method: 'GET', url: `/getSimilarSinger?${qs.stringify(payload)}` })

// 获取歌手信息
export const getSingerDesc = (payload: getSingerDescPayload) =>
  request({ method: 'GET', url: `/getSingerDesc?${qs.stringify(payload)}` })

// 获取歌手列表
export const getSingerList = (payload: getSingerListPayload) =>
  request({ method: 'GET', url: `/getSingerList?${qs.stringify(payload)}` })

// 获取歌手被关注数量信息
export const getSingerStarNum = (payload: getSingerStarNumPayload) =>
  request({ method: 'GET', url: `/getSingerStarNum?${qs.stringify(payload)}` })
