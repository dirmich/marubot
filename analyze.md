# OpenClaw 프로젝트 분석 (Project Analysis)

## 1. 프로젝트 개요 (Overview)
**OpenClaw**는 사용자의 로컬 환경(macOS, iOS, Android, Linux, Windows WSL2)에서 실행되는 **개인용 AI 비서(Personal AI Assistant)**입니다.
여러 메시징 플랫폼(WhatsApp, Telegram, Discord, Slack 등)을 통합 관리하는 **게이트웨이(Gateway)** 역할을 하며, 이를 통해 AI 에이전트와 소통할 수 있습니다.

### 주요 특징
- **Local-first Gateway**: WebSocket 기반의 제어 평면을 통해 로컬에서 모든 데이터와 연결을 관리합니다.
- **Multi-channel**: WhatsApp, Telegram, Slack, Discord, Google Chat, Signal 등 다양한 채널 지원.
- **Multi-agent**: 들어오는 메시지를 작업 공간별, 세션별로 분리된 에이전트로 라우팅.
- **확장성**: 브라우저 제어, 캔버스(Canvas), 노드(기기 제어), 크론(Cron) 등 다양한 도구 제공.
- **음성 지원**: Voice Wake 및 Talk Mode 지원 (ElevenLabs 연동).

## 2. 디렉토리 구조 분석 (Directory Structure)
프로젝트는 모노레포(Monorepo)와 유사한 구조를 가지고 있으며, 핵심 로직은 `src`에 집중되어 있습니다.

- **`apps/`**: 플랫폼별 클라이언트/앱 코드
    - `android/`: Android 앱 (Kotlin)
    - `ios/`: iOS 앱 (Swift)
    - `macos/`: macOS 메뉴바 앱 (Swift)
    - `shared/`: 공유 라이브러리 (OpenClawKit 등)
- **`src/`**: 핵심 Node.js/TypeScript 로직 (Gateway, Agents, Channels 등)
    - `gateway/`: WebSocket 서버 및 제어 로직
    - `agents/`: AI 에이전트 실행 로직
    - `channels/`: 각 메시징 플랫폼 연동 모듈 (telegram, discord, slack 등)
    - `browser/`: 브라우저 자동화 및 제어
    - `infra/`: 인프라 관련 코드
- **`packages/`**: 분리된 패키지 (현재 비어있거나 마이그레이션 중인 것으로 추정됨)
- **`docs/`**: 방대한 문서화 자료
- **`scripts/`**: 빌드, 테스트, 배포 관련 스크립트

## 3. 기술 스택 (Tech Stack)
- **Runtime**: Node.js (v22 이상), pnpm (패키지 매니저), Bun (선택적)
- **Language**: TypeScript (Core), Swift (Apple Platforms), Kotlin (Android)
- **Frameworks/Libs**:
    - Server: `hono` (경량 웹 프레임워크)
    - Agent Core: `@mariozechner/pi-agent-core` 등
    - Chat protocols: `@whiskeysockets/baileys` (WhatsApp), `grammy` (Telegram), `@slack/bolt`, `discord.js` 등
    - Testing: `vitest`

## 4. 개선 제안 사항 (Improvements)

### 4.1. 버전 관리 (Version Control)
- **`pnpm-lock.yaml` 관리**: 현재 `.gitignore`에 `pnpm-lock.yaml`이 포함되어 있습니다. 애플리케이션의 일관된 빌드 환경을 보장하기 위해 락파일(Lockfile)은 Git으로 관리하는 것이 일반적인 모범 사례(Best Practice)입니다. 라이브러리가 아닌 최종 애플리케이션이므로 이를 커밋에 포함시키는 것을 고려해야 합니다.

### 4.2. 구조 리팩토링 (Structure Refactoring)
- **`src` 디렉토리 과부하**: `src` 내에 50개 이상의 하위 디렉토리가 존재합니다. 기능별로 결합도가 높은 모듈들을 묶어 `packages/` 내부의 워크스페이스 패키지로 분리하면 의존성 관리와 빌드 최적화에 유리할 것입니다.
    - 예: `src/channels/*` -> `packages/channels/*`

### 4.3. 의존성 관리 (Dependency Management)
- `package.json`의 `dependencies`에 매우 많은 패키지가 나열되어 있습니다. 모듈 분리를 통해 각 패키지별로 필요한 의존성만 명시하도록 개선할 수 있습니다.

### 4.4. 문서화 (Documentation)
- 이미 훌륭한 문서를 보유하고 있으나, 한글화된 문서나 기여자(Contributor)를 위한 구조 다이어그램이 추가되면 진입 장벽을 낮출 수 있습니다.
