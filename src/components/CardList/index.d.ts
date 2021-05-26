export type DataType = {
  album_pic_mid: string
  content_id: number
  cover: string
  creator: number
  edge_mark: string
  id: number
  is_dj: boolean
  is_vip: boolean
  jump_url: string
  listen_num: number
  pic_mid: string
  rcmdcontent: string
  rcmdtemplate: string
  rcmdtype: number
  singerid: number
  title: string
  tjreport: string
  type: number
  username: string
}

export interface CardListProps {
  data: DataType[]
  size?: number
  showListenNum?: boolean
  onPlay?: (id: number) => void
  onView?: (id: number) => void
}
