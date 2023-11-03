# 담채(DamChae) - 감정을 담아 채우는 공간

- 서비스명: 담채
- 팀명: 5팀
- ⚡ 기존 배포 주소(VM가상서버) : https://kdt-ai7-team05.elicecoding.com/
- ⚡ CI/CD 구현이 완료된 배포 DNS주소 (AWS EC2) : http://elice07-damchae01.duckdns.org/

## 로컬환경에서 실행

1. 깃을 클론한 후 LFS파일을 내려받습니다.
   ```
   $ git clone https://github.com/snghyun331/elice-damchae.git
   $ git lfs pull
   ```
2. front, back 실행에 필요한 라이브러리를 각각 설치합니다.
   ```
   $ cd back
   $ yarn
   ```
   ```
   $ cd front
   $ yarn
   ```
   ```
   $ cd ..
   $ yarn
   ```
3. root 폴더에서 프로젝트를 실행합니다.(front와 back을 동시에 실행)
   ```
    $ yarn dev
   ```

## 기술 스택

### FrontEnd

<div>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=TailwindCSS&logoColor=white"/>
<img src="https://img.shields.io/badge/Chart.Js-FF6384?style=flat-square&logo=Chart.Js&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/>
</div>

### BackEnd

<div>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/Flask-000000?style=flat-square&logo=flask&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/>
<img src="https://img.shields.io/badge/JWT-41454A?style=flat-square&logo=JSON%20web%20tokens&logoColor=white"/>
</div>

### AI

<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=Python&logoColor=white"/>

**사용한 데이터셋**

1. [AI Hub]한국어 단발성 대화 데이터셋

   - 행복, 슬픔, 분노, 놀람, 공포, 혐오, 중립
   - 38600건

2. [AI Hub] 감성 대화 말뭉치

   - 기쁨, 슬픔, 분노, 당황, 불안, 상처
   - training 51600건, validation 6600건

3. [AI Hub] 감정 분류를 위한 대화 음성 데이터셋
   - happiness, sadness, angry, surprise, fear, disgust, neutral
   - 44000여 건

## 담채란?

- 감정을 나누고 공유하는 감정일기 플랫폼과 MBTI기반 감정분석 커뮤니티
- 인공지능 모델을 통해 텍스트에서 감정을 추출하고 분류해서 보여준다
- 나의 감정을 살피고, 나와 다른 타인의 감정도 알아보고, 감정의 분류가 가능하졌으니 감정의 통계를 내 볼 수 있다

## 1. 프로젝트 기능 설명

1. 스토리 (감정 일기장)
   - AI가 나의 감정을 분석하고 무드에 맞는 음악을 추천
   - AI가 나의 하루를 그림으로 그려줄 수 있음
   - 내 일기장에서 느낀 감정을 통계로 확인 가능
2. 대나무숲 (MBTI 토론장)
   - AI가 댓글에서 감정을 분석하고, MBTI별로 느낀 다양한 감정을 통계로 확인 가능

## 2. 프로젝트 아키텍처

<img src="https://github.com/snghyun331/project-ReviewAnalysis/assets/108854903/dfabde44-cba4-4487-b45c-9136e389384d" height="75%" width="75%">

### 2-1. CI/CD Pipeline

<img src="https://github.com/snghyun331/imweb/assets/108854903/da71ce3c-840f-4db0-bf0c-b1e8a1ce075d" height="65%" width="65%">

## 3. 웹 서비스 페이지 구성 소개

### 1. Main Page

<img src="https://github.com/snghyun331/project-ReviewAnalysis/assets/108854903/1d07ed5c-e313-477a-be7d-d5632030a5a9">

### 2. Story Page

<img src="https://github.com/snghyun331/project-ReviewAnalysis/assets/108854903/e8981d7d-7a17-4bad-812d-b70034aebda3">

### 3. MBTI Page

<img src="https://github.com/snghyun331/project-ReviewAnalysis/assets/108854903/2f4eb8f6-316b-4cf3-9da7-dc75819abe13">

### 4. My Page

<img src="https://github.com/snghyun331/project-ReviewAnalysis/assets/108854903/ea9f454d-ef85-47b0-b577-49befb6f7f95">
<img src="https://github.com/snghyun331/project-ReviewAnalysis/assets/108854903/092e763a-9ca4-4964-9f55-1580cd2b92e3">

### 5. My Story Page

<img src="https://github.com/snghyun331/project-ReviewAnalysis/assets/108854903/09a04375-4d10-4894-be42-3317732cf0c3">
