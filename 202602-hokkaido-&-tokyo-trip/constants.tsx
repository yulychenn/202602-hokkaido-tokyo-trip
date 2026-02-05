import { DayItinerary, ActivityType, FlightInfo, HotelInfo } from './types';
import { Plane, Hotel, Utensils, MapPin, Train, ShoppingBag, Info, Camera } from 'lucide-react';
import React from 'react';

// Helper to map type to icon
export const getTypeIcon = (type: ActivityType) => {
  switch (type) {
    case ActivityType.FLIGHT: return <Plane className="w-5 h-5 text-blue-500" />;
    case ActivityType.HOTEL: return <Hotel className="w-5 h-5 text-indigo-500" />;
    case ActivityType.FOOD: return <Utensils className="w-5 h-5 text-orange-500" />;
    case ActivityType.SIGHTSEEING: return <Camera className="w-5 h-5 text-emerald-500" />;
    case ActivityType.TRANSPORT: return <Train className="w-5 h-5 text-gray-500" />;
    case ActivityType.SHOPPING: return <ShoppingBag className="w-5 h-5 text-pink-500" />;
    case ActivityType.NOTE: return <Info className="w-5 h-5 text-yellow-500" />;
    default: return <MapPin className="w-5 h-5 text-gray-400" />;
  }
};

export const HOTELS: Record<string, HotelInfo> = {
  OTARU: {
    name: "Sonia 小樽酒店 (HOTEL SONIA Otaru)",
    address: "1-4-20, Ironai, Otaru, 047-0031",
    phone: "+81-13-4232600"
  },
  SAPPORO: {
    name: "札幌大通威斯特飯店 (Hotel Vista Sapporo Odori)",
    address: "5 Chome-16 Minami 3 Jonishi, 中央區, Sapporo",
    phone: "+81-11-2333151"
  },
  UENO: {
    name: "上野 Sardonyx 飯店 (Hotel Sardonyx Ueno)",
    address: "6 Chome-6-7 Ueno, Taito City, Tokyo",
  },
  SHINJUKU: {
    name: "VIA INN SHINJUKU",
    address: "5-11-16 Shinjuku, Shinjuku-ku, Tokyo",
  }
};

export const FLIGHTS: FlightInfo[] = [
  { code: "TR 892", route: "TPE (T1) → CTS (Intl)", time: "12:30 - 17:20", description: "前往北海道" },
  { code: "JL 522", route: "CTS (D) → HND (T1)", time: "18:00 - 19:45", description: "移動至東京" },
  { code: "JL 8663", route: "NRT (T2) → TPE (T2)", time: "09:10 - 12:15", description: "Reece 回家" },
  { code: "TR 875", route: "NRT (T1) → TPE (T1)", time: "19:55 - 23:10", description: "Yuly 回家" },
];

