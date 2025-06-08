# NestJS 게시판 애플리케이션

효율적이고 확장 가능한 Node.js 기반의 게시판 애플리케이션입니다. NestJS 프레임워크를 사용하여 TypeScript로 개발되었으며, JWT 인증과 PostgreSQL을 활용합니다.

## 🚀 주요 기능

- **게시물 관리**: 게시물 생성, 조회, 수정, 삭제 (CRUD)
- **사용자 인증**: JWT 토큰 기반 회원가입/로그인
- **데이터 유효성 검증**: class-validator를 통한 입력 데이터 검증
- **비밀번호 암호화**: bcryptjs를 사용한 안전한 비밀번호 저장
- **권한 관리**: 인증된 사용자만 게시물 접근 가능

## 🛠 기술 스택

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT, Passport
- **Password Encryption**: bcryptjs
- **Validation**: class-validator, class-transformer

## 📁 프로젝트 구조

```
src/
├── auth/                    # 인증 모듈
│   ├── auth.controller.ts   # 인증 컨트롤러
│   ├── auth.service.ts      # 인증 서비스
│   ├── auth.module.ts       # 인증 모듈
│   ├── user.entity.ts       # 사용자 엔티티
│   ├── user.repository.ts   # 사용자 레포지토리
│   ├── jwt.strategy.ts      # JWT 전략
│   ├── get-user.decorator.ts # 커스텀 데코레이터
│   └── dto/
│       └── auth-credential.dto.ts
├── boards/                  # 게시판 모듈
│   ├── boards.controller.ts # 게시판 컨트롤러
│   ├── boards.service.ts    # 게시판 서비스
│   ├── boards.module.ts     # 게시판 모듈
│   ├── board.entity.ts      # 게시물 엔티티
│   ├── board.repository.ts  # 게시물 레포지토리
│   ├── board-status.enum.ts # 게시물 상태 열거형
│   ├── pipes/               # 커스텀 파이프
│   └── dto/                 # 데이터 전송 객체
├── configs/                 # 설정 파일
│   └── typeorm.config.ts
├── app.module.ts           # 루트 모듈
└── main.ts                 # 애플리케이션 진입점
```

## 🔗 API 엔드포인트

### 인증 API
| Method | Endpoint | Description | 인증 필요 |
|--------|----------|-------------|-----------|
| POST   | `/auth/signup` | 회원가입 | ❌ |
| POST   | `/auth/signin` | 로그인 | ❌ |

### 게시판 API
| Method | Endpoint | Description | 인증 필요 |
|--------|----------|-------------|-----------|
| GET    | `/boards` | 모든 게시물 조회 | ✅ |
| GET    | `/boards/:id` | 특정 게시물 조회 | ✅ |
| POST   | `/boards` | 게시물 생성 | ✅ |
| PATCH  | `/boards/:id/status` | 게시물 상태 변경 | ✅ |
| DELETE | `/boards/:id` | 게시물 삭제 | ✅ |


## 🎯 주요 특징

### 모듈화 설계
- 각 기능별로 독립된 모듈 구조
- 의존성 주입을 통한 느슨한 결합

### 데이터 검증
- DTO(Data Transfer Object)를 통한 타입 안전성
- class-validator를 이용한 입력 데이터 검증
- 커스텀 파이프를 통한 비즈니스 로직 검증

### 에러 처리
- HTTP 상태 코드에 맞는 예외 처리
- 사용자 친화적인 에러 메시지
