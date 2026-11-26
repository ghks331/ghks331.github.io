import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Bar, Chart } from '../types';

/**
 * 화면에 35% 이상 보이면 true가 됩니다. (한 번 true가 되면 그대로 유지)
 * 막대가 0에서 차오르는 애니메이션에 씁니다.
 */
function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}

function BarRow({ bar, wide }: { bar: Bar; wide?: boolean }) {
  // CSS의 width: calc(var(--v) * 1%) 가 이 값을 읽어 막대 길이를 정합니다.
  const style = { '--v': bar.percent } as CSSProperties;
  return (
    <div className={wide ? 'brow wide' : 'brow'}>
      <span className="lab">{bar.label}</span>
      <div className="track" aria-hidden="true">
        <div className={bar.after ? 'bar after' : 'bar'} style={style}></div>
      </div>
      <span className="val">{bar.value}</span>
    </div>
  );
}

export function BarChart({ chart }: { chart: Chart }) {
  const { ref, inView } = useInView<HTMLElement>();
  // 묶음에 제목이 있으면(모델별 비교처럼) 묶음마다 제목을 달아 세로로 쌓습니다.
  const grouped = chart.groups.some((g) => g.title);

  return (
    <figure className={inView ? 'chart in' : 'chart'} ref={ref}>
      <figcaption>{chart.caption}</figcaption>
      {grouped ? (
        <div className="f1grid">
          {chart.groups.map((g) => (
            <div className="f1" key={g.title}>
              <span className="m">{g.title}</span>
              {g.bars.map((b) => (
                <BarRow bar={b} wide={chart.wide} key={b.label} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        chart.groups[0].bars.map((b) => <BarRow bar={b} wide={chart.wide} key={b.label} />)
      )}
      {chart.delta && (
        <p className="delta">
          {chart.delta.value}
          <small>{chart.delta.note}</small>
        </p>
      )}
    </figure>
  );
}
