// 화면 조각(컴포넌트)을 위에서 아래 순서대로 조립합니다.
import { About } from './components/About';
import { Contact, Footer, Hero, Nav } from './components/Layout';
import { Others } from './components/Others';
import { ProjectIndex, SequoraProject, WebAccessProject } from './components/Projects';

export default function App() {
  return (
    <>
      <a className="skip" href="#main">본문 바로가기</a>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <ProjectIndex />
        <SequoraProject />
        <WebAccessProject />
        <Others />
      </main>
      <Contact />
      <Footer />
    </>
  );
}
