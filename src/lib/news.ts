export type NewsItem = {
  slug: string;
  date: string;
  category: "공지" | "뉴스";
  title: string;
  summary: string;
  body: string[];
};

export const NEWS: NewsItem[] = [
  {
    slug: "arcane-island-partnership",
    date: "2026.07.28",
    category: "뉴스",
    title: "아케인아일랜드 국내 파트너십 계약 체결",
    summary:
      "유럽커넥트가 크래프트 스피릿 브랜드 아케인아일랜드의 국내 수입 파트너로 선정되었습니다.",
    body: [
      "유럽커넥트는 크래프트 스피릿 브랜드 아케인아일랜드와 국내 수입 파트너십 계약을 체결했습니다.",
      "초도 물량은 호텔 바 및 시그니처 다이닝 채널을 중심으로 배정되며, 채널별 가격 구조와 운영 가이드라인은 브랜드 본사와 공동으로 관리합니다.",
    ],
  },
  {
    slug: "terra-del-tuono-lineup",
    date: "2026.06.15",
    category: "뉴스",
    title: "테라델투오노 D.O.P 라인 국내 정식 도입",
    summary: "레지오 에밀리아 전통 발사믹의 숙성 라인업이 국내 파인다이닝 채널에 도입됩니다.",
    body: [
      "테라델투오노의 배럴 숙성 라인업이 국내에 정식 도입됩니다.",
      "품목 분류와 식약처 신고 절차를 사전 완료하여 반복 발주 시의 리드타임을 단축했습니다.",
    ],
  },
  {
    slug: "customs-guideline-update",
    date: "2026.05.02",
    category: "공지",
    title: "수입 식품 라벨 표시 기준 변경 안내",
    summary: "표시 사항 기준 변경에 따른 파트너 브랜드 대응 절차를 안내드립니다.",
    body: [
      "수입 식품 표시 기준 변경에 따라 기존 라벨의 일부 항목 수정이 필요합니다.",
      "파트너 브랜드는 담당 디렉터를 통해 개정 라벨 시안을 전달받으실 수 있으며, 적용 일정은 개별 안내됩니다.",
    ],
  },
  {
    slug: "b2b-inquiry-process",
    date: "2026.03.10",
    category: "공지",
    title: "B2B 파트너십 문의 절차 안내",
    summary: "문의 접수 후 담당 디렉터 배정까지의 절차와 회신 기준을 안내드립니다.",
    body: [
      "파트너십 문의는 웹사이트 하단의 문의 폼을 통해 접수됩니다.",
      "접수 이후 영업일 기준 24시간 내에 담당 디렉터가 배정되어 회신드립니다.",
    ],
  },
];

export function getNews(slug: string) {
  return NEWS.find((n) => n.slug === slug);
}
