const Loader: React.FC = () => (
  <>
    <style jsx>{`
      .c-loader {
        display: flex;
        position: absolute;
        left: 0;
        top: 0;
        height: 100vh;
        width: 100vw;
        z-index: 999;
        align-items: center;
        justify-content: center;
        text-align: center;
        /* Animation to prevent the loader flashing on short loads */
        animation-name: show;
        animation-duration: 1s;
        opacity: 1;
      }

      @keyframes show {
        0% { opacity: 0 }
        50% { opacity: 0 }
        100% { opacity: 1 }
      }

      .c-loader--element {
        width: 50px;
        aspect-ratio: 1;
        border-radius: 50%;
        border: 8px solid;
        border-color: var(--color-primary) #0000;
        animation: turn 1s infinite;
        margin-bottom: 1em;
      }

      @keyframes turn {
        to { transform: rotate(.5turn) }
      }
    `}</style>
    <div className="c-loader">
      <div>
        <div className="c-loader--element"></div>
        <span>Loading</span>
      </div>
    </div>
  </>
);

export default Loader;