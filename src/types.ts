// 사이트 데이터의 "모양"을 정의합니다.
// src/data/*.ts의 내용이 이 모양과 다르면 `npm run build`에서 에러가 납니다.

/** 기간 + 이름 + 설명 한 줄 (About의 Experience 표) */
export interface Experience {
  when: string;
  title: string;
  desc: string;
}

/** 프로젝트 상단의 구분/역할/기술 표 한 칸 */
export interface MetaItem {
  label: string;
  value: string;
}

/** 번호가 붙는 단계 목록의 한 줄. lines는 문단, label이 있으면 앞에 굵게 붙습니다. */
export interface Step {
  title: string;
  ver?: string;
  lines: { label?: string; text: string }[];
}

/** 막대그래프 한 줄. percent는 막대 길이(0~100) */
export interface Bar {
  label: string;
  percent: number;
  value: string;
  after?: boolean;
}

/** 막대그래프 묶음 하나 */
export interface BarGroup {
  title?: string;
  bars: Bar[];
}

export interface Chart {
  caption: string;
  groups: BarGroup[];
  wide?: boolean;
  delta?: { value: string; note: string };
}

/** 소제목 + 설명 (items, Part 머리말 등에서 사용) */
export interface Item {
  title: string;
  desc: string;
}

/** 프로젝트의 Part 머리말 */
export interface PartHead {
  no: string;
  title: string;
  desc: string;
}

/** 이미지 */
export interface Img {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/** 표 (thead 한 줄 + 본문). rowHeader가 true면 각 줄 첫 칸이 행 제목(th)입니다. */
export interface Table {
  caption?: string;
  head: string[];
  rows: { cells: string[]; pick?: boolean }[];
  rowHeader?: boolean;
}

/** 프로젝트 목록 카드 */
export interface ProjectCard {
  id: string;
  no: string;
  period: string;
  thumb: string;
  title: string;
  summary: string;
}

/** 그래프 노드를 눌렀을 때 아래에 나오는 설명 */
export interface FlowNode {
  title: string;
  desc: string;
  branches?: string[];
  note?: string;
}

export type FlowData = Record<string, FlowNode>;

/** 그 밖의 프로젝트 (작은 카드) */
export interface OtherProject {
  badge: string;
  title: string;
  meta: string;
  chips: string[];
  points: string[];
}
