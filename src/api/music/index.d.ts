export type getLyricPayload = {
  songmid: number | string // 专辑id
  isFormat?: boolean // 是否格式化歌词, 默认值为 false
}

export type getMvPayload = {
  /*[{"id":15,"name":"全部"},{"id":16,"name":"内地"},{"id":17,"name":"港台"},{"id":18,"name":"欧美"},{"id":19,"name":"韩国"},{"id":20,"name":"日本"}]*/
  area_id: number //区域id, 默认值为全部(15)
  /*[{"id":7,"name":"全部"},{"id":8,"name":"MV"},{"id":9,"name":"现场"},{"id":10,"name":"翻唱"},{"id":11,"name":"舞蹈"},{"id":12,"name":"影视"},{"id":13,"name":"综艺"},{"id":14,"name":"儿歌"}] */
  version_id: number //版本id, 默认值为全部(7)
  page?: number //当前页数, 默认为1
  limit?: number //取出歌单数量, 默认为 20
}

export type getNewDisksPayload = {
  page?: number //当前页数, 默认为1
  limit?: number //取出歌单数量, 默认为 20
}

export type getSingerAlbumPayload = {
  singermid: number //歌手id
  page?: number //当前页数, 默认为1
  limit?: number //取出歌单数量, 默认为 20
}

export type getSongInfoPayload = {
  songmid: number | string //歌曲id
}
export type batchGetSongInfoPayload = {
  songs: string[] //  "songs": [["001CLC7W2Gpz4J"], ["0025NhlN2yWrP4"]]其中 songid可以不传
}

export type getMusicPlayPayload = {
  songmid: string //歌曲id, 多个播放链接使用 ,分隔
  resType?: 'play' | 'all' //仅返回播放链接, 默认是 play。[all | play]
  quality?: 'm4a' | '128' | '320' | 'ape' | 'flac' // 播放品质, 默认是 128。[m4a | 128 | 320 | ape | flac]
}
