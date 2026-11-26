// 웹 접근성 LangGraph 그래프 (버튼으로 만든 세로 흐름)
import { webFlow } from '../data/flows';
import { webAccess } from '../data/projects';
import { FlowPanel, FlowTop, useFlow } from './Flow';

const PANEL_ID = 'web-panel';

export function WebGraph() {
  const { active, buttonProps } = useFlow('router', PANEL_ID);
  const { title, hint } = webAccess.part2.flow;

  return (
    <div className="flow" role="group" aria-label="웹 접근성 LangGraph 처리 흐름">
      <FlowTop
        title={title}
        hint={hint}
        legend={
          <>
            <span><i className="lg-ai"></i>AI 노드</span>
            <span><i></i>Judge</span>
          </>
        }
      />
      <div className="wgraph">
        <button className="node ai span" {...buttonProps('router')}>변환 유형 판단<small>router</small></button>
        <div className="ar" aria-hidden="true">↓ structure</div>
        <div className="ar" aria-hidden="true">↓ lec</div>
        <button className="node ai" {...buttonProps('list')}>목록·메뉴 구조 변환<small>node_list_transform</small></button>
        <button className="node ai" {...buttonProps('lec')}>강의 상세 변환<small>node_class_detail_transform</small></button>
        <div className="ar" aria-hidden="true">↓ 검사 · ↑ Retry</div>
        <div className="ar" aria-hidden="true">↓ 검사 · ↑ Retry</div>
        <button className="node judge" {...buttonProps('judge1')}>Judge<small>judge_1</small></button>
        <button className="node judge" {...buttonProps('judge2')}>Judge<small>lec_judge</small></button>
        <div className="ar span" aria-hidden="true">↓ Pass</div>
        <button className="node ai span" {...buttonProps('aria')}>접근성 마무리<small>node_add_aria</small></button>
        <div className="ar span" aria-hidden="true">↓ 검사 · ↑ Retry</div>
        <button className="node judge span" {...buttonProps('judge3')}>Judge<small>judge_3</small></button>
        <div className="ar span" aria-hidden="true">↓ Pass</div>
        <div className="wend span"><i aria-hidden="true"></i>종료 · none(토큰 1,000 미만 등)이면 바로 종료</div>
      </div>
      <FlowPanel id={PANEL_ID} data={webFlow} active={active} />
    </div>
  );
}
