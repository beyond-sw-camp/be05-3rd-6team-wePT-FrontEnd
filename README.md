# 🏡Team : wePT

<div align="center"><img src="https://github.com/OrangeVinyl/community/assets/155809042/4782d336-dae7-464b-9f9c-c39572ffe349.png" width="500" height="600"></div>

<div align='center'>
'우리(we)'라는 단어 + 아파트를 나타내는 약어인 'APT'의 합성어이자,

궁금한 모든 걸 알려주는 chatGPT와 같이, wePT를 사용한다면 아파트에 관한 모든 궁금증을 해결할 수 있다는 의미를 담았습니다.
</div>
<br/> 

## 🎈 프로젝트 소개

1. 목적 : 기 개발된 wePT Application의 일부 기능들을 front에서 구현
2. 구현 기능 : <br/>
   2 - 1) 회원 가입,이메일 인증 <br/>
   2 - 2) 로그인, 비밀번호 찾기 <br/>
   2 - 3) 매칭 생성, 수정, 삭제 <br/>
   2 - 4) 생성/참여한 매칭 정보 확인 <br/>
3. 개발환경 : vue.js / javascript
   <br/> <br/>

## 🚀 구현 서비스

1) 회원가입 및 이메일 인증 기능
2) 로그인 및 비밀번호 찾기 기능
3) 매칭 생성,수정,삭제 기능
4) 마이페이지 기능(내가 만든,참여한 매칭 정보 확인)

### ✅ 회원가입

- 이메일 인증과 비밀번호 설정, 닉네임 입력 필요.
    - 이메일 인증 : firebase의 이메일 인증 기능 활용함. firebase에서 송부되는 메일 내 링크를 클릭하면 인증 완료됨

### ✅ 로그인

- 회원가입 완료된 이메일과 비밀번호 입력 필요
    - 비밀번호 찾기 : 이메일로 비밀번호 재설정 링크 송부받아 새로운 비밀번호 설정

### ✅ 매칭 서비스 기능

- 배달, 공동구매, 스터디 등 인원을 모집할 사용자와 모집에 지원할 사용자들을 이어주는 기능
    - 매칭생성 : 매칭을 생성하여 인원을 모집할 수 있음
    - 매칭수정 : 제목, 카테고리, 매칭마감날짜, 모집인원 등의 내용을 수정할 수 있음
    - 매칭삭제 : 매칭수정 페이지에서 해당 매칭 삭제 가능

### ✅ 마이페이지 기능

- 내가 생성한 매칭 참여한 매칭의 정보를 확인 가능
    - 내가 생성한 매칭 : 카테고리, 모집 중 여부, 참여인원, 인원제한, 생성일시, 수정일시
    - 내가 참여한 매칭 : 카테고리, 모집 중 여부, 참여인원, 인원제한, 참여 여부

<br/>

## 🎁 화면설계서 & 스토리보드


[화면설계서&스토리보드 (figma) 바로가기 >](https://www.figma.com/file/rhvePbbEdi8seHKtJbrdF7/Figma-for-PPT?type=design&node-id=0%3A1&mode=design&t=MwGBstnq9lftkVQZ-1)

## 🎨 테스트 영상


#### 1. 회원가입 성공
https://github.com/beyond-sw-camp/be05-3rd-6team-wePT-FrontEnd/assets/155698895/330c340e-5716-4883-b5e4-909aa50b3e81

#### 2. 회원가입 실패-이메일 형식이 안맞음
https://github.com/beyond-sw-camp/be05-3rd-6team-wePT-FrontEnd/assets/155698895/9aa376e7-d46d-4ecb-8d9e-99b6f984c091

#### 3. 회원가입 실패-비밀번호 불일치
https://github.com/beyond-sw-camp/be05-3rd-6team-wePT-FrontEnd/assets/155698895/91124a03-d0dc-4adf-9a9b-ae7be4311455

#### 4. 회원가입 실패-닉네임 누락
https://github.com/beyond-sw-camp/be05-3rd-6team-wePT-FrontEnd/assets/155698895/95cee892-7376-4e7c-9401-75ef728a887c

#### 5. 로그인 실패-틀린 ID
https://github.com/beyond-sw-camp/be05-3rd-6team-wePT-FrontEnd/assets/155698895/f2e71b19-b1a8-4c79-b946-5b260438dbd7

#### 6. 로그인 실패-틀린 PW
https://github.com/beyond-sw-camp/be05-3rd-6team-wePT-FrontEnd/assets/155698895/9d3fba2f-9474-4327-8098-514bff5d92c0

#### 7. ID 찾기
https://github.com/beyond-sw-camp/be05-3rd-6team-wePT-FrontEnd/assets/155698895/2154d8ae-da80-46be-b396-3daaa512638c

#### 8. PW 찾기
https://github.com/beyond-sw-camp/be05-3rd-6team-wePT-FrontEnd/assets/155698895/8459badd-5b48-40ee-926b-813dc3c72ee8

#### 14. 마이페이지 - 참여한,생성한 매칭 목록 확인
https://github.com/beyond-sw-camp/be05-3rd-6team-wePT-FrontEnd/assets/155698895/054d3bdf-afec-4659-8741-c1d13b4764c8





## 🛠️ 개발 환경

* Version : Vue@3.4.21
* IDE : IntelliJ || VSCode

- CORE  : Vue.js / Javascript
- CSS: Bootstrapvue
- STATE : Pinia
- BACK-END: firebase
- BUNDLER: vite
- FOMATTER : prettier , eslint

<br/>
<img src="https://github.com/OrangeVinyl/wePT-front/assets/105047091/f70eaa0c-33cf-42cf-abb3-318ad8a3d8f2).png">

<br/>

## 📦 디렉토리 구조

```
📦wePT-front
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂image
 ┃ ┃ ┣ 📂layout
 ┃ ┃ ┣ 📂matching
 ┃ ┃ ┗ 📂modal
 ┃ ┣ 📂firebase
 ┃ ┣ 📂layouts
 ┃ ┣ 📂lib
 ┃ ┣ 📂provider
 ┃ ┣ 📂router
 ┃ ┣ 📂stores
 ┃ ┣ 📂views
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┣ 📂matching
 ┃ ┃ ┣ 📂myPage
 ┃ ┃ ┗ 📜Intro.vue
 ┃ ┣ 📜App.vue
 ┃ ┗ 📜main.js
 ┣ 📜.env
 ┣ 📜.eslintrc.cjs
 ┣ 📜.gitignore
 ┣ 📜.nvmrc
 ┣ 📜.prettierrc.json
 ┣ 📜db.json
 ┣ 📜index.html
 ┣ 📜jsconfig.json
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜readme.md
 ┗ 📜vite.config.js
 ```

<br/>

## ⚙️SET UP

### Firebase Console API

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### Project Setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

### Node Version

```
nvm use
```


yeeun test 지우기ㄹㄹㄹ
