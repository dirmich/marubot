# Contributing to OpenClaw

Welcome to the lobster tank! 🦞

## Quick Links

- **GitHub:** https://github.com/openclaw/openclaw
- **Discord:** https://discord.gg/qkhbAGHRBT
- **X/Twitter:** [@steipete](https://x.com/steipete) / [@openclaw](https://x.com/openclaw)

## Maintainers

- **Peter Steinberger** - Benevolent Dictator
  - GitHub: [@steipete](https://github.com/steipete) · X: [@steipete](https://x.com/steipete)

- **Shadow** - Discord + Slack subsystem
  - GitHub: [@thewilloftheshadow](https://github.com/thewilloftheshadow) · X: [@4shad0wed](https://x.com/4shad0wed)

- **Jos** - Telegram, API, Nix mode
  - GitHub: [@joshp123](https://github.com/joshp123) · X: [@jjpcodes](https://x.com/jjpcodes)

## How to Contribute

1. **Bugs & small fixes** → Open a PR!
2. **New features / architecture** → Start a [GitHub Discussion](https://github.com/openclaw/openclaw/discussions) or ask in Discord first
3. **Questions** → Discord #setup-help

## Before You PR

- Test locally with your OpenClaw instance
- Run tests: `pnpm tsgo && pnpm format && pnpm lint && pnpm build && pnpm test`
- Keep PRs focused (one thing per PR)
- Describe what & why

## AI/Vibe-Coded PRs Welcome! 🤖

Built with Codex, Claude, or other AI tools? **Awesome - just mark it!**

Please include in your PR:

- [ ] Mark as AI-assisted in the PR title or description
- [ ] Note the degree of testing (untested / lightly tested / fully tested)
- [ ] Include prompts or session logs if possible (super helpful!)
- [ ] Confirm you understand what the code does

AI PRs are first-class citizens here. We just want transparency so reviewers know what to look for.

## Current Focus & Roadmap 🗺

We are currently prioritizing:

- **Stability**: Fixing edge cases in channel connections (WhatsApp/Telegram).
- **UX**: Improving the onboarding wizard and error messages.
- **Skills**: Expanding the library of bundled skills and improving the Skill Creation developer experience.
- **Performance**: Optimizing token usage and compaction logic.

Check the [GitHub Issues](https://github.com/openclaw/openclaw/issues) for "good first issue" labels!

## 개발 규칙 (Developer Rules)

이 프로젝트(Marubot Fork)에서 기여할 때는 다음 규칙을 **반드시** 준수해야 합니다.

### 1. 언어 (Language)
- 모든 문서(Commit Message, PR Description, Docs)와 대화는 **한국어(Korean)**를 사용합니다.
- Git Commit Message 예시: `feat: 카카오톡 플러그인 초기 구현`
- `chcp 65001`을 사용하여 한글이 깨지지 않도록 주의합니다.

### 2. 명령 실행 (Command Execution)
- Windows 환경에서는 `run_command`를 직접 실행하기보다, 열려있는 쉘 세션에 `send_command`를 사용하는 것을 선호합니다.
- Git Commit 시에는 `-m` 옵션 대신 파일(`-F COMMIT_MSG`)을 사용하여 인코딩 문제를 방지합니다.

### 3. 작업 절차 (Workflow)
- 작업(Task)이 완료될 때마다 관련 문서를 먼저 업데이트합니다.
- 문서 업데이트 후 반드시 `git commit` 및 `git push`를 수행하여 리모트와 동기화합니다.
