import type { FlowData } from '../types';

// 그래프 노드를 눌렀을 때 아래 패널에 나오는 설명입니다. 키는 노드의 id입니다.

const PART2_NOTE = 'Part 2에서 시험 문제 248개와 자동 채점기로 따로 평가한 구간입니다.';

export const sequoraFlow: FlowData = {
  receive: { title: '요청 접수', desc: '연구자가 “이 데이터로 유전자 발현 분석해 줘”처럼 말로 쓴 요청을 받습니다.', branches: ['→ 요청 해석'] },
  interpret: {
    title: '요청 해석 (AI)',
    desc: '요청에서 분석 종류·생물종·빠진 정보와 데이터 ‘언급’만 추출합니다. 데이터 번호는 이 단계에서 정하지 않습니다. PC용 Ollama 모델이 정해진 양식으로만 답하도록 제한했습니다.',
    branches: ['답 양식이 틀리면 → 다시 생성', '빠진 정보가 있으면 → 되묻기 (사람 응답 대기)', '정상 → 데이터 조회'],
    note: PART2_NOTE,
  },
  clarify: { title: '되묻기 (사람 응답 대기)', desc: '빠진 정보가 있거나 데이터 후보가 불명확하면 연구자에게 되묻고 답을 기다립니다.', branches: ['답변을 받으면 → 요청 해석'] },
  lookup: {
    title: '데이터 조회',
    desc: '언급된 이름·별칭을 카탈로그에서 코드로 조회해 실제 후보 목록을 만듭니다. 후보가 없으면 한 번 더 조회합니다. AI는 조회된 후보 안에서만 번호를 고르고, 목록에 없는 번호·빈 항목은 코드로 보정합니다.',
    branches: ['후보가 불명확하면 → 되묻기', '확정 → 실행 설정 생성'],
    note: PART2_NOTE,
  },
  draft: { title: '실행 설정 생성', desc: '확정된 조건으로 분석 실행 설정을 만듭니다.', branches: ['→ 규칙 검사'] },
  validate: { title: '규칙 검사', desc: '만든 설정을 규칙으로 검사합니다.', branches: ['통과 → 사람 승인', '위반 → 실행 설정 다시 생성', '같은 위반 3회 → 사람 검토 (대기)'] },
  manual: { title: '사람 검토 (대기)', desc: '같은 위반이 3번 반복되면 자동 재시도를 멈추고 사람에게 넘깁니다.', branches: ['검토 후 → 실행 설정 생성'] },
  approve: { title: '사람 승인 (대기)', desc: '사람이 설정을 확인하고 승인합니다. 승인한 뒤 설정이 바뀌면 그 승인은 무효가 됩니다.', branches: ['승인 → 실행 제출', '수정 요청 → 실행 설정 생성'] },
  submit: { title: '실행 제출', desc: '승인된 설정으로 분석을 제출합니다.', branches: ['제출 성공 → 상태 확인', '제출 실패 → 오류 진단'] },
  inspect: { title: '상태 확인', desc: '제출한 분석의 실행 상태를 확인합니다.', branches: ['진행 중 → 실행 대기 후 다시 확인', '완료 → 기록', '실패 → 오류 진단'] },
  waitexec: { title: '실행 대기', desc: '분석이 끝날 때까지 기다린 뒤 상태 확인으로 돌아갑니다.', branches: ['→ 상태 확인'] },
  diagnose: { title: '오류 진단', desc: '제출이나 실행이 실패하면 원인을 진단합니다.', branches: ['재시도 → 실행 설정 생성'] },
  record: { title: '기록', desc: '처리 결과를 기록하고 흐름을 마칩니다.' },
};

const JUDGE_DESC = 'AI 검사관이 변환 결과가 요구사항을 충족하는지 yes/no로 판정합니다. 재귀 한도 5로 무한 반복을 막습니다.';

export const webFlow: FlowData = {
  router: {
    title: '변환 유형 판단 (AI)',
    desc: '토큰 1,000 미만이면 변환을 생략합니다. 그 외에는 AI가 구조 유형(목록·메뉴·푸터 / 강의 상세)을 고릅니다.',
    branches: ['structure → 목록·메뉴 구조 변환', 'lec → 강의 상세 변환', 'none (토큰 1,000 미만 등) → 종료'],
  },
  list: {
    title: '목록·메뉴 구조 변환 (AI)',
    desc: '메뉴·목록처럼 같은 형태가 반복되는 영역에 쓰는 일반 규칙입니다. 항목을 주제별 버튼으로 묶어 처음에는 접어 두고, 버튼을 누르거나 Enter·Space를 치면 펼쳐집니다. 묶음이 여러 단계면 단계대로 겹쳐 접고, 원래 글과 링크는 그대로 둡니다.',
    branches: ['→ Judge 검사'],
  },
  lec: {
    title: '강의 상세 변환 (AI)',
    desc: '썸네일과 제목·상세 정보로 형태가 정해진 K-MOOC 강의 카드 전용 규칙입니다. 카드 전체를 ‘강좌’ 묶음 하나로 접고, 카드마다 강의 제목을 펼침 버튼 겸 제목으로 바꿔 나머지 정보를 그 아래에 접어 둡니다. 화면용 썸네일 이미지는 지웁니다.',
    branches: ['→ Judge 검사'],
  },
  aria: { title: '접근성 마무리 (AI)', desc: '한국어 ARIA 라벨과 페이지 요약을 넣고, 장식 요소를 숨김 처리합니다.', branches: ['→ Judge 검사'] },
  judge1: { title: 'Judge 검사 (judge_1)', desc: JUDGE_DESC, branches: ['yes → 접근성 마무리', 'no → 목록·메뉴 구조 변환 다시 실행'] },
  judge2: { title: 'Judge 검사 (lec_judge)', desc: JUDGE_DESC, branches: ['yes → 접근성 마무리', 'no → 강의 상세 변환 다시 실행'] },
  judge3: {
    title: 'Judge 검사 (judge_3)',
    desc: 'AI 검사관이 마무리 결과가 요구사항을 충족하는지 yes/no로 판정합니다. 재귀 한도 5로 무한 반복을 막습니다.',
    branches: ['yes → 종료', 'no → 접근성 마무리 다시 실행'],
  },
};
