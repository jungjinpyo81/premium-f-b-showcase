import type { Locale } from "./types";

export type BusinessCopy = {
  nav: { business: string; trade: string; distribution: string; consulting: string };
  slogan: { headline: string; body: string };
  whatWeDo: {
    eyebrow: string;
    title: string;
    lead: string;
    cards: { key: "globe" | "truck" | "store" | "chart"; title: string; body: string }[];
  };
  trade: {
    eyebrow: string;
    title: string;
    subtitle: string;
    rows: { key: "customs" | "quarantine" | "freight" | "warehouse"; label: string; body: string }[];
  };
  distribution: {
    eyebrow: string;
    title: string;
    lead: string;
    offline: { label: string; items: { title: string; body: string }[] };
    online: { label: string; items: { title: string; body: string }[] };
  };
  consulting: {
    eyebrow: string;
    title: string;
    body: string;
    note: string;
    cta: string;
  };
  contact: {
    label: string;
    email: string;
    phone: string;
    hours: string;
    locationLabel: string;
    address: string;
    mapNote: string;
  };
};

const ko: BusinessCopy = {
  nav: { business: "비즈니스", trade: "국제 물류", distribution: "유통 · 판매", consulting: "컨설팅" },
  slogan: {
    headline: "Taste · Culture · Value를 잇다.",
    body: "최상급 원료와 타협하지 않는 품질, 지속 가능한 친환경 가치를 담은 프리미엄 브랜드를 엄선하여 선보입니다.",
  },
  whatWeDo: {
    eyebrow: "What We Do",
    title: "브랜드의 한국 진출, 원스톱 솔루션",
    lead: "소싱부터 물류/통관, 유통, 컨설팅까지 네 개의 축으로 운영합니다.",
    cards: [
      { key: "globe", title: "Global Sourcing \n(글로벌 소싱)", body: "현지 네트워크를 통해 브랜드를 직접 검증하고, 한국 시장에 맞는 라인업을 선별합니다." },
      { key: "truck", title: "원스톱 국제 물류 및 특송", body: "항공·해상·내륙 복합운송과 국제 특송등 맞춤 물류를 설계합니다." },
      { key: "store", title: "온·오프라인 유통 / 판매", body: "백화점·마트·편의점부터 오픈마켓· \n버티컬 커머스까지 상품에 맞는 최적의 채널에 연결합니다." },
      { key: "chart", title: "F&B 수입대행 및 컨설팅", body: "수입 계약, 인허가, 가격 구조, 마케팅\n까지 전담 컨설턴트가 함께합니다." },
    ],
  },
  trade: {
    eyebrow: "Logistics & Customs",
    title: "Global Trade Made Simple",
    subtitle: "보다 쉬운 수출입, 유럽커넥트가 대신 관리해드립니다.",
    rows: [
      { key: "freight", label: "국제 물류 관리", body: "항공/해상/내륙 국제 복합운송, 국제 특송 서비스" },
      { key: "customs", label: "통관", body: "HS코드 분류, 서류 검토, 통관신고까지 정확하고 빠르게 처리" },
      { key: "quarantine", label: "검역", body: "식품/화장품 등 수입신고, 한글표시 사항, 라벨링, 보수작업" },
      { key: "warehouse", label: "창고, 3PL 물류", body: "온라인 유통(B2C, 홈쇼핑, 쿠팡) 연계\n최첨단 항온항습 관리, 고액 화재보험" },
    ],
  },
  distribution: {
    eyebrow: "Distribution",
    title: "브랜드와 고객을 잇는 통합 유통 솔루션",
    lead: "채널의 성격에 맞춰 가격 구조와 운영 방식을 다르게 설계합니다.",
    offline: {
      label: "오프라인 유통",
      items: [
        { title: "백화점 & 프리미엄 스토어", body: "고급화 전략" },
        { title: "대형마트 및 편의점", body: "대중적 접점 확보 및 안정적 공급망" },
      ],
    },
    online: {
      label: "온라인 유통",
      items: [
        { title: "오픈마켓 & 종합몰", body: "쿠팡, 스마트스토어 등 최적화 운영" },
        { title: "전문몰 & 버티컬 커머스", body: "컬리, 무신사 등 타겟 맞춤 큐레이션" },
      ],
    },
  },
  consulting: {
    eyebrow: "Consulting",
    title: "One-Stop F&B Consulting",
    body: "시장 조사부터 수입 계약, 마케팅 및 유통 전략까지. 복잡한 해외 F&B 수입 절차를 전담 컨설턴트가 1:1 맞춤형으로 기획·실행해드립니다.",
    note: "(현재 세부 서비스 준비 중입니다.)",
    cta: "컨설팅 문의",
  },
  contact: {
    label: "Contact",
    email: "contact@europeconnect.kr",
    phone: "010-5683-2373",
    hours: "10:00 ~ 18:00 (점심 12-13, 일요일 휴무)",
    locationLabel: "Location",
    address: "경기도 고양시 덕양구 청초로 10, 에이동 418호",
    mapNote: "지도 준비 중",
  },
};

