/* 자동 생성 — build.py 가 만든다. 직접 고치지 말 것. */

const SITE = {
  siteName: "페이허그 선정산 정책서",
  searchHint: "정책 제목, 내용",
  tagline: "페이허그 선정산 서비스 정책서 (내부용)",
  homepage: "https://payhug.io",
  contactEmail: "support@payhug.io",
  inquiryUrl: "https://joo2n.github.io/payhug-support/policy/",
  company: {
    name: "주식회사 페이허그",
    copyright: "주식회사 페이허그",
    lines: ["내부 문서 — 외부 공유 금지", "정책 확정분은 정책 입력함으로 제출해 주세요"],
  },
};

const ARTICLES = [
  { id: "intake", title: "정책 입력함 접수 대장", desc: "제출된 정책이 쌓이는 곳. 반영 상태를 함께 표시해요.", pinned: true },
  { id: "overview", title: "서비스 개요", desc: "선정산이 무엇이고 누가 어떤 순서로 관여하는지.", pinned: true },
  { id: "terms", title: "용어·상태값", desc: "6대 개념 분리 원칙과 내부/노출 용어 매핑." },
  { id: "logic", title: "정산 로직", desc: "미리 받는 돈이 어떻게 계산되고 지급되는지." },
  { id: "exception", title: "예외 케이스", desc: "플랫폼별 예외와 음수·조정 처리." },
  { id: "ui", title: "가맹점 UI 요구사항", desc: "화면에 무엇을 어떤 라벨로 노출하는지." },
  { id: "admin", title: "어드민·알림톡", desc: "회수 어드민 기능과 알림 발송 기준." },
  { id: "open", title: "미확정 질문", desc: "아직 결정되지 않아 확정할 수 없는 항목." },
  { id: "conflict", title: "충돌 레지스터", desc: "문서마다 값이 다른 항목과 재기획 방향." },
];