export const ITINERARY_DATA: DayItinerary[] = [
  {
    day: 1,
    date: "2/8",
    weekday: "日",
    title: "抵達小樽、漫步運河",
    location: "Otaru",
    hotel: HOTELS.OTARU.name,
    activities: [
      {
        time: "17:20",
        title: "抵達新千歲機場 (CTS)",
        type: ActivityType.FLIGHT,
        description: "TR 892 抵達",
      },
      {
        time: "17:30",
        title: "JR 快速 Airport 前往小樽",
        type: ActivityType.TRANSPORT,
        description: "車程約 75-80 分鐘，車費 ¥2,880",
        details: [
          "① 17:30 → 18:47 (不轉車，推薦！)",
          "② 17:54 → 19:17 (不轉車)",
          "③ 18:06 → 19:39 (轉乘 1 次)",
          "④ 18:30 → 19:46 (不轉車)",
          "⑤ 18:54 → 20:15 (不轉車)"
        ]
      },
      {
        time: "20:00",
        title: "抵達小樽",
        type: ActivityType.TRANSPORT,
        description: "Check-in 飯店",
      },
      {
        time: "20:30",
        title: "Donki 驚安殿堂",
        type: ActivityType.SHOPPING,
        description: "先衝去買雪靴",
      },
      {
        time: "22:00",
        title: "屋台村紅磚橫丁",
        type: ActivityType.FOOD,
        description: "晚餐",
      }
    ]
  },
  {
    day: 2,
    date: "2/9",
    weekday: "一",
    title: "小樽雪燈之路 🕯️",
    location: "Otaru",
    hotel: HOTELS.OTARU.name,
    activities: [
      {
        time: "07:00",
        title: "友和のパン (友和麵包)",
        type: ActivityType.FOOD,
        tags: ["冰狗"],
        description: "早餐 (營業時間 7:00-21:00)",
      },
      {
        time: "上午",
        title: "堺町通商店街",
        type: ActivityType.SHOPPING,
        tags: ["北一硝子", "音樂盒堂"],
        description: "逛街、買各種玻璃工藝品",
      },
      {
        time: "11:00",
        title: "南小樽午餐 (選擇)",
        type: ActivityType.FOOD,
        tags: ["海鮮丼", "壽司"],
        details: [
          "澤崎水産 (11:00-19:00)",
          "Otaru Poseidon (11:00-18:00)",
          "八田壽司 (11:00-14:00 / 17:00-20:00)",
          "政寿司 本店 (11:00-15:00 / 17:00-21:00)"
        ]
      },
      {
        time: "下午",
        title: "歷史建築巡禮",
        type: ActivityType.SIGHTSEEING,
        description: "日本銀行舊小樽支店、出抜き小路 火の見櫓、石造倉庫群",
      },
      {
        time: "17:00",
        title: "小樽雪燈之路 (Snow Light Path)",
        type: ActivityType.SIGHTSEEING,
        description: "重點巡禮「手宮線場」與「運河場」，在零下溫度的燭光中散步。",
      },
      {
        time: "晚餐",
        title: "若鶏時代 なると 本店",
        type: ActivityType.FOOD,
        tags: ["定食", "炸雞"],
        description: "11:00-21:00",
      }
    ]
  },
  {
    day: 3,
    date: "2/10",
    weekday: "二",
    title: "天狗山夜景、海之街散策",
    location: "Otaru",
    hotel: HOTELS.OTARU.name,
    activities: [
      {
        time: "08:30",
        title: "三角市場",
        type: ActivityType.FOOD,
        tags: ["滝波食堂"],
        description: "超猛海鮮丼當早餐 (08:00-17:00)",
      },
      {
        time: "09:30",
        title: "搭火車前往朝里",
        type: ActivityType.SIGHTSEEING,
        description: "拍攝雪地海景",
      },
      {
        time: "11:00",
        title: "返回小樽市區",
        type: ActivityType.SIGHTSEEING,
        description: "小樽市綜合博物館運河館 + 小樽運河 (白天)",
      },
      {
        time: "午餐",
        title: "湯咖哩 (選擇)",
        type: ActivityType.FOOD,
        details: [
          "Century soup curry (11:00-21:30)",
          "COTARU 本店 (10:00-19:30)",
          "Soup Curry Daruo (11:30-14:30 / 17:00-20:30)"
        ]
      },
      {
        time: "15:00",
        title: "天狗山纜車",
        type: ActivityType.SIGHTSEEING,
        description: "俯瞰整個小樽港與雪燈天狗山會場。參觀天狗山神社、觀景台。",
        details: [
          "去程：車站前巴士總站4號站牌，搭乘 [9] 號公車 (約15-17分)",
          "回程：下車對面搭乘 [9] 號公車",
          "注意：末班公車通常在 21:00 前後"
        ]
      },
      {
        time: "晚餐",
        title: "小樽倉庫No.1 啤酒釀造所",
        type: ActivityType.FOOD,
        tags: ["德式香腸", "烤豬腳"],
        description: "11:00-22:00",
      }
    ]
  },
  {
    day: 4,
    date: "2/11",
    weekday: "三",
    title: "移動至札幌、薄野冰雕 ❄️",
    location: "Sapporo",
    hotel: HOTELS.SAPPORO.name,
    activities: [
      {
        time: "上午",
        title: "JR 前往札幌",
        type: ActivityType.TRANSPORT,
        description: "約 40 分鐘。先去飯店寄放行李。",
      },
      {
        time: "下午",
        title: "大通公園雪祭會場",
        type: ActivityType.SIGHTSEEING,
        description: "1-11 丁目，看巨型雪雕。",
      },
      {
        time: "點心",
        title: "The soft cream house",
        type: ActivityType.FOOD,
        tags: ["冰淇淋"],
        description: "11:00-21:00",
      },
      {
        time: "晚上",
        title: "薄野會場 (Susukino)",
        type: ActivityType.SIGHTSEEING,
        description: "看精緻冰雕",
      },
      {
        time: "晚餐",
        title: "成吉思汗烤肉 (選擇)",
        type: ActivityType.FOOD,
        details: [
          "成吉思汗 達摩 本店 (17:00-05:00)",
          "成吉思汗 薄野 4.4店 (11:30-23:00)"
        ]
      }
    ]
  },
  {
    day: 5,
    date: "2/12",
    weekday: "四",
    title: "二條市場、北海道神宮",
    location: "Sapporo",
    hotel: HOTELS.SAPPORO.name,
    activities: [
      {
        time: "早餐",
        title: "二條市場 大磯",
        type: ActivityType.FOOD,
        tags: ["海鮮丼", "烤魚"],
        description: "07:30-15:00 / 17:00-20:30",
      },
      {
        time: "上午",
        title: "北海道神宮",
        type: ActivityType.SIGHTSEEING,
        description: "散步",
      },
      {
        time: "下午",
        title: "市區觀光",
        type: ActivityType.SIGHTSEEING,
        description: "北海道廳紅磚廳舍、札幌站、狸小路商店街",
      },
      {
        time: "晚餐",
        title: "SOUP CURRY KING (要排隊)",
        type: ActivityType.FOOD,
        tags: ["湯咖哩"],
        description: "11:30–15:30 / 17:30–21:30",
        details: [
          "午餐：11:30-15:30 中午 or 狸小路逛街時先吃",
          "晚餐：17:30 排隊（建議 D4 吃）",
          "備案：Suage+ Soup Curry (11:00-20:00)"
        ]
      },
      {
        time: "晚上",
        title: "札幌電視塔",
        type: ActivityType.SIGHTSEEING,
        description: "看大通公園全景",
      },
      {
        time: "宵夜",
        title: "宵夜選擇",
        type: ActivityType.FOOD,
        tags: ["拉麵", "聖代"],
        details: [
          "札幌黑拉麵 (22:00-06:00)",
          "Parfait Shop NANAKAMADOU (18:00-00:00)",
          "Parfaiteria Mill (18:00-00:00)"
        ]
      }
    ]
  },
  {
    day: 6,
    date: "2/13",
    weekday: "五",
    title: "KKday 北海道一日遊",
    location: "Sapporo",
    hotel: HOTELS.SAPPORO.name,
    activities: [
      {
        time: "08:30",
        title: "札幌東急 REI 飯店集合",
        type: ActivityType.NOTE,
        description: "KKday 北海道一日遊集合點",
      },
      {
        time: "全日",
        title: "北海道一日遊",
        type: ActivityType.SIGHTSEEING,
        description: "洞爺湖溫泉街 ＆ 登別地獄谷 ＆ 昭和新山 ＆ 支笏湖",
      },
      {
        time: "18:30",
        title: "回到札幌東急 REI 飯店",
        type: ActivityType.NOTE,
        description: "一日遊結束",
      },
      {
        time: "晚餐",
        title: "炭火焼鳥 大",
        type: ActivityType.FOOD,
        tags: ["串燒"],
        description: "17:00–23:00",
      }
    ]
  },
  {
    day: 7,
    date: "2/14",
    weekday: "六",
    title: "最後採買、飛往東京",
    location: "Sapporo -> Tokyo",
    hotel: HOTELS.UENO.name,
    activities: [
      {
        time: "上午",
        title: "北海道大學",
        type: ActivityType.SIGHTSEEING,
      },
      {
        time: "午餐",
        title: "Picante Soup curry",
        type: ActivityType.FOOD,
        description: "11:30–22:00",
      },
      {
        time: "12:00",
        title: "前往機場",
        type: ActivityType.TRANSPORT,
        description: "出發去機場，泡溫泉 + 逛街",
      },
      {
        time: "12:30",
        title: "機場採買 & 溫泉",
        type: ActivityType.SHOPPING,
        description: "新千歲機場內採買藥妝、土產，可去機場溫泉放鬆",
      },
      {
        time: "18:00",
        title: "JL 522 起飛",
        type: ActivityType.FLIGHT,
        description: "CTS (18:00) -> HND (19:45)",
      },
      {
        time: "20:30",
        title: "前往上野",
        type: ActivityType.TRANSPORT,
        description: "東京單軌電車 ＋ 山手線 (約30-35分)",
      },
      {
        time: "晚餐",
        title: "上野晚餐",
        type: ActivityType.FOOD,
        description: "上野看要吃啥!",
      }
    ]
  },
  {
    day: 8,
    date: "2/15",
    weekday: "日",
    title: "Reece 回家、Yuly 移動",
    location: "Tokyo",
    hotel: HOTELS.SHINJUKU.name,
    activities: [
      {
        time: "09:10",
        title: "Reece 航班 JL 8663",
        type: ActivityType.FLIGHT,
        description: "NRT -> TPE",
      },
      {
        time: "10:00",
        title: "Yuly Check-out",
        type: ActivityType.NOTE,
        description: "最晚 10:00 退房",
      },
      {
        time: "11:00",
        title: "叙叙苑 上野丸井店 (預約)",
        type: ActivityType.FOOD,
        description: "午餐",
      },
      {
        time: "下午",
        title: "東京市區",
        type: ActivityType.SIGHTSEEING,
        description: "晴空塔、秋葉原、銀座博品館",
        details: [
          "⚠️ 銀座 NAGANO：2/13 上新品，這天是第三天，需抽整理券！"
        ],
      },
      {
        time: "傍晚",
        title: "新宿 Check-in",
        type: ActivityType.HOTEL,
        description: "VIA INN SHINJUKU",
      },
      {
        time: "晚上",
        title: "新宿 吉依卡哇",
        type: ActivityType.SHOPPING,
        description: "20:30 關門",
      },
      {
        time: "晚餐",
        title: "晚餐選擇",
        type: ActivityType.FOOD,
        details: [
          "AFURI 拉麵 (新宿住友大廈 11:00-20:00)",
          "壽司郎 (新宿三丁目店 11:00-23:00)",
          "藏壽司 (西新宿店 11:00-20:00)"
        ]
      }
    ]
  },
  {
    day: 9,
    date: "2/16",
    weekday: "一",
    title: "川越、澀谷",
    location: "Tokyo",
    hotel: HOTELS.SHINJUKU.name,
    activities: [
      {
        time: "早上",
        title: "川越",
        type: ActivityType.SIGHTSEEING,
        description: "川越吉依卡哇",
      },
      {
        time: "下午",
        title: "市區逛街",
        type: ActivityType.SHOPPING,
        description: "池袋太陽城、表參道 → 澀谷",
      },
      {
        time: "晚餐",
        title: "EDW yellow Shibuya",
        type: ActivityType.FOOD,
        tags: ["漢堡排", "蛋包飯"],
        description: "11:00–21:00",
      }
    ]
  },
  {
    day: 10,
    date: "2/17",
    weekday: "二",
    title: "隨意的一天",
    location: "Tokyo",
    hotel: HOTELS.SHINJUKU.name,
    activities: [
      {
        time: "全日",
        title: "自由活動",
        type: ActivityType.NOTE,
        description: "滾動式調整前面幾日行程",
      }
    ]
  },
  {
    day: 11,
    date: "2/18",
    weekday: "三",
    title: "Yuly 回家",
    location: "Tokyo",
    activities: [
      {
        time: "早上",
        title: "最後逛街",
        type: ActivityType.SHOPPING,
        description: "澀谷 (任天堂、寶可夢中心)、秋葉原",
      },
      {
        time: "15:00",
        title: "出發前往成田機場",
        type: ActivityType.TRANSPORT,
        description: "新宿 → 成田機場，成田 Express 約 1小時 20分",
        details: [
          "① 14:08 → 15:27 (Express 33號)",
          "② 14:38 → 15:57 (Express 35號)",
          "③ 15:08 → 16:31 (Express 37號)",
          "④ 15:38 → 16:57 (Express 39號)",
          "⑤ 16:08 → 17:29 (Express 41號)",
          "⑥ 16:38 → 17:58 (Express 43號)"
        ]
      },
      {
        time: "19:55",
        title: "TR 875 起飛",
        type: ActivityType.FLIGHT,
        description: "NRT (19:55) -> TPE (23:10)",
      }
    ]
  }
];