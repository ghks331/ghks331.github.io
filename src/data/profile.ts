import type { Experience } from '../types';

export const profile = {
  name: '이주환',
  email: 'jxjhlee@gmail.com',
  hero: {
    eyebrow: 'Data & AI Portfolio',
    title: '이주환',
    sub: 'Data & AI',
    lines: ['한동대학교 AI융합학부 · ICT융합·데이터사이언스 전공', '2027.02 졸업예정 (현재 수료 상태)'],
  },
  about: {
    statement: '해 보고 싶은 방법은 빨리 시도하고, 결과를 보고 다음 단계를 정합니다.',
    paragraphs: [
      '결과가 바로 나오지 않아도 끝까지 시도해 봅니다. 한 가지 방법이 막히면 원인을 좁혀 보고 다른 방법을 바로 해 봅니다.',
      '시도할 때는 한 번에 하나만 바꾸고 점수로 확인합니다. 점수가 떨어지면 되돌리고 다음 방법으로 넘어갑니다.',
      '만들기 전에는 누가 왜 이 결과를 필요로 하는지부터 확인합니다. 문제가 하나씩 풀려 가는 과정에서 가장 큰 재미를 느낍니다.',
    ],
  },
  education: {
    school: '한동대학교 AI융합학부 · ICT융합 · 데이터사이언스 전공',
    detail: '2019.03 – 2027.02 졸업예정 (현재 수료 상태) · GPA 3.8 / 4.5',
  },
  contact: {
    line: '이주환 · 한동대학교 AI융합학부',
  },
  footer: {
    copyright: '© 2026 이주환',
    note: '키보드만으로 이동할 수 있고, 화면 읽기 프로그램용 라벨을 달았습니다.',
  },
};

export const experiences: Experience[] = [
  { when: '2026.08 – 12', title: '나무아이씨티 현장실습', desc: '유전체 분석 AI 에이전트 서비스 · 하이브리드 RAG · 온프레미스 SLLM 실험' },
  { when: '2025.09 – 2026.02', title: 'K-U시티 연구 참여', desc: '울릉군 교통 데이터 수집, 차량 통행량 자동 집계' },
  { when: '2025 – 2026', title: '수업·캠프 TA (총 4회)', desc: '딥러닝 수업 튜터, Agentic AI·RAG·멀티에이전트 실습 지원' },
  { when: '2025.03 – 06', title: '한동대 VIC센터', desc: '코딩 강의 자료 제작 및 검토' },
  { when: '2023.12 – 2024.06', title: '디지털·코딩 교육', desc: '초등학생 대상 컴퓨터 기초·엔트리 코딩 지도' },
];

export const skills: string[] = [
  'Python', 'TypeScript(React)', 'FastAPI', 'PyTorch', 'LangGraph', 'LangChain', 'SQL', 'Ollama', 'RAG(pgvector)', 'LoRA/QLoRA(MLX)', 'YOLO11', 'OpenCV',
];

export const certificates: string[] = ['SQLD', 'ADsP', 'DP-900', 'AZ-900', '컴퓨터활용능력 2급'];
