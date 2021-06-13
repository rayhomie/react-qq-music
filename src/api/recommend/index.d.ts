export type getTopListsPayload = {
  page?: number //当前页数, 默认为 1
  limit?: number //取出歌单数量, 默认为 10
}

export type getRanksPayload = {
  topId?: number | string //榜单id
  page?: number //当前页数, 默认为1
  limit?: number //取出歌单数量, 默认为 10
}

export type getCommentsPayload = {
  id: number //专辑或者歌单请求结果的id
  rootcommentid?: string //榜单id
  pagenum?: number // 当前页数, 默认为 0
  pagesize?: number //取出评论数量, 默认为 25
  cid?: any //
  cmd?: any //
  reqtype?: any //
  biztype?: any //
}

export type getImageUrlPayload = {
  id: number | string //专辑或者歌单请求结果的id
  size?: string //图片大小, 默认 300x300
  maxAge?: number //图片过期时间, 默认 12 mins = 2592000ms
}
