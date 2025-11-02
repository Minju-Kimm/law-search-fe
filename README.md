# 🎨 민법 조문 검색 서비스

완전히 새롭고 훨씬 더 예쁜 디자인의 민법 조문 검색 웹 애플리케이션입니다!

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

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속!

### 3. API 서버 설정

`app/page.tsx` 파일의 7번째 줄에서 백엔드 API 주소를 설정하세요:

```typescript
const API_BASE_URL = 'http://localhost:8000';  // 실제 서버 주소
```

## 🎯 주요 기능

### 🔍 **실시간 검색**
- 타이핑하는 즉시 검색 (300ms 디바운싱)
- 입력할 때마다 자동으로 결과 업데이트
- 숫자/키워드 모두 지원

### 🎤 **음성 검색**
- 마이크 버튼 클릭으로 음성 입력
- 한국어 음성 인식
- Chrome/Edge 브라우저 권장

### 🔊 **조문 읽어주기**
- TTS로 조문 내용 음성 재생
- 각 카드의 스피커 아이콘 클릭
- 모달에서도 읽어주기 가능

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

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React

## 🎉 즐거운 검색되세요!

이제 훨씬 더 예쁘고 세련된 민법 조문 검색을 즐기세요! 🚀✨
