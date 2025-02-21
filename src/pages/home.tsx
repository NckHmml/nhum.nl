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
    </>
  );
};

export default Home;