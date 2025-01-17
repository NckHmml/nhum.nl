import { ChangeEvent, useState } from "react";
import { observer } from "mobx-react";
import { instance as kanaStore } from "../redux/kana";
import { classNames } from "../helper";
import KanaItem from "../redux/kanaItem";

const KanaTestField: React.FC = observer(() => {
  const [wrong, setWrong] = useState(new Array<string>());
  const [typed, setTyped] = useState("");
  const [random, setRandom] = useState(Math.floor(Math.random() * 3)); // Random index for font

  const { reverse, testItem, testOptions } = kanaStore;
  if (!testItem) return (
    <>
      <style jsx>{`
        h2 {
          text-align: center;
          color: var(--color-tertiary);
        }
      `}</style>
      <h2>Completed!</h2>
    </>
  );

  // Get a matching Kana for the user input
  const parsedType = kanaStore.allKana.find(x => {
    const matchType = x.isHiragana === testItem.isHiragana;
    const matchGroup = typed.length === 1 ? x.group === testItem.group : true;
    const matchChars = x.romaji === typed || x.kana === typed;

    return matchType && matchGroup && matchChars;
  })?.kana ?? "?";

  // Get a font based on settings
  let font = "TakaoPMincho";
  switch (kanaStore.font) {
    case "gothic":
      font = "TakaoPGothic";
      break;
    case "sans-serif":
      font = "sans-sarif";
      break;
    case "random":
      font = ["TakaoPMincho", "TakaoPGothic", "sans-sarif"][random];
      break;
  }

  const style = (
    <style jsx>{`
      .root {
        display: grid;
        grid-template-columns: 1fr 1fr;
        max-width: 300px;
        margin: auto;
        gap: 10px;
        padding: 10px;
      }

      .main,
      .kana {
        aspect-ratio: 1;
        text-align: center;
        border: 1px solid var(--color-border);
        align-content: center;
        font-size: 4em;
        box-sizing: border-box;
      }

      .kana {
        font-family: ${font};
      }

      .kana.invalid {
        border: 2px solid var(--color-secondary);
      }

      .kana.valid {
        border: 1px solid var(--color-tertiary);
      }

      .main,
      .pure-form {
        grid-column: 1/3;
      }

      .main {
        margin: 0 25%;
      }

      .reverse .kana {
        cursor: pointer;
      }

      .root .pure-form > input {
        width: 100%;
        border: 1px solid var(--color-border);
        border-radius: 0;
      }
    `}</style>
  );

  // Go to the next step function
  const goStep = () => {
    setRandom(Math.floor(Math.random() * 3));
    setTyped("");
    setWrong([]);
    kanaStore.step();
  };

  const clickKana = (item: KanaItem) => {
    if (item.kana === testItem.kana) {
      goStep();
    } else {
      setWrong([...wrong, item.kana]);
    }
  };

  const onType = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const isValid = testItem.romaji === newValue || testItem.kana === newValue;
    setTyped(newValue);
    if (isValid) 
      setTimeout(goStep, 300);
  };


  if (reverse) {
    const className1 = classNames({ "kana": true, "invalid": wrong.includes(testOptions[0].kana)});
    const className2 = classNames({ "kana": true, "invalid": wrong.includes(testOptions[1].kana)});
    const className3 = classNames({ "kana": true, "invalid": wrong.includes(testOptions[2].kana)});
    const className4 = classNames({ "kana": true, "invalid": wrong.includes(testOptions[3].kana)});

    return (
      <div className="root reverse">
        {style}
        <div className="main">{testItem.romaji}</div>
        <div className={className1} onClick={() => clickKana(testOptions[0])}>{testOptions[0].kana}</div>
        <div className={className2} onClick={() => clickKana(testOptions[1])}>{testOptions[1].kana}</div>
        <div className={className3} onClick={() => clickKana(testOptions[2])}>{testOptions[2].kana}</div>
        <div className={className4} onClick={() => clickKana(testOptions[3])}>{testOptions[3].kana}</div>
      </div>
    );
  } else {
    const isValid = testItem.romaji === typed || testItem.kana === typed;
    const kanaClassname = classNames({
      "kana": true,
      "invalid": parsedType !== "?" && testItem.romaji !== typed && testItem.kana !== typed,
      "valid": isValid,
    });
    return (
      <div className="root">
        {style}
        <div className={kanaClassname}>
          <span>{testItem.kana}</span>
        </div>
        <div className={kanaClassname}>
          <span>{parsedType}</span>
        </div>
        <div className="pure-form">
          <input
            value={typed}
            onChange={onType}
          />
        </div>
      </div>
    );
  }
});

export default KanaTestField;
