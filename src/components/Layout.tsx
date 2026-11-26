// 맨 위 메뉴, 첫 화면(Hero), 연락처, 푸터
import { profile } from '../data/profile';

export function Nav() {
  return (
    <nav aria-label="주요 메뉴">
      <div className="wrap">
        <a className="logo" href="#top" aria-label="이주환 포트폴리오 맨 위로">
          <span className="mk" aria-hidden="true">JH</span>
          <span className="tx">Juhwan<br />Lee</span>
        </a>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li className="hide-sm"><a href="#others">Others</a></li>
          <li className="nav-cta"><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

export function Hero() {
  const { hero, email } = profile;
  return (
    <header className="hero" id="top">
      <div className="wrap">
        <p className="hero-eyebrow">{hero.eyebrow}</p>
        <h1>
          <span>{hero.title}</span>
          <span className="sub">{hero.sub}</span>
        </h1>
        <p className="hero-sub">
          {hero.lines[0]}
          <br />
          {hero.lines[1]}
        </p>
        <div className="btns">
          <a className="pill green" href="#projects">프로젝트 보기</a>
          <a className="pill ghost-d" href={`mailto:${email}`}>Email</a>
        </div>
      </div>
    </header>
  );
}

export function Contact() {
  const { email, contact } = profile;
  return (
    <section className="cta" id="contact">
      <div className="wrap">
        <div className="badge" aria-hidden="true">@</div>
        <h2>Contact</h2>
        <p>{contact.line}</p>
        <div className="btns">
          <a className="pill green" href={`mailto:${email}`}>{email}</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { footer } = profile;
  return (
    <footer>
      <div className="wrap">
        <span>{footer.copyright}</span>
        <span>{footer.note}</span>
      </div>
    </footer>
  );
}
