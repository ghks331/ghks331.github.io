// Other Projects: Drone, Ulleung (큰 카드) + 작은 카드들
import { drone, othersIntro, smallProjects, ulleung } from '../data/others';
import { Chips, Frame } from './common';

function DroneCard() {
  return (
    <div className="oc feature" id={drone.id}>
      <Frame img={drone.img} />
      <div>
        <h3>{drone.title}</h3>
        <div className="m">{drone.meta}</div>
        <Chips items={drone.chips} />
        <p className="fd">{drone.desc}</p>
        <ul>
          {drone.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <p className="note">{drone.note}</p>
      </div>
    </div>
  );
}

function UlleungCard() {
  const { dashboard } = ulleung;
  return (
    <div className="oc feature" id={ulleung.id}>
      <div>
        <h3>{ulleung.title}</h3>
        <div className="m">{ulleung.meta}</div>
        <Chips items={ulleung.chips} />
        <p className="fd">{ulleung.desc}</p>
        <ol className="vsteps">
          {ulleung.steps.map((s) => (
            <li key={s.title}>
              <b>{s.title}</b>
              <span>{s.desc}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="vres">
        <b>{dashboard.title}</b>
        <ul>
          {dashboard.items.map((it) => (
            <li key={it.label}>
              <em>{it.label}</em>
              {it.text}
            </li>
          ))}
        </ul>
        <p className="note">{dashboard.note}</p>
      </div>
    </div>
  );
}

export function Others() {
  return (
    <section id="others" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="wrap">
        <p className="eyebrow">{othersIntro.eyebrow}</p>
        <p className="statement">{othersIntro.statement}</p>
        <DroneCard />
        <UlleungCard />
        <div className="others">
          {smallProjects.map((p) => (
            <div className={p.wide ? 'oc wide' : 'oc'} key={p.title}>
              <div className="badge" aria-hidden="true">{p.badge}</div>
              <h3>{p.title}</h3>
              <div className="m">{p.meta}</div>
              <Chips items={p.chips} />
              <ul>
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
