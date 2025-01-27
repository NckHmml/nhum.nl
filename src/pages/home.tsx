import I18N from "../components/i18n";


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

        .experience table {
          width: 100%;
          border-collapse: collapse;
        }

        .experience table thead {
          font-weight: 500;
        }

        .experience table tbody tr > td {
          border-top: 1px solid var(--color-border);
          padding: 5px;
          box-sizing: border-box;
        }

        .experience table tbody td:nth-child(3) {
          font-size: var(--size-h5);
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

      <div className="experience pagebreak">
        <h2><I18N>home.experience</I18N></h2>
        <table>
          <thead>
            <tr><td></td>
              <td>Professional</td>
              <td>Total<sup>*</sup></td></tr>
          </thead>
          <tbody>
            <tr>
              <td>Java</td>
              <td><I18N withHtml options={{ count: 7 }}>home.yearWithPlus</I18N></td>
              <td><I18N withHtml options={{ count: 17 }}>home.yearWithPlus</I18N></td>
            </tr>
            <tr>
              <td>Java Spring</td>
              <td><I18N withHtml options={{ count: 6 }}>home.yearWithPlus</I18N></td>
              <td><I18N withHtml options={{ count: 6 }}>home.yearWithPlus</I18N></td>
            </tr>
            <tr>
              <td>JavaScript</td>
              <td><I18N withHtml options={{ count: 8 }}>home.yearWithPlus</I18N></td>
              <td><I18N withHtml options={{ count: 17 }}>home.yearWithPlus</I18N></td>
            </tr>
            <tr>
              <td>TypeScript</td>
              <td><I18N withHtml options={{ count: 7 }}>home.yearWithPlus</I18N></td>
              <td><I18N withHtml options={{ count: 7 }}>home.yearWithPlus</I18N></td>
            </tr>
            <tr>
              <td>React</td>
              <td><I18N withHtml options={{ count: 8 }}>home.yearWithPlus</I18N></td>
              <td><I18N withHtml options={{ count: 10 }}>home.yearWithPlus</I18N></td>
            </tr>
            <tr>
              <td>NodeJS</td>
              <td><I18N withHtml options={{ count: 8 }}>home.yearWithPlus</I18N></td>
              <td><I18N withHtml options={{ count: 10 }}>home.yearWithPlus</I18N></td>
            </tr>
            <tr>
              <td>AngularJS</td>
              <td><I18N withHtml options={{ count: 1 }}>home.year</I18N></td>
              <td><I18N withHtml options={{ count: 5 }}>home.year</I18N></td>
            </tr>
            <tr>
              <td>CSS (Less, SCSS)</td>
              <td><I18N withHtml options={{ count: 8 }}>home.yearWithPlus</I18N></td>
              <td><I18N withHtml options={{ count: 15 }}>home.yearWithPlus</I18N></td>
            </tr>
            <tr>
              <td>C# (.NET)</td>
              <td><I18N withHtml options={{ count: 4 }}>home.year</I18N></td>
              <td><I18N withHtml options={{ count: 8 }}>home.year</I18N></td>
            </tr>
            <tr>
              <td>VB Classic</td>
              <td><I18N withHtml options={{ count: 4 }}>home.year</I18N></td>
              <td><I18N withHtml options={{ count: 8 }}>home.year</I18N></td>
            </tr>
            <tr>
              <td>ASM x86</td>
              <td><I18N withHtml options={{ count: 0 }}>home.year</I18N></td>
              <td><I18N withHtml options={{ count: 3 }}>home.year</I18N></td>
            </tr>
            <tr>
              <td>PHP</td>
              <td><I18N withHtml options={{ count: 1 }}>home.year</I18N></td>
              <td><I18N withHtml options={{ count: 3 }}>home.year</I18N></td>
            </tr>
            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
            <tr>
              <td>AWS</td>
              <td><I18N withHtml options={{ count: 7 }}>home.year</I18N></td>
              <td><I18N withHtml options={{ count: 7 }}>home.year</I18N></td>
            </tr>
            <tr>
              <td>Azure</td>
              <td><I18N withHtml options={{ count: 1 }}>home.year</I18N></td>
              <td><I18N withHtml options={{ count: 4 }}>home.year</I18N></td>
            </tr>
          </tbody>
        </table>
        <p>
          <small><I18N>home.star</I18N></small><br />
          <small><I18N>home.plus</I18N></small><br />
          <small><I18N>home.more</I18N></small><br />
        </p>
      </div>
    </>
  );
};

export default Home;