// Projects 목록 카드 + 프로젝트 상세 두 개
import { projectCards, sequora, webAccess } from '../data/projects';
import type { ProjectHead } from '../data/projects';
import { BarChart } from './BarChart';
import { CmpTable, Frame, ItemBox, MetaList, PartHeader, Steps } from './common';
import { SequoraGraph } from './SequoraGraph';
import { WebGraph } from './WebGraph';

export function ProjectIndex() {
  return (
    <section id="projects" style={{ paddingBottom: 40 }}>
      <div className="wrap">
        <p className="eyebrow">Projects</p>
        <p className="statement">주요 프로젝트 {projectCards.length}개</p>
        <div className="pindex">
          {projectCards.map((p) => (
            <a className="pc" href={`#${p.id}`} key={p.id}>
              <div className="top">
                <span>{p.no}</span>
                <span>{p.period}</span>
              </div>
              <div className="thumb">
                <img src={p.thumb} alt="" loading="lazy" />
              </div>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
              <span className="go">자세히 보기 →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 프로젝트 상세 위쪽: 기간, 수상, 제목, 표, 한 줄 소개 */
function ProjectHeader({ head }: { head: ProjectHead }) {
  return (
    <>
      <p className="eyebrow">{head.eyebrow}</p>
      {head.award && <span className="award">{head.award}</span>}
      <h2 id={`${head.id}-t`}>{head.title}</h2>
      <MetaList items={head.meta} />
      <div className="lead2">
        <p className="statement">{head.lead.statement}</p>
        <p>{head.lead.text}</p>
      </div>
    </>
  );
}

export function SequoraProject() {
  const { head, part1, part2, part3 } = sequora;
  return (
    <article className="project" id={head.id} aria-labelledby={`${head.id}-t`}>
      <div className="wrap">
        <ProjectHeader head={head} />

        <div className="part full">
          <PartHeader head={part1.head} />
          <div>
            <SequoraGraph />
            <div className="items three mt">
              {part1.items.map((it) => (
                <ItemBox item={it} key={it.title} />
              ))}
            </div>
          </div>
        </div>

        <div className="part">
          <PartHeader head={part2.head} />
          <div>
            <Steps steps={part2.steps} />
            <div className="charts single mt">
              <BarChart chart={part2.chart} />
            </div>
            <p className="note">{part2.note}</p>
          </div>
        </div>

        <div className="part">
          <PartHeader head={part3.head} />
          <div>
            <Steps steps={part3.steps} />
            <div className="charts single mt">
              <BarChart chart={part3.chart} />
            </div>
            <ItemBox item={part3.extra} className="it mt" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function WebAccessProject() {
  const { head, pipeline, part1, part2, part3 } = webAccess;
  return (
    <article className="project" id={head.id} aria-labelledby={`${head.id}-t`}>
      <div className="wrap">
        <ProjectHeader head={head} />
        <Frame img={pipeline.img} />
        <div className="cap"><span>{pipeline.caption}</span></div>

        <div className="part" style={{ marginTop: 56 }}>
          <PartHeader head={part1.head} />
          <div>
            <Steps steps={part1.steps} />
            <div className="two mt" style={{ gap: 28, alignItems: 'start' }}>
              <figure style={{ margin: 0 }}>
                <Frame img={part1.labeling.img} />
                <figcaption className="cap"><span>{part1.labeling.caption}</span></figcaption>
              </figure>
              <CmpTable table={part1.table} />
            </div>
          </div>
        </div>

        <div className="part">
          <PartHeader head={part2.head} />
          <div>
            <div className="two" style={{ gap: 28, alignItems: 'start' }}>
              <Steps steps={part2.steps} />
              <WebGraph />
            </div>
            <ItemBox item={part2.why} className="it mt">
              <CmpTable table={part2.table} className="cmp mt" />
            </ItemBox>
          </div>
        </div>

        <div className="part">
          <PartHeader head={part3.head} />
          <div>
            <div className="charts">
              {part3.charts.map((c) => (
                <BarChart chart={c} key={c.caption} />
              ))}
            </div>
            <p className="note">{part3.note}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
