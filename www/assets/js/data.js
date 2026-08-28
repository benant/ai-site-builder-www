/* =========================================================
 * ASBA 공유 데이터 (빌드 불필요 — 그대로 <script src> 로 로드)
 * 가격/카테고리/폼 스키마를 여기서만 수정하면 두 페이지 모두 반영됨
 * ========================================================= */

window.ASBA = window.ASBA || {};

ASBA.CATEGORIES = [
  {
    code: "landing",
    name: "랜딩 / 홍보 페이지",
    desc: "제품·서비스 소개와 전환(CTA)에 집중한 단일 목적 페이지",
    basePrice: 150000,
    perPagePrice: 60000,
    defaultPages: 1,
    pagesLabel: "추가 섹션/서브페이지",
    icon: "🚀",
    templates: ["t-landing-bold", "t-landing-minimal", "t-landing-gradient"]
  },
  {
    code: "portfolio",
    name: "포트폴리오",
    desc: "작업물 소개 중심의 개인·팀 포트폴리오 사이트",
    basePrice: 200000,
    perPagePrice: 70000,
    defaultPages: 4,
    pagesLabel: "추가 페이지",
    icon: "🎨",
    templates: ["t-folio-grid", "t-folio-editorial"]
  },
  {
    code: "business",
    name: "기업 / 소호 홈페이지",
    desc: "회사 소개, 서비스, 연락처를 담은 표준 비즈니스 사이트",
    basePrice: 300000,
    perPagePrice: 80000,
    defaultPages: 4,
    pagesLabel: "추가 페이지",
    icon: "🏢",
    templates: ["t-biz-classic", "t-biz-modern"]
  },
  {
    code: "shop",
    name: "쇼핑몰 (랜딩형)",
    desc: "상품 소개와 주문 문의 중심의 경량 쇼핑몰 랜딩",
    basePrice: 450000,
    perPagePrice: 100000,
    defaultPages: 5,
    pagesLabel: "추가 상품/페이지",
    icon: "🛒",
    templates: ["t-shop-clean", "t-shop-vivid"]
  },
  {
    code: "blog",
    name: "블로그 / 미디어",
    desc: "글 발행과 열람에 최적화된 콘텐츠 사이트",
    basePrice: 250000,
    perPagePrice: 60000,
    defaultPages: 4,
    pagesLabel: "추가 페이지",
    icon: "✍️",
    templates: ["t-blog-serif", "t-blog-magazine"]
  },
  {
    code: "restaurant",
    name: "식당 / 카페",
    desc: "메뉴, 위치, 영업시간을 한눈에 보여주는 매장 사이트",
    basePrice: 180000,
    perPagePrice: 60000,
    defaultPages: 4,
    pagesLabel: "추가 페이지",
    icon: "☕",
    templates: ["t-resto-warm", "t-resto-dark"]
  }
];

/* 옵션 (견적 계산기 + 의뢰 폼 공통) */
ASBA.OPTIONS = [
  { code: "seo",     name: "SEO 기본 패키지",      price: 80000,  desc: "메타태그·OG 이미지·sitemap 최적화" },
  { code: "multi",   name: "다국어 지원 (1개 추가)", price: 120000, desc: "한국어 + 영어 등 1개 언어 추가" },
  { code: "logo",    name: "AI 로고 제작",          price: 60000,  desc: "로고 시안 3종 생성 후 선택" },
  { code: "contact", name: "문의 폼 / 지도 임베드",  price: 50000,  desc: "연락처 폼, 지도 삽입 등" }
];

/* 템플릿 메타 (실제 썸네일은 assets/img/templates/{id}.png 준비 예정) */
ASBA.TEMPLATES = {
  "t-landing-bold":     { name: "Bold Landing",   tone: "강렬한 헤드라인 중심" },
  "t-landing-minimal":  { name: "Minimal Landing",tone: "여백 중심 미니멀" },
  "t-landing-gradient": { name: "Gradient Landing",tone: "그라디언트 모던" },
  "t-folio-grid":       { name: "Folio Grid",     tone: "그리드 작업 갤러리" },
  "t-folio-editorial":  { name: "Editorial Folio",tone: "매거진 스타일" },
  "t-biz-classic":      { name: "Classic Biz",    tone: "신뢰감 있는 클래식" },
  "t-biz-modern":       { name: "Modern Biz",     tone: "심플 모던" },
  "t-shop-clean":       { name: "Clean Shop",     tone: "깔끔한 상품 나열" },
  "t-shop-vivid":       { name: "Vivid Shop",     tone: "컬러풀한 프로모션" },
  "t-blog-serif":       { name: "Serif Blog",     tone: "읽기 좋은 세리프" },
  "t-blog-magazine":    { name: "Magazine Blog",  tone: "매거진 레이아웃" },
  "t-resto-warm":       { name: "Warm Resto",     tone: "따뜻한 식욕 톤" },
  "t-resto-dark":       { name: "Dark Resto",     tone: "세련된 다크 톤" }
};

