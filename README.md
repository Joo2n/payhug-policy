# 페이허그 정책 (내부)

고객센터(`Joo2n/payhug-support`)와 **별개 사이트**다. 고객센터는 사장님이 보시는 곳, 여기는 내부용이다.

| 경로 | 내용 |
|---|---|
| `/` | 안내 — 입력 → 검토 → 열람 흐름 |
| `/intake/` | 정책 입력함 (제출 양식) |
| `/spec/` | 정책서 (제출분이 쌓여 만들어지는 문서) |

## 제출 내용은 여기 저장되지 않는다

입력 양식은 **GitHub 이슈 프리필 URL**로 비공개 저장소 `Joo2n/payhug-policy-inbox`에 전달한다.
페이지에 토큰이 없으므로 서버·인증이 필요 없고, 작성 내용이 이 공개 저장소에 남지 않는다.

노션 [📥 정책 입력함 DB](https://app.notion.com/p/a43ff18585214319b5d3b5f0d8643fac)도 같은 항목으로 받는다.

## 정책서 갱신

소스는 `Joo2n/payhug-policy-inbox`의 `spec-site/`다. 거기서 빌드한 결과를 이 저장소 `spec/`에 복사한다.

```bash
cd ~/cursor/payhug-policy-inbox/spec-site
python3 build.py
cp -r index.html style.css spec.css app.js content.js content assets ~/cursor/payhug-policy/spec/
```

입력은 `payhug-spec/*.md` 8종 + `data/intake.json`(노션 접수분).
`spec/content/`와 `spec/content.js`는 자동 생성이므로 직접 고치지 말 것.

## 공개 범위 주의

이 저장소는 GitHub Pages 배포를 위해 **공개**다. 무료 Pages는 공개 저장소에서만 동작한다.
따라서 `spec/`에 올라간 정책서는 주소를 아는 사람이면 볼 수 있다.
`noindex`를 걸어 검색엔진 색인은 막았지만 접근 제어는 아니다.

접근 제어가 필요해지면 Cloudflare Pages + Access(이메일 OTP, 50명까지 무료)로 옮기면 된다.

## 테스트

```bash
python3 -m http.server 8897 --directory .
```

- `tests/policy-form.html` — 입력 양식 24개
- `tests/policy-mobile.html` — 375px FAB·바텀시트 19개
- `spec/tests/runner.html` — 정책서 24개

헤드리스 Chrome `--dump-dom`으로 열어 `DONE 0 FAILS` 확인.
