import { observer } from "mobx-react";
import { instance as kanaStore } from "../redux/kana";
import Checkbox from "./checkbox";
import KanaSelection from "./kanaSelection";

const KanaField: React.FC = observer(() => {

  const { allHiragana, allKatakana, toggleAll } = kanaStore;
  const allHiraganaBlocks = allHiragana.map((agr, i) => (<KanaSelection key={`h${i}`} items={agr} />));
  const allKatananaBlocks = allKatakana.map((agr, i) => (<KanaSelection key={`k${i}`} items={agr} />));

  return (
    <div className="root">
      <style jsx>{`
        .root {
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 1em;
        }

        .double {
          grid-column: 1/3;
          position: relative;
        }

        @media screen and (max-width: 600px) {
          .root {
            grid-template-columns: 1fr;
          }

          .double {
            grid-column: 1;
          }
        }

        .double .checkbox {
          font-size: 1.2em;
          display: inline-block;
          position: absolute;
          margin: auto;
          height: 1em;
          right: 0;
          top: -100%;
          bottom: -100%;
        }

        .settings {
          font-size: var(--size-h3);
        }

        .settings > div {
          display: grid;
          grid-template-columns: auto auto;
          grid-auto-rows: 2em;
          row-gap: 4px;
          align-items: center;
        }

        .settings .pure-form,
        .settings .checkbox {
          text-align: right;
        }

        .pure-form {
          font-size: 16px;
        }

        .pure-form input[type="number"] {
          width: 4em;
        }
      `}</style>

      <div className="double">
        <h2>Hiragana</h2>
        <div className="checkbox">
          <Checkbox
            checked={kanaStore.allHiraganaSelected}
            onClick={() => toggleAll(allHiragana, !kanaStore.allHiraganaSelected)}
          >add all</Checkbox>
        </div>
      </div>
      {allHiraganaBlocks}
      <div className="double">
        <h2>Katakana</h2>
        <div className="checkbox">
          <Checkbox
            checked={kanaStore.allKatakanaSelected}
            onClick={() => toggleAll(allKatakana, !kanaStore.allKatakanaSelected)}
          >add all</Checkbox>
        </div>
      </div>
      {allKatananaBlocks}
      <div className="double">
        <h2>Other settings</h2>
      </div>
      <div className="settings">
        <div>

          <label>repeat</label>
          <div className="pure-form">
            <input type="number" defaultValue={0} min={0} />
          </div>

          <label>font</label>
          <div className="pure-form">
            <select 
              onChange={(event) => kanaStore.font = event.target.value}
              value={kanaStore.font}
            >
              <option value="default">default</option>
              <option value="random">random</option>
              <option value="gothic">gothic</option>
              <option value="sans-serif">sans-serif</option>
            </select>
          </div>

          <label>reverse mode</label>
          <div className="checkbox">
            <Checkbox checked={kanaStore.reverse} onClick={() => kanaStore.reverse = !kanaStore.reverse} />
          </div>

          <button className="pure-button button-primary">Start</button>
        </div>
      </div>
    </div>
  );
});

export default KanaField;