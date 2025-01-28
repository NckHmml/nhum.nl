import { observer } from "mobx-react";
import { instance as kanaStore } from "../redux/kana";
import KanaItem from "../redux/kanaItem";
import Checkbox from "./checkbox";
import I18N from "./i18n";

const KanaCell: React.FC<{ item: KanaItem }> = observer(({ item }) => {
  const { kana, romaji } = item;

  let font = "TakaoPMincho";
  switch (kanaStore.font) {
    case "gothic":
      font = "TakaoPGothic";
      break;
    case "sans-serif":
      font = "sans-serif";
      break;
  }

  if (kanaStore.reverse)
    font = "inherit";

  return (
    <>
      <style jsx>{`
        div {
          font-family: ${font};
          display: inline-block;
          height: 1.2em;
          width: 1.2em;
          background-color: var(--color-background);
          padding: .2em;
          margin: .2em;
          border-radius: .2em;
          text-align: center;
          align-content: center;
          vertical-align: middle;
        }

        span {
          width: 100%;
        }

        span:after {
          content: "${kanaStore.reverse ? romaji : kana}";
        }

        div:hover span:after {
          content: "${kanaStore.reverse ? kana : romaji}";
        }
      `}</style>
      <div><span></span></div>
    </>
  );
});

const KanaSelection: React.FC<{ items: Array<KanaItem> }> = observer(({ items }) => {
  const options = items.map(item => <KanaCell key={item.kana} item={item} />);
  const allSelected = items.every(x => x.selected);

  const toggle = () => {
    for (const kana of items) kana.selected = !kana.selected;
  };

  return (
    <div className="root">
      <style jsx>{`
        .root {
          position: relative;
        }

        .checkbox {
          display: inline-block;
          position: absolute;
          margin: auto;
          height: 1em;
          margin: .4em auto;
          right: 0;
        }
      `}</style>
      {options}
      <div className="checkbox">
        <Checkbox checked={allSelected} onClick={toggle}><I18N>kana.add</I18N></Checkbox>
      </div>
    </div>
  );
});

export default KanaSelection;