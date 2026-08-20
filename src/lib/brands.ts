export type Brand = {
  slug: string;
  name: string;
  nameEn: string;
  origin: string;
  category: string;
  tagline: string;
  intro: string;
  highlights: { title: string; body: string }[];
};

export const BRANDS: Brand[] = [
  {
    slug: "maison-mazet",
    name: "메종 마제",
    nameEn: "Maison Mazet",
    origin: "France",
    category: "Confectionery · Praline",
    tagline: "1636년부터 이어진 프랄린의 원형.",
    intro:
      "프랑스 몽타르지에서 시작된 프랄린의 원형을 지켜온 하우스입니다. 원료 배합과 로스팅 공정을 창립 당시의 방식으로 유지하며, 대량 생산 대신 소량 배치 생산을 고수합니다.",
    highlights: [
      {
        title: "헤리티지",
        body: "프랄린의 발상지에서 이어져 온 제법을 원형 그대로 유지하는 소수의 하우스 중 하나입니다.",
      },
      {
        title: "채널 적합성",
        body: "프리미엄 그로서리, 호텔 기프팅, 백화점 시즌 프로그램에 최적화된 패키지 구성을 제안합니다.",
      },
      {
        title: "수입 조건",
        body: "정온 컨테이너 기준 리드타임과 시즌별 물량 계획을 사전 설계하여 품질 편차를 제거합니다.",
      },
    ],
  },
  {
    slug: "cocoba",
    name: "코코바",
    nameEn: "Cocoba",
    origin: "United Kingdom",
    category: "Chocolate · Hot Chocolate",
    tagline: "영국식 초콜릿 리추얼의 완성도.",
    intro:
      "영국 켄트 기반의 아티산 초콜릿 하우스로, 핫초콜릿 스푼과 바 제품군에서 강한 브랜드 인지를 확보하고 있습니다. 카카오 소싱부터 몰딩까지 자체 공방에서 관리합니다.",
    highlights: [
      {
        title: "제품 포트폴리오",
        body: "핫초콜릿 스터러, 바, 기프트 박스로 구성되어 시즌 프로모션 대응력이 높습니다.",
      },
      {
        title: "채널 적합성",
        body: "카페·베이커리 B2B 납품과 온라인 기프트 채널을 동시에 운영할 수 있는 구조입니다.",
      },
      {
        title: "수입 조건",
        body: "라벨 심사와 성분 검토를 사전 완료하여 통관 반려 리스크를 계약 이전에 제거합니다.",
      },
    ],
  },
  {
    slug: "terra-del-tuono",
    name: "테라델투오노",
    nameEn: "Terra del Tuono",
    origin: "Italy",
    category: "Balsamic Vinegar",
    tagline: "레지오 에밀리아의 발사믹, 시간의 밀도.",
    intro:
      "이탈리아 레지오 에밀리아의 전통 발사믹 아세테리아입니다. 목재 배럴 숙성 체계를 유지하며 D.O.P 등급을 포함한 정통 라인업을 보유하고 있습니다.",
    highlights: [
      {
        title: "품질 체계",
        body: "배럴 시리즈별 숙성 연차 관리와 원산지 인증 체계를 그대로 유지합니다.",
      },
      {
        title: "채널 적합성",
        body: "파인다이닝, 호텔 F&B, 프리미엄 델리 채널에서의 셰프 제안형 영업에 적합합니다.",
      },
      {
        title: "수입 조건",
        body: "품목 분류와 식약처 신고 절차를 표준화하여 반복 발주 시 리드타임을 단축합니다.",
      },
    ],
  },
  {
    slug: "arcane-island",
    name: "아케인아일랜드",
    nameEn: "Arcane Island",
    origin: "Europe",
    category: "Spirits · Craft Beverage",
    tagline: "섬의 물성과 크래프트 증류의 균형.",
    intro:
      "섬 지역의 원료와 물을 기반으로 한 크래프트 스피릿 브랜드입니다. 소규모 배치 증류를 유지하며 보틀 디자인과 브랜드 서사를 일관되게 관리합니다.",
    highlights: [
      {
        title: "브랜드 서사",
        body: "산지와 물성을 중심으로 한 스토리텔링이 국내 프리미엄 바 채널에서 강점으로 작동합니다.",
      },
      {
        title: "채널 적합성",
        body: "호텔 바, 시그니처 다이닝, 한정 리테일 큐레이션 채널을 우선 타깃으로 설계합니다.",
      },
      {
        title: "수입 조건",
        body: "주류 수입 요건과 표시 사항을 사전 검토하여 초도 물량 계획을 안정적으로 수립합니다.",
      },
    ],
  },
];

export function getBrand(slug: string) {
  return BRANDS.find((b) => b.slug === slug);
}
