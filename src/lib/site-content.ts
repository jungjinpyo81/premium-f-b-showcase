export type SiteContent = {
  brandStory: string;
  logistics: string;
};

export const STORAGE_KEY = "europe-connect-site-content";

export const defaultContent: SiteContent = {
  brandStory: `<p style="text-align:justify"><span style="font-family:'Noto Serif KR',serif">유럽커넥트는 유럽 등 현지의 프리미엄 F&B 브랜드를 발굴하고, 한국시장에 안착시키는 전문 큐레이터이자 오퍼레이터입니다.</span></p><p style="text-align:justify"><span style="font-family:'Noto Sans KR',sans-serif">17년 이상 축적된 소싱 네트워크와 통관 실무 경험을 바탕으로, 브랜드 발굴부터 수입 통관, 물류 프레임워크 설계, 유통 채널 입점까지 통합 관리합니다.\u00a0</span></p>`,
  logistics: `<p style="text-align:left"><span style="font-family:'Noto Sans KR',sans-serif">유럽 산지 출고부터 국내 물류센터 입고까지, 온도대별 정온 관리와 수입 식품 규격 검토를 병행합니다. 라벨 심사, 성분 검토, 식약처 신고 등 까다로운 절차를 사전 설계 단계에서 해소합니다.</span></p><p style="text-align:left"><span style="font-family:'Noto Sans KR',sans-serif">파트너 브랜드는 재고 회전과 채널 전략에만 집중하고, 통관 리스크와 물류 변수는 유럽커넥트가 책임집니다.</span></p>`,
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
