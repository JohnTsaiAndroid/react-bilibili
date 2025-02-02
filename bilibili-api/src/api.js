const fetch = require("node-fetch");
const querystring = require("querystring");

// 用户信息
const URL_UP_USER = "https://api.bilibili.com/x/space/acc/info?mid={mid}";
// 用户状态
const URL_UP_USER_STATUS = "https://api.bilibili.com/x/relation/stat?vmid={mid}";
// 首页轮播
const URL_ROUND_SOWING = "https://api.bilibili.com/x/web-show/res/loc?pf=7&id=1695";
// 排行榜
const URL_RANKING = "https://api.bilibili.com/x/web-interface/ranking?rid={rid}&day=3";
// 分类排行榜
const URL_RANKING_REGION = "https://api.bilibili.com/x/web-interface/ranking/region?rid={rid}&day={day}";
// 当前分类排行
const URL_RANKING_ARCHIVE = "https://api.bilibili.com/archive_rank/getarchiverankbypartion?tid={tid}&pn={p}";
// 视频详情
const URL_VIDEO_DETAIL = "https://api.bilibili.com/x/web-interface/view/detail?aid={aid}&bvid=&need_hot_share=1";
// 详情推荐
// const URL_RECOMMEND = "https://comment.bilibili.com/recommendnew,{aid}";
const URL_RECOMMEND = "https://api.bilibili.com/x/web-interface/archive/related?aid={aid}&context=";
// 视频播放地址
const URL_PLAY_URL = "https://api.bilibili.com/x/player/playurl?cid={cid}&avid={aid}&platform=html5&otype=json&qn=16&type=mp4&html5=1";
// 详情弹幕
// const URL_BARRAGE = "https://comment.bilibili.com/{cid}.xml";
const URL_BARRAGE = "https://api.bilibili.com/x/v1/dm/list.so?oid={cid}";
// 详情回复
const URL_REPLAY = "https://api.bilibili.com/x/v2/reply?type=1&sort=2&oid={oid}&pn={p}&nohot=1";
// 用户视频
// const URL_VIDEO = "https://space.bilibili.com/ajax/member/getSubmitVideos?mid={mid}&page={p}&pagesize={size}&tid=0&keyword=&order=pubdate";
const URL_VIDEO = "https://api.bilibili.com/x/space/arc/search?pn={p}&ps={size}&order=click&keyword=&mid={mid}"
// 热搜
const URL_HOT_WORD = "https://s.search.bilibili.com/main/hotword";
// 搜索推荐
const URL_SUGGEST = "https://s.search.bilibili.com/main/suggest";
// 搜索
// const URL_SEARCH = "https://m.bilibili.com/search/searchengine";
const URL_SEARCH = "https://api.bilibili.com/x/web-interface/search/type";


// 直播首页
const URL_LIVE_INDEX = "https://api.live.bilibili.com/room/v2/AppIndex/getAllList?device=phone&platform=ios&scale=3";
// 分类
const URL_LIVE_AREA = "https://api.live.bilibili.com/room/v1/AppIndex/getAreas?device=phone&platform=ios&scale=3&build=1000";
// 直播地址
const URL_LIVE_URL = "https://api.live.bilibili.com/room/v1/Room/playUrl?cid={roomid}&platform=h5&otype=json&quality=0";
// 礼物
const URL_LIVE_GIFT = "https://api.live.bilibili.com/appIndex/getAllItem?scale=1";
// 房间列表
const URL_ROOM_LIST = "https://api.live.bilibili.com/room/v2/Area/getRoomList";
// 房间信息
const URL_ROOM_INFO = "https://api.live.bilibili.com/room/v1/Room/get_info?device=phone&platform=ios&scale=3&build=10000&room_id={roomid}";
// 弹幕配置
const URL_DANMMU_CONFIG = "https://api.live.bilibili.com/room/v1/Danmu/getConf?room_id={roomid}&platform=h5";


const userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) " +
  "AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1";



const fetchUserData = (uId) => {
  return Promise.all([
    fetch(URL_UP_USER.replace("{mid}", uId), {
      headers: {
        "User-Agent": userAgent
      }
    })
      .then(res => res.json())
      .then(body => body.data),
    fetch(URL_UP_USER_STATUS.replace("{mid}", uId))
      .then(res => res.json())
      .then(body => body.data)
  ]).then(([userInfo, status]) => {
    userInfo.status = status;
    return userInfo;
  });
}

const fetchRoundSowing = () => {
  return fetch(URL_ROUND_SOWING)
    .then(res => res.json())
    .then(json => json);
}

const fetchRankingById = (rId) => {
  return fetch(URL_RANKING.replace("{rid}", rId))
    .then(res => res.json())
    .then(json => json);
}