/* 카테고리별 동적 폼 필드 (의뢰 폼에서 렌더링)
 * type: text | textarea | url | tel | number
 * required: true 이면 필수 */
ASBA.FORM_SCHEMAS = {
  landing: [
    { key: "product",        label: "소개할 제품/서비스", type: "text",    required: true },
    { key: "main_cta",       label: "주요 CTA (예: 구매하기, 문의하기)", type: "text", required: true },
    { key: "highlights",     label: "핵심 강점 3가지", type: "textarea", placeholder: "줄바꿈으로 구분" }
  ],
  portfolio: [
    { key: "field",          label: "분야 (예: 웹디자인, 사진)", type: "text", required: true },
    { key: "works",          label: "작업물 개수", type: "number", required: true, min: 1 },
    { key: "works_desc",     label: "작업물 소개 자료", type: "textarea", placeholder: "제목과 설명을 줄바꿈으로 구분. 이미지는 추후 업로드 안내" }
  ],
  business: [
    { key: "company_intro",  label: "회사 소개", type: "textarea", required: true },
    { key: "services",       label: "서비스/제품 목록", type: "textarea", required: true, placeholder: "줄바꿈으로 구분" },
    { key: "history",        label: "연혁 (선택)", type: "textarea" }
  ],
  shop: [
    { key: "products",       label: "판매 상품 목록", type: "textarea", required: true, placeholder: "상품명 - 가격 형식, 줄바꿈으로 구분" },
    { key: "shipping",       label: "배송 안내", type: "textarea", required: true },
    { key: "order_method",   label: "주문 방법", type: "select", options: ["문의 폼", "전화", "외부 링크(스마트스토어 등)"], required: true }
  ],
  blog: [
    { key: "topics",         label: "다룰 주제", type: "textarea", required: true },
    { key: "initial_posts",  label: "초기 게시글 수", type: "number", min: 0 },
    { key: "author_info",    label: "작성자 소개", type: "textarea" }
  ],
  restaurant: [
    { key: "menu",           label: "메뉴 및 가격", type: "textarea", required: true, placeholder: "메뉴명 - 가격, 줄바꿈으로 구분" },
    { key: "hours",          label: "영업시간", type: "text", required: true, placeholder: "예) 평일 10:00~22:00" },
    { key: "address",        label: "매장 주소", type: "text", required: true },
    { key: "closed_days",    label: "휴무일 (선택)", type: "text" }
  ]
};

/* 공통 폼 필드 */
ASBA.COMMON_FIELDS = [
  { key: "site_name",   label: "사이트 이름", type: "text", required: true },
  { key: "tagline",     label: "한 줄 설명", type: "text", required: true, placeholder: "예) 성수동 수제 케이크 전문점" },
  { key: "brand_color", label: "선호 브랜드 색상 (선택)", type: "color" },
  { key: "ref_url",     label: "참고 사이트 URL (선택)", type: "url", placeholder: "https://..." },
  { key: "contact",     label: "연락 가능 이메일", type: "email", required: true }
];

/* 견적 계산: 카테고리 + 추가 페이지 수 + 옵션 배열 → 금액 객체 */
ASBA.calcQuote = function (categoryCode, extraPages, optionCodes) {
  var cat = ASBA.CATEGORIES.find(function (c) { return c.code === categoryCode; });
  if (!cat) return null;
  extraPages = Math.max(0, parseInt(extraPages || 0, 10));
  var total = cat.basePrice;
  var lines = [{ label: cat.name + " 기본 (" + cat.defaultPages + "페이지 구성)", amount: cat.basePrice }];
  if (extraPages > 0) {
    var add = extraPages * cat.perPagePrice;
    total += add;
    lines.push({ label: cat.pagesLabel + " × " + extraPages, amount: add });
  }
  (optionCodes || []).forEach(function (code) {
    var opt = ASBA.OPTIONS.find(function (o) { return o.code === code; });
    if (opt) { total += opt.price; lines.push({ label: opt.name, amount: opt.price }); }
  });
  return { lines: lines, total: total };
};

ASBA.formatKRW = function (n) { return n.toLocaleString("ko-KR") + "원"; };

/* 의뢰 접수 API 주소 — 통합 서버 배포 후 실제 주소로 교체하세요.
 * 예: https://api.asba.example.com */
ASBA.API_BASE = ""; // 같은 도메인(Functions 프록시) 또는 "https://your-server.example.com"
