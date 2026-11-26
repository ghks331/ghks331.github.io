// 여러 섹션에서 같이 쓰는 작은 화면 조각들입니다.
import type { CSSProperties, ReactNode } from 'react';
import type { Img, Item, MetaItem, PartHead, Step, Table } from '../types';

export function Chips({ items }: { items: string[] }) {
  return (
    <div className="chips">
      {items.map((c) => (
        <span className="chip" key={c}>{c}</span>
      ))}
    </div>
  );
}

/** 프로젝트 상단 표 (구분 · 역할 · 기술 …) */
export function MetaList({ items }: { items: MetaItem[] }) {
  return (
    <dl className="meta">
      {items.map((m) => (
        <div key={m.label}>
          <dt>{m.label}</dt>
          <dd>{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Part 왼쪽 머리말 (Part 1 · 제목 · 설명) */
export function PartHeader({ head }: { head: PartHead }) {
  return (
    <div className="ph">
      <span className="no">{head.no}</span>
      <h3>{head.title}</h3>
      <p>{head.desc}</p>
    </div>
  );
}

/** 번호가 자동으로 붙는 단계 목록 */
export function Steps({ steps }: { steps: Step[] }) {
  return (
    <ol className="steps">
      {steps.map((s) => (
        <li key={s.title}>
          <div>
            <b>
              {s.title}
              {s.ver && <span className="ver">{s.ver}</span>}
            </b>
            {s.lines.map((l, i) => (
              <p key={i}>
                {l.label && <em>{l.label}</em>}
                {l.text}
              </p>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** 소제목 + 설명 한 칸 */
export function ItemBox({ item, className = 'it', children }: { item: Item; className?: string; children?: ReactNode }) {
  return (
    <div className={className}>
      <b>{item.title}</b>
      <p>{item.desc}</p>
      {children}
    </div>
  );
}

/** 테두리가 있는 이미지 액자 */
export function Frame({ img, style }: { img: Img; style?: CSSProperties }) {
  return (
    <div className="frame" style={style}>
      <div className="in">
        <img src={img.src} alt={img.alt} loading="lazy" width={img.width} height={img.height} />
      </div>
    </div>
  );
}

/** 비교 표 */
export function CmpTable({ table, className = 'cmp' }: { table: Table; className?: string }) {
  return (
    <table className={className}>
      {table.caption && <caption className="sr">{table.caption}</caption>}
      <thead>
        <tr>
          {table.head.map((h) => (
            <th scope="col" key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((r) => (
          <tr key={r.cells[0]} className={r.pick ? 'pick' : undefined}>
            {r.cells.map((c, i) =>
              table.rowHeader && i === 0 ? (
                <th scope="row" key={i}>{c}</th>
              ) : (
                <td key={i}>{c}</td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
