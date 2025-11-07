# 🎨 법률 조문 검색 서비스 (민법 & 형법)

완전히 새롭고 훨씬 더 예쁜 디자인의 법률 조문 검색 및 북마크 웹 애플리케이션입니다!

## ✨ 새로운 디자인 특징

🌈 **그라데이션 배경** - 보라색, 핑크, 퓨샤 색상의 부드러운 그라데이션
🫧 **애니메이션 블롭** - 배경에서 움직이는 3개의 블롭 효과
💎 **글래스모피즘** - 투명하고 블러 처리된 유리 같은 UI
✨ **Framer Motion** - 부드럽고 세련된 애니메이션
🎭 **호버 효과** - 마우스를 올리면 살아나는 인터랙티브한 카드들
🌊 **물결 효과** - 입력 시 스케일이 변하는 검색창

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
cd civil-code-search
npm install
```

### 2. 환경변수 설정

`.env.local` 파일을 생성하고 백엔드 API 주소를 설정하세요:

```bash
# 개발 환경 (상대 경로)
NEXT_PUBLIC_API_BASE_URL=

# 프로덕션 환경 (절대 경로)
# NEXT_PUBLIC_API_BASE_URL=https://api.example.com
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
- **Primary**: Violet (보라색) `#8b5cf6`
- **Secondary**: Fuchsia (퓨샤) `#d946ef`
- **Accent**: Purple (보라) `#a855f7`

### 애니메이션
- **입장 효과**: Fade in + Scale
- **호버 효과**: Scale up + Shadow
- **로딩**: 3개의 바운싱 점
- **블롭**: 7초 주기의 유기적 움직임

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
