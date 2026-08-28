# ASBA 고객용 웹사이트 (정적)

Cloudflare Pages용 순수 정적 사이트입니다. 빌드 과정이 없습니다.

## 배포 방법
- Cloudflare Pages에서 프로젝트 생성 시 **Build command: (비움)**, **Output directory: `www`** 로 설정
- 또는 루트를 `www`로 지정해 직접 업로드(Direct Upload)해도 됩니다

## 구성
| 파일 | 설명 |
|---|---|
| `index.html` | 랜딩 페이지 — 서비스 소개, 진행 과정, 견적 계산기, FAQ |
| `request.html` | 제작 의뢰 폼 — GitHub 계정·카테고리·템플릿·상세 정보 입력 |
| `assets/css/style.css` | 공통 스타일 |
| `assets/js/data.js` | 카테고리/가격/옵션/폼 스키마 데이터 (두 페이지 공유) |
| `assets/js/landing.js` | 랜딩 견적 계산기 |
| `assets/js/request.js` | 의뢰 폼 동적 렌더링 + 접수 제출 |

## 서버 연결
- 가격·카테고리 수정은 `assets/js/data.js` 한 곳만 고치면 두 페이지 모두 반영됩니다.
- 접수 API 주소는 `assets/js/data.js`의 `ASBA.API_BASE`에 설정하세요 (통합 Node 서버의 `/api/intake`).
- 같은 도메인에서 프록시(Functions)를 쓸 경우 빈 문자열(`""`)로 두면 상대 경로로 호출합니다.

## 참고
- 결제(PayPal) 페이지와 진행 상태 확인은 통합 서버 및 후속 마일스톤(M5~)에서 추가 예정
- 남용 방지용 Turnstile 키 발급 시 `request.html`에 위젯 스니펫 추가 필요
