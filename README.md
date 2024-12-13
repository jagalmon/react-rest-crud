# Next.js 기반 RESTful API 연동 및 그리드 데이터 출력 CRUD 애플리케이션

## 프로젝트 개요

- 작성자 : 김병민
- 이 프로젝트는 Next.js를 사용하여 구현된 간단한 CRUD 애플리케이션입니다. 사용자는 테이블 형식으로 데이터를 관리할 수 있으며, 항목을 추가, 수정(토글), 삭제할 수 있습니다. 이 프로젝트는 /api/route 경로를 통해 RESTful API를 사용하여 데이터를 관리합니다.

## 주요 기능

### 데이터 목록 조회

- 페이지가 로드될 때 useEffect를 통해 /api/route에서 데이터를 가져옵니다.
- 가져온 데이터는 테이블 형식으로 렌더링됩니다.

### 새로운 항목 추가

- 입력 필드에 제목을 입력한 후 "Add Row" 버튼을 클릭하여 새로운 항목을 추가할 수 있습니다.
- 항목은 POST 요청을 통해 /api/route에 전송됩니다.

### 항목 상태 변경

- 테이블의 "Toggle" 버튼을 클릭하여 항목의 완료 상태(completed)를 토글할 수 있습니다.
- 상태 변경은 PUT 요청을 통해 /api/route에 전송됩니다.

### 항목 삭제

- "RowDel" 버튼을 클릭하여 특정 항목을 삭제할 수 있습니다.
- 삭제는 DELETE 요청을 통해 /api/route에 전송됩니다.

## 코드 설명

### 주요 컴포넌트: Home

- 상태 관리: useState를 사용하여 데이터(resultMap)와 입력 필드(newTitle)를 관리합니다.
- 데이터 초기화: useEffect로 초기 데이터를 가져옵니다.
- CRUD 로직:
-- addNewItem: 새로운 항목 추가
-- toggleCompleted: 완료 상태 토글
-- deleteItem: 항목 삭제

### 스타일
- 인라인 CSS를 사용하여 기본적인 테이블 및 버튼 스타일을 적용하였습니다.

## 참고 사항

- /api/route는 서버 측에서 구현된 RESTful API로, 데이터베이스와 연동하여 CRUD 작업을 처리합니다. route.js 파일에 API 관련 로직이 구현되어 있습니다.
- 이 코드는 예제 수준으로 작성되었으며, 실제 배포 환경에서는 추가적인 에러 핸들링 및 보안 설정이 필요합니다.

## License

- This project is licensed under the MIT License. See the LICENSE file for details.
