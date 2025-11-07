# ⚖️ LexSearch - 가장 빠른 법률검색

Notion/Linear 감성의 미니멀하고 고급스러운 법률 조문 검색 및 북마크 웹 애플리케이션입니다!

## ✨ 디자인 특징

🎨 **Notion/Linear 스타일** - 미니멀하고 고급스러운 디자인
🌙 **다크 모드** - #0B1220~#0F172A 배경의 세련된 다크 테마
📐 **8px 스케일** - 일관된 글자크기/라인하이트/여백 시스템
🎯 **14px 라운드** - 부드러운 모서리 처리
✨ **Framer Motion** - 페이지 전환, 페이드, 슬라이드 애니메이션
🎨 **법률별 색상** - 민법(녹색), 형법(보라), 민사소송법(주황), 형사소송법(빨강)
🍞 **토스트 알림** - 생성/삭제 피드백
♿ **접근성** - 키보드 포커스 링, aria-label 완벽 지원

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
cd civil-code-search
npm install
```

### 2. 환경변수 설정

`.env.example` 파일을 복사해서 `.env.local`을 생성하세요:

```bash
cp .env.example .env.local
```

**로컬 개발 환경 설정**:
```bash
# 로컬 백엔드 서버 주소 (Next.js rewrite 적용)
API_REWRITE_TARGET=http://localhost:8000

# API Base URL - 비워두기 (상대 경로 사용)
NEXT_PUBLIC_API_BASE_URL=
```

**프로덕션 환경 (Vercel) 설정**:
```bash
# Vercel 환경 변수에 다음을 설정하세요:
# NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com
# (API_REWRITE_TARGET는 설정하지 않음)
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속!

## 🎯 주요 기능

### 🔍 **법률 검색**
- 민법, 형법, 민사소송법, 형사소송법 검색
- 조문 번호 또는 키워드로 검색 가능
- 실시간 검색 결과 표시

### 🎤 **음성 검색**
- 마이크 버튼 클릭으로 음성 입력
- 한국어 음성 인식
- Chrome/Edge 브라우저 권장

### 🔊 **조문 읽어주기**
- TTS로 조문 내용 음성 재생
- 각 카드의 스피커 아이콘 클릭
- 모달에서도 읽어주기 가능

### 🔖 **북마크 기능**
- 소셜 로그인 (구글, 네이버)
- 조문 북마크 추가/삭제
- 낙관적 업데이트 & 롤백 처리
- HttpOnly 쿠키 기반 인증

### 👤 **사용자 관리**
- 프로필 페이지
- 북마크 목록 관리
- 세션 자동 확인

### 📱 **완벽한 반응형**
- 모바일, 태블릿, 데스크톱 최적화
- 터치 제스처 지원

## 🎨 디자인 시스템

### 색상 팔레트

#### 배경 (다크모드)
- **Primary**: `#0B1220` - 메인 배경
- **Secondary**: `#0F172A` - 서브 배경
- **Tertiary**: `#1E293B` - 엘리베이티드 배경
- **Elevated**: `#1E293B` - 카드, 모달 배경

#### 전경 (슬레이트 계열)
- **Primary**: `#F8FAFC` - 메인 텍스트
- **Secondary**: `#CBD5E1` - 보조 텍스트
- **Tertiary**: `#94A3B8` - 비활성 텍스트
- **Quaternary**: `#64748B` - 비활성 텍스트

#### 포인트 색상
- **Indigo**: `#4F46E5` - 주요 액션 버튼
- **Emerald**: `#10B981` - 성공, 민법

#### 법률별 색상
| 법률 | Primary | Background | Border | Text |
|------|---------|------------|--------|------|
| **민법** | `#10B981` | `rgba(16, 185, 129, 0.1)` | `rgba(16, 185, 129, 0.2)` | `#10B981` |
| **형법** | `#8B5CF6` | `rgba(139, 92, 246, 0.1)` | `rgba(139, 92, 246, 0.2)` | `#8B5CF6` |
| **민사소송법** | `#F59E0B` | `rgba(245, 158, 11, 0.1)` | `rgba(245, 158, 11, 0.2)` | `#F59E0B` |
| **형사소송법** | `#EF4444` | `rgba(239, 68, 68, 0.1)` | `rgba(239, 68, 68, 0.2)` | `#EF4444` |

#### 시맨틱 색상
- **Success**: `#10B981`
- **Error**: `#EF4444`
- **Warning**: `#F59E0B`
- **Info**: `#3B82F6`

### 타이포그래피

#### 폰트
- **기본**: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

