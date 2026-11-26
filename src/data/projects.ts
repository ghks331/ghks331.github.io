import type { Chart, Img, Item, MetaItem, PartHead, ProjectCard, Step, Table } from '../types';

/** Projects 섹션의 카드 목록 */
export const projectCards: ProjectCard[] = [
  {
    id: 'sequora',
    no: '01',
    period: '2026.08 – 12',
    thumb: 'assets/img/sequora_flow.png',
    title: 'SEQUORA',
    summary: '현장실습 · AI 에이전트 서비스 · 평가셋 기반 개선 · 하이브리드 RAG · Human-in-the-loop',
  },
  {
    id: 'webaccess',
    no: '02',
    period: '2025.03 – 2026.01',
    thumb: 'assets/img/hb_pipeline.png',
    title: '시각장애인 웹 접근성 개선 서비스 개발',
    summary: '데이터 수집 · AI 처리 흐름 설계 · 사용자 검증 · 팀장 · 교육부장관상',
  },
];

/** 프로젝트 상세 공통 머리 부분 */
export interface ProjectHead {
  id: string;
  eyebrow: string;
  award?: string;
  title: string;
  meta: MetaItem[];
  lead: { statement: string; text: string };
}

// ---------------------------------------------------------------- 01 SEQUORA

export const sequora = {
  head: {
    id: 'sequora',
    eyebrow: 'Project 01 · 2026.08 – 2026.12 (진행 중)',
    title: 'SEQUORA',
    meta: [
      { label: '구분', value: '나무아이씨티 현장실습' },
      { label: '역할', value: 'LLM 구간 구현 · 평가 · RAG' },
      { label: '언어 · 기술', value: 'Python · LangGraph · Structured Output' },
      { label: '모델 · 도구', value: 'Ollama · qwen3.5 9B · pgvector' },
    ],
    lead: {
      statement: '연구자의 자연어 분석 요청을 규칙 검사와 사람 승인을 거쳐 실행하는 사내 AI 에이전트 서비스입니다.',
      text: '연구자가 ‘이 데이터로 유전자 발현 분석해 줘’처럼 요청하면 LLM이 조건을 정리하고, Human-in-the-loop 승인 후 분석 서버에서 실행합니다. 전체 시스템은 TypeScript 웹 화면 · FastAPI 백엔드 API · Docker 분석 실행 환경 · LangGraph 에이전트 · Ollama 로컬 LLM으로 구성됩니다. 이 중 LLM 구간(요청 해석 · RAG · 평가 체계)의 구현·성능 측정·개선을 맡았습니다.',
    },
  } satisfies ProjectHead,

  part1: {
    head: {
      no: 'Part 1',
      title: 'AI 에이전트 구현',
      desc: '요청 해석부터 검사·승인·실행까지 9단계 처리 흐름을 연결하고, 틀린 AI 답은 규칙으로 걸러 재시도합니다.',
    } satisfies PartHead,
    flow: {
      title: 'SEQUORA 에이전트 그래프 · 노드와 조건 분기',
      hint: '단계를 누르면 하는 일과 분기가 아래에 나옵니다. 좁은 화면에서는 옆으로 밀어 보세요.',
    },
    items: [
      { title: '9단계 처리 흐름', desc: '진행·되묻기·재생성 분기, 승인 후 설정 변경 시 승인 무효' },
      { title: '로컬 LLM 연결 (온프레미스)', desc: 'Ollama 로컬 LLM으로 온프레미스 환경 적용 가능성 탐색, Structured Output으로 양식 고정' },
      { title: '틀린 답 재시도', desc: '양식 오류 시 재생성, 같은 오류 3회면 사람 검토로 전달' },
    ] satisfies Item[],
  },

  part2: {
    head: {
      no: 'Part 2',
      title: '평가셋 기반 프롬프트 개선',
      desc: '지시문 24개 버전을 거치며 규칙을 더하는 방식에서 LLM과 코드가 역할을 나누는 구조로 바꿨습니다.',
    } satisfies PartHead,
    steps: [
      {
        title: '평가셋부터 만들기',
        ver: '평가 기준',
        lines: [
          { label: '한 일', text: '기본 36 · 처음 보는 표현 144 · 데이터 이름·별칭 16 · 설정 16문항으로 묶음을 나누고 자동 채점기 구축' },
          { label: '원칙', text: '한 번에 하나만 바꾸고, 원래 답과 보정 답을 따로 기록. 점수가 떨어진 버전은 되돌림' },
        ],
      },
      {
        title: '규칙 덧붙이기',
        ver: 'v1–v11',
        lines: [
          { label: '시도', text: '사용자 원문을 지시가 아닌 데이터로 분리(인젝션 방어), 필드별 추출 순서와 예시 추가' },
          { label: '막힌 점', text: '규칙이 쌓일수록 한 필드를 고치면 다른 필드가 깨지고, 예시 문장을 외울 위험' },
        ],
      },
      {
        title: '예시 빼고 의미로 정의',
        ver: 'v12–v17',
        lines: [
          { label: '시도', text: '평가 문장·ID를 외우지 않도록 예시를 지우고, 필드의 역할과 판단 순서로 정의' },
          { label: '막힌 점', text: '데이터 번호 확정처럼 정답이 정해진 판단은 지시문만으로 오류가 줄지 않음' },
        ],
      },
      {
        title: 'LLM과 코드 역할 나누기',
        ver: 'v18–v24',
        lines: [
          { label: '바꾼 구조', text: 'LLM은 데이터 ‘언급’만 추출 → 코드가 후보 조회 → LLM은 후보 안에서 선택. 표기 정리는 코드가 맡고 지시문은 짧게 재작성' },
        ],
      },
    ] satisfies Step[],
    chart: {
      caption: '처음 보는 요청 46건 전체 정답률',
      wide: true,
      groups: [
        {
          bars: [
            { label: '지시문 개선', percent: 41, value: '41%' },
            { label: '+ 파라미터 RAG', percent: 87, value: '87%', after: true },
          ],
        },
      ],
      delta: { value: '41% → 87%', note: 'RAG는 Part 3' },
    } satisfies Chart,
    note: '최종 모델: 로컬 모델 5종을 같은 조건으로 비교해 qwen3.5 9B 선정',
  },

  part3: {
    head: {
      no: 'Part 3',
      title: '파라미터 RAG · 하이브리드 검색 · Tool Calling',
      desc: '요청 속 설정을 파이프라인 스키마 문서에서 찾아 맞추는 기능입니다. 일반 RAG에서 시작해 검색·구조·도구 순서로 개선했습니다.',
    } satisfies PartHead,
    steps: [
      { title: '일반 RAG', ver: '출발', lines: [{ text: '요청 전체를 벡터 하나로 검색 → 한국어 요청이나 설정이 여럿인 요청에서 일부 설정을 놓침' }] },
      { title: '혼합 검색', ver: '검색 보강', lines: [{ text: '문장 조각화 · 다국어 임베딩(bge-m3) · 키워드 검색 + RRF 결합, 절마다 상위 2개 보장' }] },
      { title: '보충형 → 판정형', ver: '구조 변경', lines: [{ text: 'LLM 결과를 ‘제안’으로 두고 코드가 스키마 기준으로 판정, 애매하면 선택지로 질문' }] },
      { title: '검색을 Tool로', ver: '확장', lines: [{ text: 'search_pipeline_params 도구로 만들어 필요할 때만 호출 → 설정 언급 없는 요청은 지연 약 절반' }] },
    ] satisfies Step[],
    chart: {
      caption: '모델별 RAG 적용 전·후 전체 정답률 · 테스트셋 46건, RAG 상시 적용 기준',
      groups: [
        {
          title: 'qwen3.5 9B (최종)',
          bars: [
            { label: 'RAG 전', percent: 41, value: '41%' },
            { label: 'RAG 후', percent: 87, value: '87%', after: true },
          ],
        },
        {
          title: '4B + LoRA',
          bars: [
            { label: 'RAG 전', percent: 39, value: '39%' },
            { label: 'RAG 후', percent: 46, value: '46%', after: true },
          ],
        },
        {
          title: '4B + QLoRA',
          bars: [
            { label: 'RAG 전', percent: 33, value: '33%' },
            { label: 'RAG 후', percent: 33, value: '33%', after: true },
          ],
        },
      ],
    } satisfies Chart,
    extra: {
      title: '함께 한 실험 · 온프레미스용 SLLM 파인튜닝·양자화',
      desc: '4B + LoRA는 RAG 없이 39%로 9B(41%)와 비슷했지만, RAG를 붙여도 46%에 그쳐(9B는 87%) 9B로 전환했습니다. 테스트셋 46건 기준입니다.',
    } satisfies Item,
  },
};

