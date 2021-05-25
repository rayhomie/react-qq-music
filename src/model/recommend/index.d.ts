import { GroupProps } from 'antd/lib/input'

export interface Recommend {
  code: number
  ts: number
  start_ts: number
  category: {
    code: number
    data: {
      category: Category[]
    }
  }
  recomPlaylist: {
    code: number
    data: {
      page: number
      v_hot: RecomPlaylistItem[]
    }
  }
  playlist: {
    code: number
    data: {
      total: number
      v_playlist: PlaylistItem[]
    }
  }
  new_song: {
    code: number
    data: {
      lan: string
      lanlist: LanlistItem[]
      ret_msg: string
      songlist: any[]
      type: number
    }
  }
  new_album: {
    code: number
    data: {
      albums: any[]
      ret_msg: string
      total: number
    }
  }
  new_album_tag: {
    code: number
    data: {
      area: AreaItem[]
    }
  }
  toplist: {
    code: number
    data: {
      group: GroupItem[]
      refreshInterval: number
      abt: string
    }
  }
  focus: {
    code: number
    data: {
      content: ContentItem[]
      id: number
      sub_cube: []
      title: string
    }
  }
}

//歌单分类
export interface Category {
  group_id: number
  group_name: string //热门推荐
  item: CategoryItem[]
}

export interface CategoryItem {
  item_id: number
  item_name: string
  item_desc: string
  item_new: number
  item_hot: number
  show_type: number
  is_parent: number
  reimgurl: string
  item_share_pic: string
  show_detail: number
  group_id: number
}

//推荐歌单
export interface RecomPlaylistItem {
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

//歌单
export interface PlaylistItem {
  access_num: number
  album_pic_mid: string
  censor_remark: []
  censor_status: number
  censor_time: number
  commit_time: number
  cover_mid: string
  cover_url_big: string
  cover_url_medium: string
  cover_url_small: string
  create_time: number
  creator_info: {
    avatar: string
    is_dj: number
    nick: string
    taoge_avatar: string
    taoge_nick: string
    uin: number
    vip_type: number
  }
  creator_uin: number
  desc: string
  dirid: number
  fav_num: number
  modify_time: number
  pic_mid: string
  rcmdcontent: string
  rcmdtemplate: string
  score: number
  song_ids: number[]
  song_types: number[]
  tag_ids: number[]
  tag_names: number[]
  tid: number
  title: string
  tjreport: string
}

//新歌栏
export interface LanlistItem {
  lan: string
  name: string
  tjreport: string
  type: number
}

export interface AreaItem {
  id: number
  name: string
  tjreport: string
}

export interface GroupItem {
  groupId: number
  groupName: string
  toplist: any
  type: number
}

export interface ContentItem {
  cover: string
  id: number
  jump_info: {
    id: number
    mid: string
    url: string
  }
  listen_num: number
  pic_info: {
    mid: string
    url: string
    urlex1: string
    urlex2: string
  }
  report: string
  sub_title: string
  title: string
  type: number
}
