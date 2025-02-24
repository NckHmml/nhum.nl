import { observer } from "mobx-react";
import { useNavigate } from "react-router";

import Checkbox from "~/components/checkbox";
import I18N from "~/components/i18n";
import KanaSelection from "~/components/kanaSelection";

import { instance as kanaStore } from "~/redux/kana";

const KanaField: React.FC = observer(() => {
  const navigate = useNavigate();

  const allHiraganaBlocks = kanaStore.allHiragana.map((agr, i) => (<KanaSelection key={`h${i}`} items={agr} />));
  const allKatakanaBlocks = kanaStore.allKatakana.map((agr, i) => (<KanaSelection key={`k${i}`} items={agr} />));

  const onStart = () => {
    if (!kanaStore.canTest)
      return;
    kanaStore.initTest();
    navigate("/kana/test");
    umami?.track("kana", {
      font: kanaStore.font,
      repeat: kanaStore.repeat,
      reverse: kanaStore.reverse,
      count: kanaStore.test.length,
    });
  };

  return (
    <div className="root" data-testid="c-kanafield">
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
          font-size: var(--size-h3);
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

        .settings .pure-form input {
          display: initial;
        }

        .pure-form {
          font-size: 16px;
        }

        .pure-form input[type="number"] {
          width: 4em;
        }
      `}</style>

      <div className="double">
        <h2><I18N>kana.hiragana</I18N></h2>
        <div className="checkbox" data-testid="add-hiragana">
          <Checkbox
            checked={kanaStore.allHiraganaSelected}
            onClick={() => kanaStore.toggleAll(kanaStore.allHiragana, !kanaStore.allHiraganaSelected)}
          ><I18N>kana.addAll</I18N></Checkbox>
        </div>
      </div>
      {allHiraganaBlocks}
      <div className="double">
        <h2><I18N>kana.katakana</I18N></h2>
        <div className="checkbox" data-testid="add-katakana">
          <Checkbox
            checked={kanaStore.allKatakanaSelected}
            onClick={() => kanaStore.toggleAll(kanaStore.allKatakana, !kanaStore.allKatakanaSelected)}
          ><I18N>kana.addAll</I18N></Checkbox>
        </div>
      </div>
      {allKatakanaBlocks}
      <div className="double">
        <h2><I18N>kana.other</I18N></h2>
      </div>
      <div className="settings">
        <div>

          <label><I18N>kana.repeat</I18N></label>
          <div className="pure-form">
            <input
              data-testid="kana-repeat"
              type="number"
              min={1}
              value={kanaStore.repeat}
              onChange={(event) => kanaStore.repeat = Number(event.target.value)}
            />
          </div>

          <label><I18N>kana.font</I18N></label>
          <div className="pure-form">
            <select
              onChange={(event) => kanaStore.font = event.target.value}
              value={kanaStore.font}
            >
              <option value="default">default</option>
              <option value="gothic">gothic</option>
              <option value="sans-serif">sans-serif</option>
              <option value="random">random</option>
            </select>
          </div>

          <label><I18N>kana.reverse</I18N></label>
          <div className="checkbox">
            <Checkbox checked={kanaStore.reverse} onClick={() => kanaStore.reverse = !kanaStore.reverse} />
          </div>

          <button
            data-testid="kana-start"
            className="pure-button button-primary"
            disabled={!kanaStore.canTest}
            onClick={onStart}
          ><I18N>kana.start</I18N></button>
        </div>
      </div>
    </div>
  );
});

export default KanaField;