const fetchRankingRegionById = (rId, day) => {
  return fetch(URL_RANKING_REGION.replace("{rid}", rId).replace("{day}", day))
    .then(res => res.json())
    .then(json => json);
}

const fetchRankingArchiveById = (tId, p) => {
  return fetch(URL_RANKING_ARCHIVE.replace("{tid}", tId).replace("{p}", p))
    .then(res => res.json())
    .then(json => json);
}

const fetchVideoDetail = (aId) => {
  return fetch(URL_VIDEO_DETAIL.replace("{aid}", aId))
    .then(res => res.json())
    .then(json => json);
}

const fetchPlayUrl = (aId, cId) => {
  return fetch(URL_PLAY_URL.replace("{aid}", aId).replace("{cid}", cId))
    .then(res => res.json())
    .then(json => json);
}

const fetchRecommendById = (aId) => {
  return fetch(URL_RECOMMEND.replace("{aid}", aId))
    .then(res => res.json())
    .then(json => json);
}

const fetchReplay = (aId, p) => {
  return fetch(URL_REPLAY.replace("{oid}", aId).replace("{p}", p))
    .then(res => res.json())
    .then(json => json);
}

const fetchBarrage = (cId) => {
  return fetch(URL_BARRAGE.replace("{cid}", cId))
    .then(res => res.text())
    .then(body => body)
}

const fetchUserVideo = (param) => {
  return fetch(URL_VIDEO.replace("{mid}", param.uId)
    .replace("{p}", param.p)
    .replace("{size}", param.size))
    .then(res => res.json())
    .then(json => json);
}

const fetchHotWord = () => {
  return fetch(URL_HOT_WORD)
    .then(res => res.json())
    .then(json => json)
}

const fetchSuggest = (w) => {
  const params = [
    "func=suggest",
    "suggest_type=accurate",
    "sub_type=tag",
    "main_ver=v1",
    "bangumi_acc_num=3",
    "tag_num=10",
    "highlight=",
    `term=${w}`
  ];
  return fetch(URL_SUGGEST + "?" + params.join("&"))
    .then(res => res.json())
    .then(json => json)
}

const fetchSearchContent = (param) => {
  param = {
    keyword: param.keyword,
    page: param.page,
    pagesize: param.size,
    search_type: param.searchType, // video（综合） media_bangumi(番剧) bili_user（up主）
    order: param.order // totalrank（默认） click（播放多） pubdate（发布日期） dm（弹幕）
  };
  return fetch(URL_SEARCH + `?${querystring.stringify(param)}`, {
      method: "get"
    })
      .then(res => res.json())
      .then(json => json)
}

const fetchLiveList = () => {
  return fetch(URL_LIVE_INDEX)
    .then(res => res.json())
    .then(json => json)
}

const fetchLiveArea = () => {
  return fetch(URL_LIVE_AREA)
    .then(res => res.json())
    .then(json => json)
}

const fetchLiveUrl = (roomId) => {
  return fetch(URL_LIVE_URL.replace("{roomid}", roomId))
    .then(res => res.json())
    .then(json => json)
}

const fetchLiveGift = () => {
  return fetch(URL_LIVE_GIFT)
    .then(res => res.json())
    .then(json => json)
}

const fetchRoomList = (data) => {
  const params = [
    `parent_area_id=${data.parentAreaId}`,
    `area_id=${data.areaId}`,
    `page=${data.page}`,
    `page_size=${data.pageSize}`,
    "sort_type=online",
    "device=phone",
    "platform=ios",
    "scale=3",
    "build=10000"
  ];
  return fetch(URL_ROOM_LIST + "?" + params.join("&"))
    .then(res => res.json())
    .then(json => json)
}

const fetchRoomInfo = (roomId) => {
  return fetch(URL_ROOM_INFO.replace("{roomid}", roomId))
    .then(res => res.json())
    .then(json => json)
}

const fetchDanMuConfig = (roomId) => {
  return fetch(URL_DANMMU_CONFIG.replace("{roomid}", roomId))
    .then(res => res.json())
    .then(json => json)
}

module.exports = {
  fetchUserData,
  fetchRoundSowing,
  fetchRankingById,
  fetchRankingRegionById,
  fetchRankingArchiveById,
  fetchVideoDetail,
  fetchPlayUrl,
  fetchRecommendById,
  fetchReplay,
  fetchBarrage,
  fetchUserVideo,
  fetchHotWord,
  fetchSuggest,
  fetchSearchContent,
  fetchLiveList,
  fetchLiveArea,
  fetchLiveUrl,
  fetchLiveGift,
  fetchRoomList,
  fetchRoomInfo,
  fetchDanMuConfig
}
