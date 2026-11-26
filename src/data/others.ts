import type { Img, OtherProject } from '../types';

export const othersIntro = {
  eyebrow: 'Other Projects',
  statement: '그 밖의 데이터·AI 경험',
};

/** 사진이 있는 큰 카드: Drone Window Inspection */
export const drone = {
  id: 'window',
  img: {
    src: 'assets/img/window_frames.jpg',
    alt: '드론 영상 프레임별 창문 얼룩 검출 결과. 얼룩은 빨간 점으로 표시되고 프레임마다 창문 대비 얼룩 %가 적혀 있음',
    width: 2000,
    height: 687,
  } satisfies Img,
  title: 'Drone Window Inspection',
  meta: '2026.03 – 2026.06 · AI융합특론 · 4인 팀 · AI 학습 데이터 제작 · 모델 비교',
  chips: ['Python', 'PyTorch', 'OpenCV', 'SAM 2'],
  desc: '드론으로 건물 창문을 찍어 얼룩이 창문 면적의 몇 %인지 재는 프로젝트입니다. 얼룩 탐지 모델의 학습 데이터 제작과 후보 모델 비교를 맡았습니다.',
  points: [
    '깨끗한 창문 사진 34장에 얼룩 무늬 합성, 붙인 위치로 정답 자동 생성',
    '창문을 16×16 칸으로 나눠 경계 모호성 감소, 결과는 창문 대비 얼룩 %',
    'SAM 2로 실제 사진 정답 제작, 깨끗한 창을 ‘얼룩 0%’로 추가',
    '후보 4개 같은 조건 학습·비교, 영상 프레임별 얼룩 % CSV 저장',
  ],
  note: '사진: 영상 프레임별 창문 대비 얼룩 % 결과 · 빨간 점은 검출된 얼룩',
};

/** 단계 + 대시보드 구성 카드: Ulleung Traffic Data */
export const ulleung = {
  id: 'ulleung',
  title: 'Ulleung Traffic Data',
  meta: '2025.09 – 2026.02 · K-U시티 「울릉군 교통 빅데이터 수집 및 분석」',
  chips: ['Python', 'YOLO11', 'ByteTrack', 'OpenCV', 'Streamlit', 'Folium'],
  desc: '섬이라는 지리적 특성 때문에 생기는 울릉군의 교통 문제를 데이터로 진단하고 개선 정책을 제안하는 연구입니다. 저는 현장 데이터 수집과 차량 통과량 계측을 맡았고 수집한 데이터를 Streamlit 대시보드로 시각화했습니다.',
  steps: [
    { title: '현장 조사', desc: '울릉도 현장 답사, 분석에 필요한 데이터 조사·요청' },
    { title: '직접 촬영', desc: '사동항 인근 3개 지점에서 여객선 입출도 시간대(새벽·오전)에 3일간 고정 카메라 촬영' },
    { title: '차량 계측', desc: 'YOLO11로 차량을 찾고 ByteTrack으로 추적, 기준선을 넘는 순간만 세어 항만 접근·이격 방향별 통과 대수 집계' },
    { title: '데이터 정리', desc: '지점·시간대·방향별 통과 대수를 CSV로 정리' },
    { title: '대시보드', desc: 'Streamlit·Folium으로 공지·지도·그래프 3단 대시보드 제작' },
  ],
  dashboard: {
    title: '대시보드 구성',
    items: [
      { label: '공지', text: '울릉 알리미 공지를 해상 공지와 도로 통제 공지로 나눠 표시' },
      { label: '지도', text: '버스 노선·정류장, 교통사고 지점과 현장 사진, 낙석 발생 지점, 전기차 충전소' },
      { label: '그래프', text: '교통 단속 건수, 강수량과 입·출도 여객 수, 성수기·비수기 구분' },
    ],
    note: '버스 위치는 실시간 시스템과 연동하기 전 단계라 데모 데이터를 사용했습니다.',
  },
};

/** 작은 카드 두 개 */
export const smallProjects: OtherProject[] = [
  {
    badge: 'A',
    title: 'Public Data Clustering',
    meta: '2022.09 – 2022.12 · 데이터입문 개인 프로젝트',
    chips: ['Python', 'pandas', 'scikit-learn', 'folium'],
    points: [
      '전통시장 표준데이터 항목 선택·빈 값 제거',
      '시·도 추출 후 folium 지도·카토그램 시각화',
      'K-means 라이브러리·직접 구현 결과 대조',
      'Elbow·Silhouette로 군집 수 검토·범위 재설정',
    ],
  },
  {
    badge: 'B',
    title: 'Coursework',
    meta: '2023.03 – 2023.06 · 딥러닝 수업 실습',
    chips: ['Python', 'PyTorch', 'OpenCV'],
    points: [
      'MNIST 학습 후 직접 쓴 손글씨 보정·예측',
      'CIFAR-100 CNN 구성, 증강·학습/검증 분리',
      'ResNet18 기준 전처리로 이미지 추론',
      '학습 루프·손실 곡선·정확도 기록',
    ],
  },
];
