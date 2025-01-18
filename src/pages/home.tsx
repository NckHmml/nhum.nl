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

        h1, h2 {
          margin: 0;
          text-transform: uppercase;
        }

        h2 {
          font-weight: 300;
        }

        .experience p {
          font-size: var(--size-h3);
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
        <p><I18N>home.description</I18N></p>
      </div>
    </>
  );
};

export default Home;