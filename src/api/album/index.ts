import request from '@/utils/request'
import qs from 'qs'
import { getAlbumInfoPayload } from './index.d'

//获取专辑
export const getAlbumInfo = (payload: getAlbumInfoPayload) =>
  request({ method: 'GET', url: `/getAlbumInfo?${qs.stringify(payload)}` })

// 获取数字专辑
export const getDigitalAlbumLists = () => request({ method: 'GET', url: `/getDigitalAlbumLists` })
