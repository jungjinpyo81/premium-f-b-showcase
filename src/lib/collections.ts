export type CollectionBrand = {
  name: string;
  nameKo: string;
  origin: string;
  note: string;
  /** slug in BRANDS when a full brand page exists */
  brandSlug?: string;
};

export type Collection = {
  slug: string;
  title: string;
  titleKo: string;
  lead: string;
  intro: string;
  brands: CollectionBrand[];
};

export const COLLECTIONS: Collection[] = [
  {
    slug: "sweet-moments",
    title: "Sweet Moments",
    titleKo: "달콤한 순간",
    lead: "하루의 끝에 놓이는 작은 사치.",
    intro:
      "유럽의 오래된 제과 하우스가 지켜온 배합과 공정을 그대로 옮겨옵니다. 대량 생산이 아닌 소량 배치, 그리고 선물로 건네기에 부족함 없는 패키지 완성도를 기준으로 선별합니다.",
    brands: [
      {
        name: "Cocoba",
        nameKo: "코코바",
        origin: "United Kingdom",
        note: "핫초콜릿 스터러와 아티산 바로 구성된 영국식 초콜릿 리추얼.",
        brandSlug: "cocoba",
      },
      {
        name: "Maison Mazet",
        nameKo: "메종 마제",
        origin: "France",
        note: "1636년부터 이어진 프랄린의 원형을 지켜온 하우스.",
        brandSlug: "maison-mazet",
      },
      {
        name: "Churchill's",
        nameKo: "처칠스",
        origin: "United Kingdom",
        note: "수집하고 싶어지는 틴 케이스에 담긴 영국 전통 캔디.",
      },
    ],
  },
  {
    slug: "european-pantry",
    title: "European Pantry",
    titleKo: "유러피안 팬트리",
    lead: "주방의 격을 바꾸는 한 스푼.",
    intro:
      "산지와 숙성, 인증 체계까지 확인한 고급 식자재만을 소개합니다. 파인다이닝과 프리미엄 델리 채널에서 셰프의 제안으로 이어질 수 있는 라인업으로 구성합니다.",
    brands: [
      {
        name: "Terra del Tuono",
        nameKo: "테라델투오노",
        origin: "Italy",
        note: "레지오 에밀리아의 발사믹. 고체형 발사믹을 포함한 정통 라인업.",
        brandSlug: "terra-del-tuono",
      },
    ],
  },
  {
    slug: "plant-based-life",
    title: "Plant-Based Life",
    titleKo: "식물성 라이프",
    lead: "대체가 아니라 선택으로.",
    intro:
      "식물성 대체 유제품 카테고리는 이제 대안이 아닌 일상의 선택지입니다. 맛과 텍스처의 완성도, 그리고 국내 채널에서 반복 구매가 가능한 가격 구조를 함께 검토합니다.",
    brands: [
      {
        name: "Valsoia",
        nameKo: "발소이아",
        origin: "Italy",
        note: "이탈리아 식물성 유제품의 기준. 음료·디저트 전 라인 운영.",
      },
    ],
  },
  {
    slug: "natures-bites",
    title: "Nature's Bites",
    titleKo: "네이처스 바이트",
    lead: "덜어낼수록 분명해지는 맛.",
    intro:
      "원물의 상태와 가공 방식이 그대로 드러나는 카테고리입니다. 첨가를 최소화한 스낵을 중심으로, 프리미엄 그로서리와 오피스 스낵 채널에 동시에 대응합니다.",
    brands: [
      {
        name: "Crispy Natural",
        nameKo: "크리스피 내추럴",
        origin: "Poland",
        note: "과일과 채소를 그대로 구워낸 크리스프 스낵.",
      },
      {
        name: "Noynuts",
        nameKo: "노이넛츠",
        origin: "Europe",
        note: "로스팅 밸런스를 중심으로 설계한 넛츠 포트폴리오.",
      },
    ],
  },
  {
    slug: "refresh-relax",
    title: "Refresh & Relax",
    titleKo: "리프레시 & 릴랙스",
    lead: "잔을 채우는 시간의 온도.",
    intro:
      "음료와 커피는 브랜드 경험이 가장 자주 반복되는 카테고리입니다. 호텔·다이닝·오피스 채널의 운영 조건에 맞춰 포맷과 물량 계획을 함께 설계합니다.",
    brands: [
      {
        name: "Emilio",
        nameKo: "에밀리오",
        origin: "Italy",
        note: "일상의 리듬에 맞춘 유러피안 음료 포트폴리오.",
      },
      {
        name: "Luwak Premium Coffee",
        nameKo: "루왁 프리미엄 커피",
        origin: "Indonesia",
        note: "희소성과 서사를 함께 갖춘 프리미엄 커피 라인.",
      },
    ],
  },
];

export function getCollection(slug: string) {
  return COLLECTIONS.find((c) => c.slug === slug);
}
