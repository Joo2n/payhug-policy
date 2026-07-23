# 인수인계 — 페이허그 정책·고객센터 작업

> 다음 세션에서 **이 파일 하나만 읽으면** 전체 맥락을 파악하도록 정리한 문서다.
> 메모리가 없어도 이 문서 + 세 저장소의 git log로 이어서 작업할 수 있다.
> 최종 갱신: 2026-07-23

---

## 0. 한눈에 — 3개 페이지는 완전히 별개다 (★가장 중요)

사용자가 반복해서 강조한 원칙. 절대 뒤섞지 말 것.

| # | 페이지 | 배포 URL | 로컬 | 저장소 |
|---|---|---|---|---|
| **1** | **고객센터** (바로쏜다 미러링, 사장님·고객이 봄) | https://joo2n.github.io/payhug-support/ | `~/cursor/payhug-support` | `Joo2n/payhug-support` (공개) |
| **2** | **복원 페이지** (옛 정책 입력함 폼, 팀에 이미 공유한 레거시) | https://joo2n.github.io/payhug-support/policy/ | `~/cursor/payhug-support/policy/` | 위와 같은 저장소 안 |
| **3** | **정책 프로젝트** (새것: 입력함 + 정책서) | https://joo2n.github.io/payhug-policy/ | `~/cursor/payhug-policy` | `Joo2n/payhug-policy` (공개) |

- **3번에서 1·2번(payhug-support)으로 가는 href 링크가 하나도 없어야 한다.** (정책 데이터의 "고객센터 반영" 필드는 링크가 아니라 분류 메타 — 예외)
- **1번 고객센터는 내용 수정 외에 구조 변경(연결·삭제·이동) 금지 — 사용자 허락 먼저 받을 것.**
- 2번과 3번만 우리가 자유롭게 다룬다.

### 2번 vs 3번 차이 (사용자가 물었던 것)
둘 다 정책 입력함을 갖고 있고 그 폼은 거의 동일(2번을 복사해 3번 입력함을 만듦), 제출 대상도 같은 비공개 저장소. **차이는 3번엔 정책서가 붙어 있다는 것뿐.** 2번은 입력 폼 단독, 3번은 입력함+정책서 완결본.
→ **미결 질문:** 2번을 "3번으로 이동" 안내 페이지로 바꿔 정리할지 사용자에게 물어봤고 **답 대기 중.** 단 2번은 고객센터 저장소 안이라 정리하면 1번을 건드리게 됨 → 허락 필요.

---

## 4번째 산출물 — 백업 (저장소 아님)

`~/Desktop/payhug_고객센터_백업/` 에 고객센터(1번) 전체 백업:
- `고객센터_전체_20260723.html` — 자기완결 단일 HTML (서버 없이 열림, 로고·스타일 인라인)
- `고객센터_전체_20260723.pdf` — 64쪽, 인쇄·공유용

생성 스크립트는 `payhug-support` 저장소를 **읽기만** 함(손 안 댐). 재생성/갱신 요청 시 아래 "백업 재생성" 참조.

---

## 1. 3번 정책 프로젝트 구조 (`~/cursor/payhug-policy`)

```
index.html        홈 — 정책 넣기(입력함) + 정책서 보기(2형식) 허브
intake/index.html 정책 입력함 (폼). GitHub 이슈 프리필로 비공개 Joo2n/payhug-policy-inbox 에 제출
                  (페이지에 토큰 없음 → 서버·인증 불필요). 노션 DB 병행. 모바일 FAB=종이비행기+"제출"
spec/             정책서 · 문서별 보기 (좌 목록·중 본문·우 목차, 검색·섹션 딥링크)
spec-list/        정책서 · 전체 보기 (모든 문서 세로 나열 + 상단 점프 칩)
tests/            policy-form.html(24) · policy-mobile.html(21, 375px)
spec/tests/       runner.html(24, shell:no-support-link 포함)
```

- **정책서 2형식은 사용자 요청**("좌우 구조와 아래 나열 2가지 다 만들어 예시로"). 사용자가 하나로 정하면 다른 하나 내림 — **결정 대기 중.**
- 입력함↔정책서는 프로젝트 내부에서 연결(홈 + 정책서 하단 `../intake/` 링크). 고객센터로는 연결 안 함.
- `spec/`·`spec-list/`는 **빌드 산출물** — 직접 고치지 말 것. 소스는 아래.

## 2. 정책서 빌드 (소스: `~/cursor/payhug-policy-inbox/spec-site/`)

`Joo2n/payhug-policy-inbox` = **비공개** 저장소. 정책 접수 이슈 + 정책서 빌드 소스가 여기 있다.

```bash
cd ~/cursor/payhug-policy-inbox/spec-site
python3 build.py        # payhug-spec md 8종 + data/intake.json → content/*.html + content.js
python3 build_flat.py   # 같은 content를 단일 스크롤 페이지로 → spec-flat.html
# 배포 반영:
cp -r index.html app.js content content.js tests ~/cursor/payhug-policy/spec/
cp spec-flat.html ~/cursor/payhug-policy/spec-list/index.html
cd ~/cursor/payhug-policy && git add -A && git commit && git push   # 1~2분 후 Pages 반영
```

- 입력: `~/cursor/payhug/payhug-spec/` 의 `01~07_*.md` + `analysis/00_종합.md` (8종) + `data/intake.json`(노션 접수분)
- **규칙: h2 `id="sec-N"` / h3 `id="sec-N-M"` — 목차·딥링크가 이 규칙에 의존.** md 고칠 때 지킬 것
- `content/`·`content.js`는 자동 생성 → 원본 md를 고치고 재빌드. 직접 수정 금지
- `data/intake.json` 갱신: 노션 DB를 MCP로 조회해 덮어씀 (아래)