const en: BusinessCopy = {
  nav: { business: "Business", trade: "Logistics", distribution: "Distribution", consulting: "Consulting" },
  slogan: {
    headline: "Connecting Taste · Culture · Value.",
    body: "We curate premium brands built on uncompromising quality, the finest ingredients and sustainable values.",
  },
  whatWeDo: {
    eyebrow: "What We Do",
    title: "One team, from sourcing to shelf",
    lead: "Four operating pillars: sourcing, customs, logistics, distribution and consulting.",
    cards: [
      { key: "globe", title: "Global Sourcing", body: "We verify brands on the ground and select the line-up that fits the Korean market." },
      { key: "truck", title: "One-stop freight & express", body: "Air, ocean and inland multimodal transport plus international express, managed in one place." },
      { key: "store", title: "Online & offline distribution", body: "From department stores and convenience chains to open markets and vertical commerce." },
      { key: "chart", title: "F&B import agency & consulting", body: "Contracts, permits, price architecture and marketing with a dedicated consultant." },
    ],
  },
  trade: {
    eyebrow: "Logistics & Customs",
    title: "Global Trade Made Simple",
    subtitle: "Easier import and export — Europe Connect handles it for you.",
    rows: [
      { key: "freight", label: "Freight management", body: "Air, ocean and inland multimodal transport and international express services." },
      { key: "customs", label: "Customs clearance", body: "HS code classification, document review and declaration, handled accurately and fast." },
      { key: "quarantine", label: "Quarantine", body: "Food and cosmetics import declarations, Korean labelling and re-work." },
      { key: "warehouse", label: "Warehouse & 3PL", body: "Climate-controlled facilities for B2C, home shopping and Coupang, with high-value fire insurance." },
    ],
  },
  distribution: {
    eyebrow: "Distribution",
    title: "An integrated route from brand to customer",
    lead: "Pricing and operations are designed channel by channel.",
    offline: {
      label: "Offline retail",
      items: [
        { title: "Department stores & premium grocers", body: "Positioning for the high end" },
        { title: "Hypermarkets & convenience stores", body: "Mass reach with a stable supply chain" },
      ],
    },
    online: {
      label: "Online retail",
      items: [
        { title: "Open markets & general malls", body: "Optimised operations on Coupang, Smart Store and more" },
        { title: "Specialist & vertical commerce", body: "Targeted curation for Kurly, Musinsa and similar" },
      ],
    },
  },
  consulting: {
    eyebrow: "Consulting",
    title: "One-Stop F&B Consulting",
    body: "From market research to import contracts, marketing and distribution strategy — a dedicated consultant plans and executes the entire import process with you.",
    note: "(Detailed service tiers are in preparation.)",
    cta: "Request consulting",
  },
  contact: {
    label: "Contact",
    email: "contact@europeconnect.kr",
    phone: "010-7562-5407",
    hours: "10:00 – 17:00 (lunch 12–13, closed Sunday)",
    locationLabel: "Location",
    address: "418, Building A, 10 Cheongcho-ro, Deogyang-gu, Goyang-si, Gyeonggi-do, Korea",
    mapNote: "Map coming soon",
  },
};

const ja: BusinessCopy = {
  nav: { business: "ビジネス", trade: "国際物流", distribution: "流通・販売", consulting: "コンサルティング" },
  slogan: {
    headline: "Taste · Culture · Value をつなぐ。",
    body: "最上級の原料と妥協のない品質、持続可能な価値を備えたプレミアムブランドを厳選してご紹介します。",
  },
  whatWeDo: {
    eyebrow: "What We Do",
    title: "ブランドの韓国進出を、一つのチームで",
    lead: "ソーシング、通関、物流、流通、コンサルティングの4つの柱で運営します。",
    cards: [
      { key: "globe", title: "グローバルソーシング", body: "現地ネットワークでブランドを直接検証し、韓国市場に合うラインナップを選定します。" },
      { key: "truck", title: "ワンストップ国際物流・特送", body: "航空・海上・内陸の複合輸送と国際特送を単一窓口で管理します。" },
      { key: "store", title: "オン・オフライン流通／販売", body: "百貨店・量販店から総合モール・バーティカルコマースまで設計し運営します。" },
      { key: "chart", title: "F&B輸入代行・コンサルティング", body: "輸入契約、許認可、価格設計、マーケティングまで専任コンサルタントが伴走します。" },
    ],
  },
  trade: {
    eyebrow: "Logistics & Customs",
    title: "Global Trade Made Simple",
    subtitle: "より簡単な輸出入を、ユーロップコネクトが代行します。",
    rows: [
      { key: "freight", label: "国際物流管理", body: "航空／海上／内陸の国際複合輸送、国際特送サービス。" },
      { key: "customs", label: "通関", body: "HSコード分類、書類確認、通関申告まで正確かつ迅速に処理します。" },
      { key: "quarantine", label: "検疫", body: "食品・化粧品などの輸入申告、韓国語表示、ラベリング、補修作業。" },
      { key: "warehouse", label: "倉庫・3PL物流", body: "オンライン流通（B2C、通販、Coupang）向けの恒温恒湿管理と高額火災保険。" },
    ],
  },
  distribution: {
    eyebrow: "Distribution",
    title: "ブランドと顧客をつなぐ統合流通ソリューション",
    lead: "チャネルの性格に合わせて価格構造と運営方法を設計します。",
    offline: {
      label: "オフライン流通",
      items: [
        { title: "百貨店＆プレミアムストア", body: "高級化戦略" },
        { title: "大型スーパー・コンビニ", body: "大衆的な接点確保と安定した供給網" },
      ],
    },
    online: {
      label: "オンライン流通",
      items: [
        { title: "オープンマーケット＆総合モール", body: "Coupang、スマートストアなどの最適化運営" },
        { title: "専門モール＆バーティカルコマース", body: "Kurly、Musinsaなどターゲット別キュレーション" },
      ],
    },
  },
  consulting: {
    eyebrow: "Consulting",
    title: "One-Stop F&B Consulting",
    body: "市場調査から輸入契約、マーケティング・流通戦略まで。複雑な海外F&B輸入手続きを専任コンサルタントが1:1で企画・実行します。",
    note: "（詳細サービスは準備中です。）",
    cta: "コンサルティングのお問い合わせ",
  },
  contact: {
    label: "Contact",
    email: "contact@europeconnect.kr",
    phone: "010-7562-5407",
    hours: "10:00 ~ 17:00（昼休み12-13、日曜休み）",
    locationLabel: "Location",
    address: "京畿道高陽市徳陽区清草路10 A棟418号",
    mapNote: "地図は準備中です",
  },
};

