// 노드를 누르면 아래 패널에 설명이 나오는 그래프의 공통 부분입니다.
import { useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import type { FlowData } from '../types';

/**
 * 지금 선택된 노드를 기억하고, 각 노드에 붙일 속성을 만들어 줍니다.
 * - <button>은 Enter·Space를 브라우저가 알아서 클릭으로 바꿔 줍니다.
 * - SVG의 <g>는 버튼이 아니라서 Enter·Space를 직접 처리합니다.
 */
export function useFlow(start: string, panelId: string) {
  const [active, setActive] = useState(start);

  function buttonProps(key: string) {
    return {
      type: 'button' as const,
      'aria-pressed': active === key,
      'aria-controls': panelId,
      onClick: () => setActive(key),
    };
  }

  function svgProps(key: string) {
    return {
      tabIndex: 0,
      role: 'button',
      'aria-pressed': active === key,
      'aria-controls': panelId,
      onClick: () => setActive(key),
      onKeyDown: (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActive(key);
        }
      },
    };
  }

  return { active, buttonProps, svgProps };
}

export function FlowPanel({ id, data, active }: { id: string; data: FlowData; active: string }) {
  const d = data[active];
  return (
    <div className="flow-panel" id={id} aria-live="polite">
      {d && (
        <>
          <h4>{d.title}</h4>
          <p>{d.desc}</p>
          {d.branches && (
            <ul>
              {d.branches.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          {d.note && <p className="who">{d.note}</p>}
        </>
      )}
    </div>
  );
}

/** 그래프 상자 위쪽: LangGraph 태그 + 제목, 안내 문구, 범례 */
export function FlowTop({ title, hint, legend }: { title: string; hint: string; legend: ReactNode }) {
  return (
    <div className="flow-top">
      <p className="ftitle">
        <span className="lgtag">LangGraph</span>
        {title}
      </p>
      <p className="hint">{hint}</p>
      <div className="legend" aria-hidden="true">
        {legend}
      </div>
    </div>
  );
}
