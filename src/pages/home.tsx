import { Link } from "react-router";

import I18N from "~/components/i18n";

const Home: React.FC = () => {
  return (
    <>
      <style jsx>{`
        article {
          display: grid;
          grid-template-columns: 1fr 12em;
          padding-bottom: 1em;
          border-bottom: 2px dotted var(--color-border);
        }

        article > div {
          display: flex;
          align-items: center;
        }

        article > figure {
          margin: auto;
        }

        article > figure > img {
          width: 12em;
          border-radius: 1em;
          box-shadow: .5em .5em .5em var(--color-shadow);
        }

        article h1, article h2 {
          margin: 0;
          text-transform: uppercase;
        }

        article h2 {
          font-weight: 300;
        }

        /* 600px is the min where Dutch still looks reasonable */
        @media screen and (max-width: 600px) {
          article {
            grid-template-columns: 1fr;
          }

          article h1, article h2 {
            text-align: center;
          }

          article div > span {
            width: 100%;
          }
        }

        .experience p {
          font-size: var(--size-h3);
        }

        .links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          text-align: center;
          font-size: var(--size-h2);
          gap: 10px;
        }

        @media screen and (max-width: 600px) {
          .links {
            grid-template-columns: 1fr;
            text-align: left;
          }
        }
      `}</style>

      <article>
        <div>
          <span>
            <h2><I18N>home.greeting</I18N></h2>
            <h1><I18N>home.name</I18N></h1>
          </span>
        </div>
        <figure>
          <img src="/assets/2019_11_07-25.jpg" />
        </figure>
      </article>

      <div className="experience">
        <h2><I18N>home.intro</I18N></h2>
        <p><I18N>home.description</I18N></p>
      </div>

      <h2><I18N>home.explore</I18N></h2>
      <div className="links">
        <Link to="/sudoku">&gt;&nbsp;<I18N>nav.sudoku</I18N></Link>
        <Link to="/kana">&gt;&nbsp;<I18N>nav.kana</I18N></Link>
        <Link to="/concepts">&gt;&nbsp;<I18N>nav.concepts</I18N></Link>
      </div>
    </>
  );
};

export default Home;