export type SiteContent = {
  brandStory: string;
  logistics: string;
};

export const STORAGE_KEY = "maison-site-content";

export const defaultContent: SiteContent = {
  brandStory: `<p style="text-align:justify"><span style="font-family:'Nanum Myeongjo',serif">우리는 음식이 아니라 <b>브랜드의 시간</b>을 다룹니다. 2011년 첫 다이닝 컨설팅을 시작한 이후, 국내외 137개 프리미엄 F&amp;B 브랜드의 메뉴 설계, 공간 서사, 서비스 프로토콜을 함께 만들어 왔습니다.</span></p><p style="text-align:justify"><span style="font-family:'Noto Sans KR',sans-serif">한 접시에 담기는 온도와 침묵의 간격까지 설계합니다. 화려한 수사 대신, 반복 가능한 품질과 검증된 운영 데이터를 남깁니다.</span></p>`,
  logistics: `<p style="text-align:left"><span style="font-family:'Noto Sans KR',sans-serif">전국 4개 콜드체인 허브에서 <b>2°C ~ 4°C</b> 정온 배송을 운영합니다. 산지 입고부터 매장 도착까지 평균 <b>18시간</b>, 온도 이탈률 0.3% 이하를 유지합니다.</span></p><p style="text-align:left"><span style="font-family:'Noto Sans KR',sans-serif">수도권 익일 새벽 입고 · 전국 광역시 익일 오전 입고 · 특수 품목 전용 차량 상시 배차.</span></p>`,
};

export function loadContent(): SiteContent {
  if (typeof window === "undefined") return defaultContent;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultContent;
    return { ...defaultContent, ...JSON.parse(raw) } as SiteContent;
  } catch {
    return defaultContent;
  }
}

export function saveContent(content: SiteContent) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}
