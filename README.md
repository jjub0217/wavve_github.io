# 웨이브 웹 사이트 리뉴얼

<img alt="logo" src="https://github.com/user-attachments/assets/3f661a29-265d-498c-9518-03f9b2c9cce8" width=80>

----
이 프로젝트는 안다르의 모바일 웹 사이트 클론코딩 한 페이지입니다. <br>
2024.08.24 ~ 2024.08.29 / 2024.09.30 일주일간 페이지를 제작, 수정 및 배포하였습니다.<br>


## 프로젝트 기능
1. 반응형 웹 페이지.(쿠폰 페이지)
2. 헤더의 로고를 클릭하면 메인페이지로 이동
3. 셀렉트박스 리스트 항목중 한 항목을 클릭하면 클릭한 값으로 변경
4. 더보기를 클릭하면 숨겨져있던 항목이 나온다.
5. 슬라이드 기능
6. 탭메뉴 기능
7. 첫번째로 보여지는 아이템을 클릭하면 LIVE 상세 페이지로 이동(라이브 페이지)
8. 쿠폰아이콘을 클릭하면 쿠폰 페이지로 이동
9.  input에 값이 넣기 시작하면 "쿠폰등록" 버튼의 컬러가 변경됩니다.(쿠폰 페이지)


## 프로젝트 웹표준(W3C의 Markup Validation Service)
결과 : 0개 <br>
[1] 메인 페이지
<img src="https://github.com/user-attachments/assets/52a9aa5a-aa3e-4db6-ab45-6fbbe6eb0458" width=800>
[2] live 페이지
<img src="https://github.com/user-attachments/assets/9239f747-737d-45be-9bf3-05d4dd410d37" width=800>
[3] live 상세 페이지
<img src="https://github.com/user-attachments/assets/d670e3bc-5d3e-4b70-b0ec-a004fc513fba" width=800>
[4] 쿠폰 페이지
<img src="https://github.com/user-attachments/assets/a6a966cf-7f2a-4296-9e20-56df9e762266" width=800>

## 프로젝트 웹접근성
- chrome Lighthouse 결과 :<br>
모바일 디바이스의 접근성 표준을 준수하였는지 로컬에서 검사할수 있는 goole 의 lighthouse 로 검사하면 개선할점이 Accessibility  항목과 Best Practices 항목에서 나타납니다.  <br>
[1] 메인페이지 : 데스크탑
<img src="https://github.com/user-attachments/assets/cb6fb503-8b91-49e6-82ba-73593d3fea9d" width=800> <br>
[2] live 페이지 
<img src="https://github.com/user-attachments/assets/36d07c87-314a-4118-b86d-89bb5f908fb7" width=800> <br>
[3] live 상세 페이지 
<img src="https://github.com/user-attachments/assets/9167beaa-25df-4b8c-b925-7ffbb78b0e50" width=800> <br>
[4] 쿠폰페이지 : 데스크탑
<img src="https://github.com/user-attachments/assets/cb6fb503-8b91-49e6-82ba-73593d3fea9d" width=800> <br>
[5] 쿠폰페이지 : 모바일
<img src="https://github.com/user-attachments/assets/97e5e7e0-f0d1-4bf8-b648-db15a0ac6058" width=800> <br>


- Open-WAX 결과 : error 0<br>
<img src="https://github.com/user-attachments/assets/c7815243-339d-4472-b5a9-81d56c4ceb9d" width=270> <br>
- WAVE 결과: error 0<br>
<img src="https://github.com/user-attachments/assets/e7d8efca-c2c1-47b2-9e31-dd18917844e7" width=800>

## 모바일 디바이스 검수
- 안드로이드 Note20 울트라
<video src="https://github.com/user-attachments/assets/8a274963-b3c2-49dc-a3a1-8656ff3f1f2c" autoplay muted playsinline loop></video>
- 아이폰 SE2 
<video src="https://github.com/user-attachments/assets/85fec815-d8ac-4e7d-9a60-f5c201fd392b" autoplay muted playsinline loop></video>
- 아이패드 6
<video src="https://github.com/user-attachments/assets/d41a19b2-8afb-4037-955c-675fb2f17a19" autoplay muted playsinline loop></video>


## 기술 스택
![HTML5](https://img.shields.io/badge/HTML5-FE642E?style=flat-square&logo=HTML5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-2E9AFE?style=flat-square&logo=CSS3&logoColor=white)
![SASS](https://img.shields.io/badge/Sass-cc6699?style=flat-square&logo=sass&logoColor=white)
![Javascript](https://img.shields.io/badge/Javascript-gray?style=flat-square&logo=Javascript&logoColor=f7df1e)
![React](https://img.shields.io/badge/React-gray?style=flat-square&logo=React&logoColor=00dcff)
![Swiper](https://img.shields.io/badge/Swiper-gray?style=flat-square&logo=Swiper&logoColor=0080FF)


## 포함된 자바스크립트 라이브러리
| Name      | License                          | Copyright                                 |
| --------- | -------------------------------- | ----------------------------------------- |
| Swiper.js | MIT License                      | 2019 Vladimir Kharlampidi                 |
| React.js  | MIT License                      | Facebook, Inc. and its affiliates         |


## 개선점
- 웹접근성을 더욱 지키기 위해 텍스트와 배경간의 명도 대비, 고대비 점수를 높이기
- 리뷰 를 누르면 뜨는 리뷰모달까지 만들기(시간이 없어서 만들지 못함)
- 웹접근성을 더욱 지키기 위해 aria 를 더 사용해보기


## 연락처
프로젝트에 관한 문의나 버그 리포트는 아래 이메일로 연락주세요.
이메일: devel.jjub@gmail.com

