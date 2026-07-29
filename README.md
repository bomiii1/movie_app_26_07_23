# 🎬 Movie

## 📖 프로젝트 소개

TMDB API를 활용하여 다양한 영화 정보를 탐색할 수 있는 영화 정보 웹 애플리케이션입니다.

현재 상영작, 인기 영화, 장르별 추천 영화, 개봉 예정 영화 등 다양한 영화 정보를 제공하며, 영화 상세페이지에서는 줄거리, 예고편, 출연진, OTT 서비스 정보 등을 확인할 수 있습니다. 또한 배우 및 감독의 상세 정보를 제공하여 관련 작품까지 탐색할 수 있도록 구성하였습니다.

---

## ✨ 주요 기능

### 🏠 Home

- 인기 영화 TOP5 Hero Slider
- 현재 상영 중인 영화 조회
- 인기 영화 TOP10 랭킹 제공
- 장르별 평점 높은 영화 추천
- 개봉 예정 영화 조회

### 🎬 Movie Detail

- 영화 기본 정보 제공
  - 제목
  - 개봉일
  - 장르
  - 러닝타임
  - 평점
- 줄거리 제공
- 예고편 제공
- 배우 및 감독 정보 제공
- OTT 서비스 정보 제공
- 비슷한 영화 추천

### 👤 Person Detail

- 배우 및 감독 프로필
- 직업
- 소개(Biography)
- 출생 정보
- 대표 출연 및 참여 작품

### 🔍 Search

- 영화 제목 검색
- 검색 결과 제공
- 검색 결과가 없는 경우 안내 메시지 출력
- 영화 상세페이지 이동

---

## 📄 페이지 구성

- Home
- Movie Detail
- Person Detail
- Search

---

## 🛠 Tech Stack

- React
- Vite
- React Router DOM
- Tailwind CSS
- TMDB API

---

## 📡 API

### TMDB API

- Now Playing Movies
- Popular Movies
- Top Rated Movies
- Upcoming Movies
- Movie Details
- Movie Videos
- Movie Credits
- Similar Movies
- Search Movies
- Person Details
- Person Movie Credits
- Watch Providers

---

## 📌 프로젝트 특징

- TMDB API를 활용한 실시간 영화 정보 제공
- 인기 영화 TOP10 랭킹 UI 구현
- 배우 및 감독 상세 정보 제공
- 영화 예고편 및 OTT 서비스 정보 제공
- 비슷한 영화를 추천하여 연관 콘텐츠 탐색 가능
- 반응형 UI를 적용하여 다양한 기기에서 이용 가능

# 🎬 Movie

> TMDB API를 활용한 영화 정보 탐색 웹 애플리케이션

🔗 **Demo** : https://배포주소  
📄 **GitHub** : https://github.com/아이디/레포이름

## 📷 Preview

| Home            | Movie Detail    |
| --------------- | --------------- |
| ![](이미지주소) | ![](이미지주소) |

## 📅 개발 일정 (4~5시간/일)

### ✅ 7/27 (월) - 프로젝트 초기 세팅

- [x] Vite 프로젝트 생성
- [x] Tailwind CSS 설치
- [x] React Router 설치
- [x] 기본 폴더 구조 생성
- [x] Router 연결
- [x] Home / Movie / Profile / Search / ErrorPage 생성
- [x] Header / Footer 생성
- [x] 라우터 정상 동작 확인
- [x] Header UI 제작
- [x] Footer UI 제작

---

### 📅 7/28 (화) - 공통 레이아웃

- [x] Header 메뉴(Link) 연결
- [x] Footer 마무리
- [ ] 공통 Layout 정리
- [ ] 공통 버튼 스타일
- [ ] 공통 Container 작성

---

### 📅 7/29 (수) - TMDB API 연결

- [ ] TMDB API KEY 발급
- [ ] .env 설정
- [ ] api/movieApi.js 작성
- [ ] API 함수 작성
- [ ] 인기 영화 데이터 출력 테스트

---

### 📅 7/30 (목) - Home 상단

- [ ] Hero Section
- [ ] Swiper 적용
- [ ] 인기 영화 배경
- [ ] Hero 버튼

---

### 📅 7/31 (금) - Home 본문

- [ ] Now Playing
- [ ] Top 10
- [ ] Movie Card 컴포넌트
- [ ] 랭킹 숫자 디자인

---

### 📅 8/3 (월) - Home 완성

- [ ] Genre Section
- [ ] Upcoming Section
- [ ] Home 전체 스타일 수정

---

### 📅 8/4 (화) - Movie 상세페이지

- [ ] 영화 정보
- [ ] 예고편
- [ ] Similar Movies
- [ ] 상세페이지 UI

---

### 📅 8/5 (수) - Profile & Search

- [ ] Profile(인물) 페이지
- [ ] 배우 정보
- [ ] 출연 작품
- [ ] Search 페이지
- [ ] 검색 결과 UI

---

### 📅 8/6 (목) - 마무리

- [ ] 전체 UI 수정
- [ ] 반응형 수정
- [ ] 코드 정리
- [ ] GitHub Push
- [ ] README 정리
