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
    templates: ["t-landing-bold", "t-landing-minimal", "t-landing-gradient", "dl-play-bootstrap", "dl-enno", "dl-Active", "dl-Bliss", "dl-FlexStart", "dl-OnePage", "dl-iLanding", "dl-HeroBiz", "dl-AppVila", "dl-NexusAI", "dl-SaaSintro", "dl-Impact", "SB-OnePage", "SB-NewAge", "SB-ComingSoon", "SB-Scrolling Nav", "SB-Heroic Features", "SB-Landing", "SB-Grayscale", "SB-StylishPortfolio"]
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
    templates: ["t-folio-grid", "t-folio-editorial", "dl-meyawo", "dl-Flat", "dl-Poseify", "dl-Kelly", "dl-iPortfolio", "dl-PhotoFolio", "SB-Freelancer", "SB-Resume", "ThemeWagon-Brivon", "SB-Creative2"]
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
    templates: ["t-biz-classic", "t-biz-modern", "dl-arsha", "dl-Company", "dl-Gp", "dl-Sarab", "dl-Business", "dl-Salone", "dl-BizLand", "dl-Impact", "SB-Agency", "SB-ModernBusiness", "SB-SmallBusiness"]
  },
  {
    code: "saas",
    name: "SAAS / 스타트업",
    desc: "SaaS 서비스, 구독 플랜, 데모 신청에 최적화",
    basePrice: 350000,
    perPagePrice: 90000,
    defaultPages: 4,
    pagesLabel: "추가 페이지",
    icon: "💻",
    templates: ["dl-landmark", "dl-nexora", "dl-FlexStart", "dl-NexusAI", "dl-SaaSintro"]
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
    templates: ["t-shop-clean", "t-shop-vivid", "dl-organic", "dl-Plasery", "dl-Kaira", "dl-Furnish", "SB-Shop Homepage"]
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
    templates: ["t-blog-serif", "t-blog-magazine", "dl-ZenBlog", "dl-Sailor", "dl-Blogy", "SB-Clean", "SB-Blog-Clean", "SB-Blog-Home"]
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
    templates: ["t-resto-warm", "t-resto-dark", "dl-feane", "dl-Tiya", "dl-Restaurantly", "dl-Dewi", "dl-Hilux", "ThemeWagon-SpiceHaven"]
  },
  {
    code: "medical",
    name: "의료 / 병원",
    desc: "의료 서비스, 진료 안내, 예약에 최적화",
    basePrice: 350000,
    perPagePrice: 90000,
    defaultPages: 5,
    pagesLabel: "추가 페이지",
    icon: "🏥",
    templates: ["dl-MediLab", "dl-Medinova", "dl-Clinic", "dl-Mentor", "ThemeWagon-PrimeDental"]
  },
  {
    code: "agency",
    name: "에이전시 / 크리에이티브",
    desc: "에이전시 서비스와 포트폴리오 소개",
    basePrice: 300000,
    perPagePrice: 80000,
    defaultPages: 4,
    pagesLabel: "추가 페이지",
    icon: "🎨",
    templates: ["dl-Agency", "dl-Presento", "dl-Selecao", "dl-KnightOne", "dl-Poseify", "dl-Flat", "SB-Agency", "SB-Creative2"]
  },
  {
    code: "education",
    name: "교육 / 학원",
    desc: "교육 서비스, 강의 안내, 수강 신청에 최적화",
    basePrice: 300000,
    perPagePrice: 80000,
    defaultPages: 4,
    pagesLabel: "추가 페이지",
    icon: "📚",
    templates: ["dl-Purdue", "dl-Mentor"]
  },
  {
    code: "realestate",
    name: "부동산",
    desc: "부동산 매물 안내, 중개 서비스에 최적화",
    basePrice: 350000,
    perPagePrice: 90000,
    defaultPages: 5,
    pagesLabel: "추가 페이지",
    icon: "🏠",
    templates: ["dl-Hilux", "dl-BizLand", "ThemeWagon-TraveLand"]
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
  "t-resto-dark":       { name: "Dark Resto",     tone: "세련된 다크 톤" },
  /* 다운로드한 실제 템플릿 (서버에서 제공) */
  "dl-play-bootstrap":  { name: "Play Bootstrap",  tone: "SaaS/스타트업 랜딩 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-enno":            { name: "eNno",            tone: "비즈니스 원페이지 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-landmark":        { name: "Landmark",        tone: "SAAS 랜딩 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-organic":         { name: "Organic",         tone: "이커머스 식료품 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-ZenBlog":         { name: "ZenBlog",         tone: "블로그 · 매거진 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-meyawo":          { name: "Meyawo",          tone: "포트폴리오 원페이지 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "dl-feane":           { name: "Feane",           tone: "식당 · 카페 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "dl-arsha":           { name: "Arsha",           tone: "기업 · 비즈니스 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-nexora":          { name: "Nexora",          tone: "SAAS 스타트업 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Active":          { name: "Active",          tone: "비즈니스·기업 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Bliss":           { name: "Bliss",           tone: "포트폴리오·창작 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Chefer":          { name: "Chefer",          tone: "레스토랑·카페 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Company":         { name: "Company",         tone: "기업·비즈니스 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-FlexStart":       { name: "FlexStart",       tone: "스타트업·SAAS (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Gp":              { name: "Gp",              tone: "기업·서비스 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Sarab":           { name: "Sarab",           tone: "기업·포트폴리오 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Kelly":           { name: "Kelly",           tone: "포트폴리오 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Weldork":         { name: "Weldork",         tone: "포트폴리오·창작 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Plasery":         { name: "Plasery",         tone: "이커머스·쇼핑 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Sailor":          { name: "Sailor",          tone: "블로그·미디어 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Tiya":            { name: "Tiya",            tone: "레스토랑·카페 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-MediLab":         { name: "MediLab",         tone: "의료·병원 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Medinova":        { name: "Medinova",        tone: "의료·병원 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Clinic":          { name: "Clinic",          tone: "의료·클리닉 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Agency":          { name: "Agency",          tone: "에이전시·크리에이티브 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Presento":        { name: "Presento",        tone: "에이전시·서비스 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Selecao":         { name: "Selecao",         tone: "포트폴리오·창작 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-KnightOne":       { name: "KnightOne",       tone: "포트폴리오·작가 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Poseify":         { name: "Poseify",         tone: "포트폴리오·작가 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Flat":            { name: "Flat",            tone: "포트폴리오·minimal (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-furni":           { name: "Furni",           tone: "가구·쇼핑 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Studiova":        { name: "Studiova",        tone: "스튜디오·에이전시 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-iPortfolio":      { name: "iPortfolio",      tone: "포트폴리오 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Dewi":            { name: "Dewi",            tone: "레스토랑·카페 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-HeroBiz":         { name: "HeroBiz",         tone: "기업·비즈니스 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-iLanding":        { name: "iLanding",        tone: "랜딩·스타트업 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Mentor":          { name: "Mentor",          tone: "의료·교육 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-PhotoFolio":      { name: "PhotoFolio",      tone: "포트폴리오·사진 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Restaurantly":    { name: "Restaurantly",    tone: "레스토랑·카페 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-AppVila":         { name: "AppVila",         tone: "앱 랜딩·모바일 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-BizLand":         { name: "BizLand",         tone: "기업·비즈니스 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Blogy":           { name: "Blogy",           tone: "블로그·미디어 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Business":        { name: "Business",        tone: "기업·비즈니스 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Furnish":         { name: "Furnish",         tone: "가구·쇼핑 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Hilux":           { name: "Hilux",           tone: "부동산·매물 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Impact":          { name: "Impact",          tone: "기업·비즈니스 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Kaira":           { name: "Kaira",           tone: "이커머스·패션 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-NexusAI":         { name: "NexusAI",         tone: "SAAS·AI (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Purdue":          { name: "Purdue",          tone: "교육·학원 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-SaaSintro":       { name: "SaaSintro",       tone: "SAAS·런칭 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "dl-Salone":          { name: "Salone",          tone: "기업·비즈니스 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "SB-Agency":          { name: "SB Agency",       tone: "에이전시·포트폴리오 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "SB-Freelancer":      { name: "SB Freelancer",   tone: "프리랜서·포트폴리오 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "SB-Resume":          { name: "SB Resume",       tone: "이력서·포트폴리오 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "SB-OnePage":         { name: "SB OnePage",      tone: "원페이지·랜딩 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "SB-NewAge":          { name: "SB NewAge",       tone: "앱 랜딩·모바일 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "SB-ComingSoon":      { name: "SB ComingSoon",   tone: "런칭·대기 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "SB-Clean":           { name: "SB Clean",        tone: "블로그·미디어 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "SB-Shop Homepage":   { name: "SB Shop",        tone: "쇼핑몰·이커머스 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "SB-Scrolling Nav":   { name: "SB Scrolling",   tone: "스크롤링·랜딩 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "SB-Heroic Features": { name: "SB Heroic",      tone: "히어로·랜딩 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "Creative-Tim-Argon": { name: "Argon Design",   tone: "대시보드·UIKIT (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "Creative-Tim-Now-ui":{ name: "Now UI Kit",     tone: "UIKIT·컴포넌트 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "Creative-Tim-Paper": { name: "Paper Dashboard",tone: "대시보드·관리자 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "Creative-Tim-LightBootstrap": { name: "Light Bootstrap", tone: "대시보드·경량 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "ThemeWagon-Brivon":  { name: "Brivon",         tone: "사진·포트폴리오 (HTML5)", source: "downloaded", framework: "html5" },
  "ThemeWagon-PrimeDental": { name: "PrimeDental", tone: "의료·치과 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "ThemeWagon-SpiceHaven": { name: "SpiceHaven",  tone: "레스토랑·카페 (HTML5)", source: "downloaded", framework: "html5" },
  "ThemeWagon-TraveLand": { name: "TraveLand",    tone: "여행·관광 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "ThemeWagon-SparkAdmin": { name: "Spark Admin",  tone: "대시보드·관리자 (Bootstrap 5)", source: "downloaded", framework: "bootstrap-5" },
  "SB-Blog-Clean": { name: "Blog Clean", tone: "블로그·포스트 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "SB-Blog-Home": { name: "Blog Home", tone: "블로그·홈 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "SB-Creative2": { name: "Creative 2", tone: "크리에이티브·에이전시 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "SB-FullWidthPics": { name: "Full Width Pics", tone: "풀 WIDTH 이미지·랜딩 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "SB-Grayscale": { name: "Grayscale", tone: "그레이스케일·랜딩 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "SB-Landing": { name: "Landing", tone: "랜딩·원페이지 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "SB-ModernBusiness": { name: "Modern Business", tone: "기업·비즈니스 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "SB-SmallBusiness": { name: "Small Business", tone: "소기업·비즈니스 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
  "SB-StylishPortfolio": { name: "Stylish Portfolio", tone: "포트폴리오·스타일리시 (Bootstrap 4)", source: "downloaded", framework: "bootstrap-4" },
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
  saas: [
    { key: "product",        label: "서비스/제품명", type: "text", required: true },
    { key: "features",       label: "주요 기능 3가지", type: "textarea", required: true, placeholder: "기능당 한 줄씩" },
    { key: "pricing",        label: "가격 플랜 (선택)", type: "textarea", placeholder: "플랜명 - 가격 형식" },
    { key: "demo_url",       label: "데모 URL (선택)", type: "url" }
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

/* 서버에서 다운로드 템플릿 정보 가져오기 */
ASBA.fetchServerTemplates = function () {
  return fetch((ASBA.API_BASE || "") + "/api/templates")
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (data.ok && data.templates) {
        data.templates.forEach(function (t) {
          var id = "dl-" + t.id;
          ASBA.TEMPLATES[id] = {
            name: t.name,
            tone: t.description || "",
            source: "downloaded",
            framework: t.framework,
            previewUrl: t.previewUrl || "",
            sourceUrl: t.sourceUrl || "",
            thumbnailUrl: t.thumbnailUrl || ""
          };
        });
        // 카테고리별로 다운로드 템플릿 추가
        if (data.categories) {
          ASBA.CATEGORIES.forEach(function (cat) {
            var downloaded = (data.categories[cat.code] || []);
            downloaded.forEach(function (tid) {
              var refId = "dl-" + tid;
              if (ASBA.TEMPLATES[refId] && cat.templates.indexOf(refId) === -1) {
                cat.templates.push(refId);
              }
            });
          });
        }
      }
      return data;
    })
    .catch(function () { return { ok: false }; });
};

/* 의뢰 접수 API 주소 — 통합 서버 배포 후 실제 주소로 교체하세요.
 * 예: https://api.asba.example.com */
ASBA.API_BASE = ""; // 같은 도메인(Functions 프록시) 또는 "https://your-server.example.com"