## 3. 정책 접수 → 반영 파이프라인

**입력 3채널 (모두 같은 항목, 비공개 `payhug-policy-inbox`로 수렴):**
1. 입력 양식 https://joo2n.github.io/payhug-policy/intake/ → GitHub 이슈 프리필
2. 노션 `📥 정책 입력함` DB — https://app.notion.com/p/a43ff18585214319b5d3b5f0d8643fac (data source `collection://a14a6276-1459-4552-a9f7-73ac213b396b`). **기획 허브의 '📜 정책 이력'과는 별개 원장**
3. 입력 양식의 "마크다운 복사" → Claude에게 붙여넣기

**반영 (사용자가 "정책 입력함 반영해줘" 등 요청 시):**
1. 노션 DB를 `notion-query-data-sources`로 조회 → `data/intake.json` 갱신
2. 근거 확인·기존 문서 대조 → `payhug-spec` md 수정 (확정만 값으로, 나머지 `<span class="tbd">확정 예정</span>`)
3. 재빌드 → payhug-policy 배포
4. 노션 DB의 `처리 상태`·`반영 결과` 갱신
5. 근거 부족·충돌 시 임의 확정 금지 — 되물을 것

---

## 5. 지금까지 한 일 (시간순 요약)

1. **고객센터(1번)** 구축 — 바로쏜다 고객센터 구조·기능만 미러링, 본문은 payhug-spec 기반 자체 작성. 아티클 7개(signup/documents/workplace/contract/sales/settlement/faq)
2. **계약 유형(직계약/총판) 교차 검증** — 계약서 폴더에 `가맹점직계약`/`총판 가맹점계약` 두 벌 존재 확인. 직계약=양수인 페이허그, 총판=양수인 채권매입업체·재양수인 페이허그. 계약서에 인쇄된 상호가 페이허그가 아닐 수 있음 → 채권 양수인·계산서 공급자·입금자명 3개는 페이허그로 단정 금지. tbd 자리표시자 133곳
3. **정책 파이프라인** 구축 — 입력함 + 노션 DB + 비공개 접수 저장소
4. **혼동·정정** — 처음에 정책 도구를 고객센터 저장소 안(`/policy/`)에 뒀다가, 사용자 지적으로 **3번(payhug-policy)으로 완전 분리**. 2번(`payhug-support/policy/`)은 팀 공유 레거시라 git 복원해 유지
5. **정책서 2형식**(문서별/전체) 제작, 3번에서 고객센터 링크 전부 제거해 독립
6. **검증** — 3페이지 독립성을 병렬 에이전트로 확인, 전부 통과 (support href 잔재 0, 테스트 전부 DONE 0 FAILS)
7. **고객센터 백업** HTML+PDF 생성 (바탕화면)

## 6. 미결·다음 할 일 (사용자 결정 대기)

- [ ] **정책서 형식 결정** — 문서별 보기(spec/) vs 전체 보기(spec-list/) 중 하나로 정할지, 둘 다 둘지
- [ ] **2번 정리 여부** — `payhug-support/policy/`를 3번으로 이동 안내 페이지로 바꿀지 (1번 저장소 건드리므로 허락 필요)
- [ ] **정책서 공개 범위** — 무료 Pages는 공개 저장소 전용이라 정책서가 주소만 알면 열림(수수료율 후보·계약 조항·거래처 상호 포함). `noindex`는 색인만 막음. 접근 제어 필요 시 Cloudflare Pages + Access(이메일 OTP, 50명 무료) 권장
- [ ] **미확정 정책 채우기** — tbd 133곳. 특히 3대 지뢰(수수료율 C1 / 지급 캘린더 C2 / 예상 지급 차액 C4)는 근거 없이 확정 금지. 계약 당사자·계산서 공급자·계좌변경 주체도 확인 필요

## 7. 함정 (겪은 것)

- **레포 생성·백그라운드 서버 기동이 Claude Code 권한 분류기에 막힐 수 있다** (GitHub가 아니라 승인 단계). 우회 말고 사용자에게 알릴 것. `gh repo create`가 통과한 적 있음
- **포트 점유** 시 사용자가 명령 재실행하면 "Address already in use"로 죽어 "안 열린다"가 됨 — `lsof -nP -iTCP:<port> -sTCP:LISTEN`로 먼저 확인
- **헤드리스 Chrome이 CDN 캐시본을 찍을 수 있음** — 배포 확인은 curl로, 스크린샷과 별개로
- **헤드리스 QA 함정**: ① 가상시간은 일정 시점 후 스크롤 커밋 멈춤 → scrollY 대신 scrollTo 호출 스파이 ② `#form` 존재만으로 대기하면 하단 인라인 script 실행 전 단언 → 스크립트가 채우는 결과물(#preview 등)로 대기
- **macOS 헤드리스는 `--window-size` 최소폭 500px 클램프** → 375px 모바일 검증은 same-origin iframe 래퍼로

## 8. 백업 재생성

스크립트는 job tmp에 있었으므로 세션 넘어가면 없음. 재생성 로직: `payhug-support`의 `content/*.html` 7개 + `content.js`(순서·제목) + `style.css` + 로고를 읽어 단일 HTML로 이어붙이고(각 아티클 `<section class="article-body">`, FAQ `<details>`는 `open` 처리, sec-N id는 문서별 prefix), 헤드리스 크롬 `--headless=new --print-to-pdf --no-pdf-header-footer` 로 PDF. 결과는 `~/Desktop/payhug_고객센터_백업/`.
