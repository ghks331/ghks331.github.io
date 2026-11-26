// Who I am: 소개, 학력, 경력, 스킬, 자격증
import { certificates, experiences, profile, skills } from '../data/profile';
import { Chips } from './common';

export function About() {
  const { about, education } = profile;
  return (
    <section className="hl" id="about" aria-labelledby="hl-title">
      <div className="wrap">
        <p className="eyebrow">Who I am</p>
        <div className="intro">
          <p className="statement" id="hl-title">{about.statement}</p>
          <div className="intro-body">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="edu">
          <b>{education.school}</b>
          <span>{education.detail}</span>
        </div>
        <div className="k exp">
          <h3>Experience</h3>
          <table className="xpt">
            <tbody>
              {experiences.map((x) => (
                <tr key={x.title}>
                  <td className="w">{x.when}</td>
                  <th scope="row">{x.title}</th>
                  <td>{x.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="kit">
          <div className="k">
            <h3>Skills</h3>
            <Chips items={skills} />
          </div>
          <div className="k">
            <h3>Certificates</h3>
            <Chips items={certificates} />
          </div>
        </div>
      </div>
    </section>
  );
}
