// SEQUORA LangGraph 그래프 (SVG). 노드 위치·화살표는 그림이라 여기에 두고,
// 노드를 눌렀을 때 나오는 설명은 src/data/flows.ts에 있습니다.
import { Fragment } from 'react';
import { sequoraFlow } from '../data/flows';
import { sequora } from '../data/projects';
import { FlowPanel, FlowTop, useFlow } from './Flow';

type Kind = 'normal' | 'ai' | 'wait';

interface GraphNode {
  key: string;
  label: string;
  code: string;
  kind: Kind;
  x: number;
  y: number;
}

const W = 112;
const H = 50;

const NODES: GraphNode[] = [
  { key: 'receive', label: '요청 접수', code: 'receive', kind: 'normal', x: 50, y: 150 },
  { key: 'interpret', label: '요청 해석', code: 'interpret', kind: 'ai', x: 182, y: 150 },
  { key: 'lookup', label: '데이터 조회', code: 'lookup', kind: 'normal', x: 314, y: 150 },
  { key: 'draft', label: '실행 설정 생성', code: 'draft', kind: 'normal', x: 446, y: 150 },
  { key: 'validate', label: '규칙 검사', code: 'validate', kind: 'ai', x: 578, y: 150 },
  { key: 'approve', label: '사람 승인', code: 'approve', kind: 'wait', x: 710, y: 150 },
  { key: 'submit', label: '실행 제출', code: 'submit', kind: 'normal', x: 842, y: 150 },
  { key: 'inspect', label: '상태 확인', code: 'inspect', kind: 'normal', x: 974, y: 150 },
  { key: 'record', label: '기록', code: 'record', kind: 'normal', x: 1106, y: 150 },
  { key: 'clarify', label: '되묻기', code: 'clarify', kind: 'wait', x: 248, y: 30 },
  { key: 'waitexec', label: '실행 대기', code: 'wait_execution', kind: 'wait', x: 974, y: 30 },
  { key: 'manual', label: '사람 검토', code: 'manual_review', kind: 'wait', x: 578, y: 270 },
  { key: 'diagnose', label: '오류 진단', code: 'diagnose', kind: 'normal', x: 908, y: 270 },
];

const KIND_LABEL: Record<Kind, string> = { normal: '', ai: ' (AI)', wait: ' (사람 응답 대기)' };

type Anchor = 'start' | 'middle' | 'end';

/** 화살표(edge). both가 true면 양쪽 화살표, label이 있으면 화살표 바로 뒤에 글자를 그립니다. */
const EDGES: { d: string; both?: boolean; label?: { x: number; y: number; anchor: Anchor; text: string } }[] = [
  { d: 'M29 175 L50 175' },
  { d: 'M162 175 L182 175' },
  { d: 'M294 175 L314 175' },
  { d: 'M426 175 L446 175' },
  { d: 'M558 175 L578 175' },
  { d: 'M690 175 L710 175' },
  { d: 'M822 175 L842 175' },
  { d: 'M954 175 L974 175' },
  { d: 'M1086 175 L1106 175' },
  { d: 'M1218 175 L1234 175' },
  { d: 'M222 200 C212 245, 266 245, 256 200', label: { x: 239, y: 258, anchor: 'middle', text: '형식 오류 재시도' } },
  { d: 'M232 150 C232 115, 262 100, 272 80', both: true, label: { x: 222, y: 112, anchor: 'end', text: '빠진 정보' } },
  { d: 'M352 150 C352 115, 338 100, 330 80', label: { x: 360, y: 112, anchor: 'start', text: '후보 불명확' } },
  { d: 'M598 200 C590 232, 560 232, 548 200', label: { x: 573, y: 246, anchor: 'middle', text: '위반 → 재생성' } },
  { d: 'M650 200 L650 270', label: { x: 656, y: 240, anchor: 'start', text: '같은 위반 3회' } },
  { d: 'M578 300 C520 300, 505 260, 500 200' },
  { d: 'M766 200 C760 400, 500 400, 480 200', label: { x: 760, y: 340, anchor: 'start', text: '수정 요청' } },
  { d: 'M930 320 C900 440, 480 440, 462 200', label: { x: 691, y: 412, anchor: 'middle', text: '재시도' } },
  { d: 'M898 200 L935 270', label: { x: 910, y: 242, anchor: 'end', text: '실패' } },
  { d: 'M1010 200 L992 270', label: { x: 1008, y: 242, anchor: 'start', text: '실패' } },
  { d: 'M1030 150 L1030 80', both: true, label: { x: 1036, y: 118, anchor: 'start', text: '진행 중' } },
];

const PANEL_ID = 'seq-panel';

export function SequoraGraph() {
  const { active, svgProps } = useFlow('interpret', PANEL_ID);
  const { title, hint } = sequora.part1.flow;

  return (
    <div className="flow" role="group" aria-label="SEQUORA LangGraph 처리 흐름">
      <FlowTop
        title={title}
        hint={hint}
        legend={
          <>
            <span><i className="lg-ai"></i>AI 해석·규칙 검사</span>
            <span><i className="lg-wait"></i>사람 응답 대기</span>
            <span><i className="lg-ev"></i>Part 2 평가 범위</span>
          </>
        }
      />
      <div className="gwrap">
        <svg className="gsvg" viewBox="0 0 1260 430" role="group" aria-label="SEQUORA LangGraph 처리 흐름 그래프">
          <defs>
            <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="#5a6068" />
            </marker>
          </defs>
          <rect className="band" x="172" y="138" width="264" height="74" rx="10" />
          <text className="bandl" x="430" y="230" textAnchor="end">Part 2 평가 범위</text>
          <circle cx="22" cy="175" r="7" fill="#0e0f11" />
          <circle cx="1243" cy="175" r="8" fill="none" stroke="#0e0f11" strokeWidth="2" />
          <circle cx="1243" cy="175" r="4" fill="#0e0f11" />

          {EDGES.map((e) => (
            <Fragment key={e.d}>
              <path className="e" d={e.d} markerStart={e.both ? 'url(#ah)' : undefined} markerEnd="url(#ah)" />
              {e.label && (
                <text className="el" x={e.label.x} y={e.label.y} textAnchor={e.label.anchor}>{e.label.text}</text>
              )}
            </Fragment>
          ))}

          {NODES.map((n) => (
            <g
              key={n.key}
              className={n.kind === 'normal' ? 'gn' : `gn ${n.kind}`}
              aria-label={`${n.label}${KIND_LABEL[n.kind]} 설명 보기`}
              {...svgProps(n.key)}
            >
              <rect x={n.x} y={n.y} width={W} height={H} rx="10" />
              <text className="t" x={n.x + W / 2} y={n.y + 22} textAnchor="middle">{n.label}</text>
              <text className="s" x={n.x + W / 2} y={n.y + 38} textAnchor="middle">{n.code}</text>
            </g>
          ))}
        </svg>
      </div>
      <FlowPanel id={PANEL_ID} data={sequoraFlow} active={active} />
    </div>
  );
}