#### 폰트 크기 (8px 스케일)
- **xs**: `12px` - 작은 라벨
- **sm**: `14px` - 본문 작게
- **base**: `16px` - 본문
- **lg**: `18px` - 본문 크게
- **xl**: `24px` - H3
- **2xl**: `32px` - H2
- **3xl**: `40px` - H1

#### 라인 하이트
- **tight**: `1.2`
- **normal**: `1.5`
- **relaxed**: `1.75`

#### 폰트 굵기
- **normal**: `400`
- **medium**: `500`
- **semibold**: `600`
- **bold**: `700`

### 간격 (8px 스케일)
- **0**: `0`
- **1**: `8px`
- **2**: `16px`
- **3**: `24px`
- **4**: `32px`
- **5**: `40px`
- **6**: `48px`
- **7**: `56px`
- **8**: `64px`
- **9**: `72px`
- **10**: `80px`

### 라운드
- **sm**: `8px`
- **md**: `14px` (기본)
- **lg**: `16px`
- **xl**: `24px`
- **full**: `9999px`

### 섀도우
- **sm**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **md**: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- **lg**: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
- **xl**: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`

### 애니메이션 (Framer Motion)

#### 페이드 인
```typescript
{
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
}
```

#### 슬라이드 업
```typescript
{
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
}
```

#### 스케일
```typescript
{
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2 }
}
```

#### 호버 효과
- **버튼**: `whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}`
- **카드**: `whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}`

### 반응형 레이아웃

#### 브레이크포인트
- **Mobile**: `< 640px` - 1열
- **Tablet**: `640px ~ 1024px` - 2열
- **Desktop**: `>= 1024px` - 3열

#### 그리드 시스템
```css
/* 모바일 */
.grid { grid-template-columns: 1fr; }

/* 태블릿 */
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* 데스크탑 */
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

### 사용 규칙

#### 1. 색상 사용
- 배경은 항상 `colors.bg.*` 사용
- 텍스트는 항상 `colors.fg.*` 사용
- 법률별 색상은 `getLawColor(lawCode)` 헬퍼 함수 사용
- 포인트 색상은 주요 액션에만 사용

#### 2. 간격 사용
- 컴포넌트 내부 간격: `spacing[1]` ~ `spacing[3]`
- 컴포넌트 간 간격: `spacing[3]` ~ `spacing[6]`
- 섹션 간 간격: `spacing[6]` ~ `spacing[10]`

#### 3. 타이포그래피 사용
- 제목: `xl` ~ `3xl`, `font-bold`
- 본문: `base` ~ `lg`, `font-normal`
- 라벨/캡션: `xs` ~ `sm`, `font-medium`

#### 4. 애니메이션 사용
- 페이지 전환: `fadeIn` or `slideUp`
- 리스트 아이템: `slideUp` with staggered delay
- 모달: `scale`
- 버튼/카드 호버: `whileHover` / `whileTap`

#### 5. 접근성
- 모든 버튼에 `aria-label` 추가
- 인터랙티브 요소에 키보드 포커스 링 표시
- 색상 대비는 WCAG AA 기준 준수
- `prefers-color-scheme` 지원

### 컴포넌트 예시

#### 버튼
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-6 py-3 rounded-lg font-medium text-white"
  style={{ background: colors.accent.indigo }}
  aria-label="검색"
>
  검색
</motion.button>
```

#### 카드
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.01 }}
  className="rounded-lg p-6"
  style={{
    background: colors.bg.elevated,
    border: `1px solid ${lawColor.border}`,
  }}
>
  {/* 카드 내용 */}
</motion.div>
```

## 📦 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library
- **Authentication**: HttpOnly Cookie (OAuth)

## 🧪 테스트

```bash
# 테스트 실행
npm test

# Watch 모드
npm run test:watch
```

## 🔑 인증 흐름

1. 사용자가 로그인 버튼 클릭
2. 백엔드 `/api/auth/login/{provider}` 로 리다이렉트
3. OAuth 콜백 처리 후 HttpOnly 쿠키 발급
4. 프론트엔드는 `/api/users/me`로 세션 확인
5. 401 응답 시 자동으로 로그인 페이지로 이동

## 📁 프로젝트 구조

```
├── app/
│   ├── bookmarks/      # 북마크 페이지
│   ├── login/          # 로그인 페이지
│   ├── me/             # 마이페이지
│   └── page.tsx        # 홈 (검색)
├── components/         # 재사용 컴포넌트
├── lib/
│   ├── api.ts          # API 클라이언트
│   ├── contexts/       # React 컨텍스트
│   ├── hooks/          # 커스텀 훅
│   └── __tests__/      # 단위 테스트
└── public/             # 정적 파일
```

## 🎉 즐거운 검색되세요!

이제 훨씬 더 예쁘고 세련된 법률 조문 검색과 북마크를 즐기세요! 🚀✨