// ---------------------------------------------------------------- 02 Web Access

export const webAccess = {
  head: {
    id: 'webaccess',
    eyebrow: 'Project 02 · 2025.03 – 2026.01',
    award: 'WE-Meet 빅데이터 부문 대상 · 교육부장관상',
    title: '시각장애인 웹 접근성 개선 서비스 개발',
    meta: [
      { label: '구분', value: '산학협력 캡스톤 · 3인 팀' },
      { label: '역할', value: '팀장 · 데이터·모델 · AI 처리 흐름' },
      { label: '언어 · 기술', value: 'Python · YOLO · LangGraph' },
      { label: '결과물', value: '크롬 확장 프로그램 (데모 버전)' },
    ],
    lead: {
      statement: '웹페이지 구조를 AI로 분석해 화면 읽기 프로그램이 읽기 쉬운 순서로 다시 정리하는 크롬 확장 프로그램(데모 버전)입니다.',
      text: '시각장애인은 화면을 소리로 읽어 주는 프로그램과 Tab 키로 웹을 사용합니다. 버튼·이미지가 ‘버튼’, ‘이미지’라고만 읽히고, 광고·배너를 다 지나야 원하는 정보에 닿습니다(평균 150번). 코드를 통째로 AI에 넣으면 입력 한도를 넘거나 엉뚱한 결과가 나왔습니다.',
    },
  } satisfies ProjectHead,

  pipeline: {
    img: {
      src: 'assets/img/hb_pipeline.png',
      alt: '시각장애인 웹 접근성 개선 서비스 전체 구조: 브라우저 확장에서 화면 분석, HTML 영역 분할, LangGraph 구조 분석으로 이어지는 파이프라인',
      width: 1768,
      height: 972,
    } satisfies Img,
    caption: '전체 파이프라인',
  },

  part1: {
    head: {
      no: 'Part 1',
      title: '데이터 수집·학습 데이터 제작',
      desc: '웹페이지 수집부터 화면 영역 학습 데이터 제작·모델 학습, 화면 분할 방식 비교까지 진행했습니다.',
    } satisfies PartHead,
    steps: [
      { title: '웹 데이터 수집', lines: [{ text: 'BeautifulSoup·Selenium·Playwright·Puppeteer 4종 비교 → 동적 화면 반영을 위해 브라우저 확장에서 직접 수집' }] },
      { title: '학습 데이터 제작', lines: [{ text: '쇼핑·교육 사이트 화면에 ‘상품 목록’·‘배너’·‘정보창’ 영역 표시, 541장 (변형 이미지 포함)' }] },
      { title: '모델 학습', lines: [{ text: '화면에서 영역 위치를 찾는 객체 탐지 모델(YOLO 등) 학습' }] },
      { title: '코드 연결', lines: [{ text: '찾은 위치를 실제 웹페이지 코드와 매칭, 영역별 번호를 붙여 영역 단위로 AI에 입력' }] },
    ] satisfies Step[],
    labeling: {
      img: {
        src: 'assets/img/hb_labeling.png',
        alt: '쇼핑 사이트 화면에 영역(container)을 표시한 라벨링 결과',
        width: 702,
        height: 714,
      } satisfies Img,
      caption: '화면 영역 라벨링 결과',
    },
    table: {
      caption: '화면 분할 방식 비교',
      head: ['화면 분할 방식', '문제'],
      rows: [
        { cells: ['이미지만 보고 나누기', '큰 영역 경계 부정확'] },
        { cells: ['AI에게 화면 사진 주기', '코드 구조·읽는 순서와 어긋남'] },
        { cells: ['사람이 직접 지정', '페이지마다 수작업, 확장 불가'] },
        { cells: ['AI가 코드 통째로 나누기', '코드가 중간에 끊김'] },
        { cells: ['채택 · 모델 + 규칙', '학습한 모델로 영역을 찾고 규칙으로 실제 코드 확정. 새 사이트는 규칙 몇 개만 추가'], pick: true },
      ],
    } satisfies Table,
  },

  part2: {
    head: {
      no: 'Part 2',
      title: 'AI 처리 흐름(에이전트) 설계',
      desc: '상용 AI API(GPT-4o) 프롬프트 실험에서 시작해, 변환 결과를 AI 검사관(Judge)이 채점하는 LangGraph 흐름으로 발전시켰습니다.',
    } satisfies PartHead,
    steps: [
      { title: '한 번에 요청', lines: [{ text: '코드 전체를 넣고 한 번에 수정 요청 → 복잡한 페이지는 결과 불안정' }] },
      { title: '원인 측정', lines: [{ text: '영역별로 AI 입력 길이를 재 보니 상단 메뉴 하나가 본문보다 길었음 → 한 번에 넣기엔 입력이 너무 많다고 판단' }] },
      { title: '단계별 요청', lines: [{ text: '설명 추가 → 메뉴 정리로 나눠 순차 요청. 틀린 결과 걸러낼 장치 부재' }] },
      { title: 'LangGraph 전환', lines: [{ text: '유형 판단 → 변환 → Judge 검사로 노드를 나누고 불합격 시 재실행' }] },
    ] satisfies Step[],
    flow: {
      title: '접근성 변환 그래프 · 노드와 조건 분기',
      hint: '노드를 누르면 설명이 나옵니다.',
    },
    why: {
      title: '변환을 두 갈래로 나눈 이유',
      desc: '목록·메뉴 변환은 어느 사이트의 반복 영역에나 쓰는 일반 규칙입니다. 강의 카드는 썸네일과 제목·상세 정보로 형태가 정해져 있어 이 형태에 맞춘 전용 규칙을 따로 두었습니다.',
    } satisfies Item,
    table: {
      head: ['구분', '목록·메뉴 구조 변환', '강의 상세 변환'],
      rowHeader: true,
      rows: [
        { cells: ['대상', '메뉴·목록·푸터 등 반복 영역', 'K-MOOC 강의 카드'] },
        { cells: ['묶는 방식', '주제별 버튼으로 묶고 여러 단계면 겹쳐 접음', '카드 전체를 ‘강좌’ 묶음 하나로 접음'] },
        { cells: ['펼침 버튼', '내용의 큰 주제를 버튼 글자로 사용', '카드마다 강의 제목을 펼침 제목으로 변환'] },
        { cells: ['지우는 것', '없음 (원래 글·링크 유지)', '화면용 썸네일 이미지'] },
      ],
    } satisfies Table,
  },

  part3: {
    head: {
      no: 'Part 3',
      title: '사용자 검증',
      desc: '시각장애인 5명이 화면 읽기 프로그램으로 K-MOOC·쿠팡에서 같은 과제 5개를 원래 페이지와 개선 페이지에서 각각 수행했습니다.',
    } satisfies PartHead,
    charts: [
      {
        caption: '평균 탐색 시간',
        groups: [
          {
            bars: [
              { label: '원래 페이지', percent: 100, value: '124.98초' },
              { label: '개선 페이지', percent: 42.12, value: '52.64초', after: true },
            ],
          },
        ],
        delta: { value: '−57.9%', note: '124.98초 → 52.64초' },
      },
      {
        caption: '평균 Tab 이동 횟수',
        groups: [
          {
            bars: [
              { label: '원래 페이지', percent: 100, value: '150회' },
              { label: '개선 페이지', percent: 26.4, value: '39.6회', after: true },
            ],
          },
        ],
        delta: { value: '−73.6%', note: '150회 → 39.6회' },
      },
    ] satisfies Chart[],
    note: '비슷한 내용 묶기, 광고 접기, 맨 위 페이지 요약으로 이동 거리를 줄였습니다. 이 결과로 WE-Meet 빅데이터 부문 대상(교육부장관상)을 받았습니다.',
  },
};