const zh: BusinessCopy = {
  nav: { business: "业务", trade: "国际物流", distribution: "流通 · 销售", consulting: "咨询" },
  slogan: {
    headline: "连接 Taste · Culture · Value。",
    body: "我们精选采用顶级原料、坚持品质、并具备可持续价值的高端品牌。",
  },
  whatWeDo: {
    eyebrow: "What We Do",
    title: "品牌进入韩国市场，由一个团队完成",
    lead: "以采购、通关、物流、流通与咨询四大支柱运营。",
    cards: [
      { key: "globe", title: "全球采购", body: "通过当地网络亲自验证品牌，甄选适合韩国市场的产品线。" },
      { key: "truck", title: "一站式国际物流与快递", body: "空运、海运与内陆多式联运及国际特快，统一窗口管理。" },
      { key: "store", title: "线上线下流通 / 销售", body: "从百货、卖场、便利店到综合电商与垂直电商的渠道设计与运营。" },
      { key: "chart", title: "F&B 进口代理与咨询", body: "进口合同、许可、价格结构与营销，由专属顾问全程负责。" },
    ],
  },
  trade: {
    eyebrow: "Logistics & Customs",
    title: "Global Trade Made Simple",
    subtitle: "更简单的进出口，由 Europe Connect 代为管理。",
    rows: [
      { key: "freight", label: "国际物流管理", body: "空运／海运／内陆国际多式联运与国际特快服务。" },
      { key: "customs", label: "通关", body: "HS 编码归类、单证审核、报关申报，准确且高效。" },
      { key: "quarantine", label: "检验检疫", body: "食品／化妆品等进口申报、韩文标示、贴标与返工作业。" },
      { key: "warehouse", label: "仓储与 3PL", body: "面向线上流通（B2C、电视购物、Coupang）的恒温恒湿管理与高额火险。" },
    ],
  },
  distribution: {
    eyebrow: "Distribution",
    title: "连接品牌与顾客的整合流通方案",
    lead: "依据渠道特性分别设计价格结构与运营方式。",
    offline: {
      label: "线下流通",
      items: [
        { title: "百货与高端商店", body: "高端化策略" },
        { title: "大型卖场与便利店", body: "获取大众触点与稳定供应链" },
      ],
    },
    online: {
      label: "线上流通",
      items: [
        { title: "开放平台与综合商城", body: "Coupang、Smart Store 等优化运营" },
        { title: "专业商城与垂直电商", body: "Kurly、Musinsa 等目标客群定制策展" },
      ],
    },
  },
  consulting: {
    eyebrow: "Consulting",
    title: "One-Stop F&B Consulting",
    body: "从市场调研到进口合同、营销及流通策略，专属顾问以一对一方式规划并执行复杂的海外 F&B 进口流程。",
    note: "（详细服务内容筹备中。）",
    cta: "咨询洽谈",
  },
  contact: {
    label: "Contact",
    email: "contact@europeconnect.kr",
    phone: "010-7562-5407",
    hours: "10:00 ~ 17:00（午休 12-13，周日休息）",
    locationLabel: "Location",
    address: "京畿道高阳市德阳区青草路10, A栋418号",
    mapNote: "地图准备中",
  },
};

export const BUSINESS: Record<Locale, BusinessCopy> = { ko, en, ja, zh };
