# Sierpinski Carpet

WebGL로 Sierpinski Carpet을 그리는 컴퓨터그래픽스 과제입니다.

## 사용 방법

- 슬라이더로 분할 횟수를 0~6 사이에서 조절합니다.
- 색상 선택창에서 도형 색상을 바꿉니다.
- 처음 실행하면 분할 횟수 0, 빨간색 정사각형이 표시됩니다.

## 파일 구성

- `과제/Sierpinski Carpet/Sierpinski_carpet.html`: 화면과 셰이더
- `과제/Sierpinski Carpet/Sierpinski Carpet.js`: 정사각형 재귀 분할, 색상 처리, 화면 그리기
- `과제/Sierpinski Carpet/backup.js`: 수정 전 삼각형 예제 보관본. 현재 HTML에서는 사용하지 않습니다.
- `WebGL-master/Common/`: 실행에 필요한 WebGL 공통 파일 3개

## 공통 파일 출처

`WebGL-master/Common/`의 파일은 Ed Angel과 Dave Shreiner의 WebGL 예제에서 사용하는 공통 코드입니다. 해당 파일과 라이선스는 기존 수업 자료 폴더에서 그대로 가져왔으며, `WebGL-master/LICENSE.md`에 원본 MIT 라이선스를 포함했습니다.
