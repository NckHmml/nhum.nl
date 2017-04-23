import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { Checkbox } from "../components/checkbox";
import { Kana } from "../models/kana";
import { IKanaTest } from "../models/kana.test";

interface IKanaIndexProps extends RouteComponentProps<void> {
  startTest: (settings: IKanaIndexState) => void;
}

interface IKanaIndexState extends IKanaTest
{ }

export class KanaIndex extends React.Component<IKanaIndexProps, IKanaIndexState> {
  public state: IKanaIndexState = {
    kana: KanaBuffer.slice(),
    reverse: false,
    repeat: 1,
    delay: 500
  };

  /**
   * Checks or unchecks all kana
   * @param checked check switch
   * @param hiragana katakana if false
   */
  private checkAllKana(checked: boolean, hiragana: boolean) {
    // Copy buffer
    const kana = this.state.kana.slice();
    // Try check
    kana.forEach(kana => {
      if (kana.hiragana === hiragana)
        kana.selected = checked;
    });
    // Update buffer
    this.setState({
      kana: kana
    });
  }

  /**
   * Checks or unchecks a certain kana group
   * @param group group to (un)check
   * @param checked check switch
   * @param hiragana katakana if false
   */
  private checkKana(group: number, checked: boolean, hiragana: boolean) {
    // Copy buffer
    const kana = this.state.kana.slice();
    // Try check
    kana.forEach(kana => {
      if (kana.group == group && kana.hiragana === hiragana)
        kana.selected = checked;
    });
    // Update buffer
    this.setState({
      kana: kana
    });
  }

  /**
   * Renders a group of kana
   * @param group group to render
   * @param hiragana katakana if false
   */
  private renderKanaGroup(group: number, hiragana: boolean) {
    const { reverse } = this.state;
    // Get all kana for current group
    const allKana = this.state.kana.filter(kana => kana.group === group && kana.hiragana === hiragana);
    // Check if selected
    const selected = allKana.some(kana => kana.selected);
    // Parse to html
    const kanaListItems = allKana.map(item => (
      <li key={item.kana}>
        <span>{reverse ? item.romaji : item.kana}</span>
        <span>{reverse ? item.kana : item.romaji}</span>
      </li>
    ));

    return (
      <div className="g-24 g-sm-12 kana-group" key={group}>
        <div className="kana-selection">
          <Checkbox
            defaultValue={selected}
            title="add"
            onChange={(checked) => this.checkKana(group, checked, hiragana)}
          />
          <ul>
            {kanaListItems}
          </ul>
        </div>
      </div>
    );
  }

  /**
   * Tries to start the test
   */
  private startTest() {
    const selected = this.state.kana.some(kana => kana.selected);
    if (!selected) {
      alert("Select some options first");
      return;
    }
    this.props.startTest(this.state);
  }

  /**
   * React render
   */
  public render() {
    // Check if all hiragana is selected
    const allHiraganaSelected = this.state.kana.every(kana => !kana.hiragana || kana.selected);
    // Check if all hiragana is selected
    const allKatakanaSelected = this.state.kana.every(kana => kana.hiragana || kana.selected);

    // Get all hiragana groups
    const hiraganaGroups = this.state.kana.reduce((buffer, kana) => {
      if (kana.hiragana && buffer.indexOf(kana.group) === -1)
        buffer.push(kana.group);
      return buffer;
    }, new Array<number>());

    // Get all katakana groups
    const katakanaGroups = this.state.kana.reduce((buffer, kana) => {
      if (!kana.hiragana && buffer.indexOf(kana.group) === -1)
        buffer.push(kana.group);
      return buffer;
    }, new Array<number>());

    return (
      <div>
        <section className="group">
          <div className="g-24">
            <h3>
              Hiragana sets
              <Checkbox
                defaultValue={allHiraganaSelected}
                title="add all"
                onChange={(checked) => this.checkAllKana(checked, true)}
              />
            </h3>
          </div>
          {hiraganaGroups.map(group => this.renderKanaGroup(group, true))}
        </section>
        <section className="group">
          <div className="g-24">
            <h3>
              Katakana sets
              <Checkbox
                defaultValue={allKatakanaSelected}
                title="add all"
                onChange={(checked) => this.checkAllKana(checked, false)}
              />
            </h3>
          </div>
          {katakanaGroups.map(group => this.renderKanaGroup(group, false))}
        </section>
        <section>
          <div className="g-24">
            <h3>Other settings</h3>
            <table className="kana-settings">
              <tbody>
                <tr>
                  <td>repeat</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={this.state.repeat}
                      onChange={(event) => this.setState({ repeat: parseInt(event.target.value) })}
                    />
                    <span>{this.state.repeat == 1 ? "time" : "times"}</span>
                  </td>
                </tr>
                <tr>
                  <td>delay between answers</td>
                  <td>
                    <input
                      type="number"
                      min="100"
                      max="2000"
                      step="100"
                      value={this.state.delay}
                      onChange={(event) => this.setState({ delay: parseInt(event.target.value) })}
                    />
                    <span>ms</span>
                  </td>
                </tr>
                <tr>
                  <td>reverse mode</td>
                  <td>
                    <Checkbox
                      defaultValue={this.state.reverse}
                      onChange={(checked) => this.setState({ reverse: checked })}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <footer className="group">
          <div className="g-24">
            <button
              className="kana-button button primary"
              onClick={() => this.startTest()}
            >
              Start
            </button>
          </div>
        </footer>
      </div>
    );
  }
}

const KanaBuffer: Array<Kana> = [
  /* Hiragana */
  // a e i o u
  new Kana("a", "あ", true, 0),
  new Kana("i", "い", true, 0),
  new Kana("u", "う", true, 0),
  new Kana("e", "え", true, 0),
  new Kana("o", "お", true, 0),
  // k
  new Kana("ka", "か", true, 1),
  new Kana("ki", "き", true, 1),
  new Kana("ku", "く", true, 1),
  new Kana("ke", "け", true, 1),
  new Kana("ko", "こ", true, 1),
  // g
  new Kana("ga", "が", true, 2),
  new Kana("gi", "ぎ", true, 2),
  new Kana("gu", "ぐ", true, 2),
  new Kana("ge", "げ", true, 2),
  new Kana("go", "ご", true, 2),
  // s
  new Kana("sa", "さ", true, 3),
  new Kana("shi", "し", true, 3),
  new Kana("su", "す", true, 3),
  new Kana("se", "せ", true, 3),
  new Kana("so", "そ", true, 3),
  // z
  new Kana("za", "ざ", true, 4),
  new Kana("ji", "じ", true, 4),
  new Kana("zu", "ず", true, 4),
  new Kana("ze", "ぜ", true, 4),
  new Kana("zo", "ぞ", true, 4),
  // t
  new Kana("ta", "た", true, 5),
  new Kana("chi", "ち", true, 5),
  new Kana("tsu", "つ", true, 5),
  new Kana("te", "て", true, 5),
  new Kana("to", "と", true, 5),
  // d
  new Kana("da", "だ", true, 6),
  new Kana("de", "で", true, 6),
  new Kana("do", "ど", true, 6),
  // n
  new Kana("na", "な", true, 7),
  new Kana("ni", "に", true, 7),
  new Kana("nu", "ぬ", true, 7),
  new Kana("ne", "ね", true, 7),
  new Kana("no", "の", true, 7),
  // h
  new Kana("ha", "は", true, 8),
  new Kana("hi", "ひ", true, 8),
  new Kana("fu", "ふ", true, 8),
  new Kana("he", "へ", true, 8),
  new Kana("ho", "ほ", true, 8),
  // b
  new Kana("ba", "ば", true, 9),
  new Kana("bi", "び", true, 9),
  new Kana("bu", "ぶ", true, 9),
  new Kana("be", "べ", true, 9),
  new Kana("bo", "ぼ", true, 9),
  // p
  new Kana("pa", "ぱ", true, 10),
  new Kana("pi", "ぴ", true, 10),
  new Kana("pu", "ぷ", true, 10),
  new Kana("pe", "ぺ", true, 10),
  new Kana("po", "ぽ", true, 10),
  // m
  new Kana("ma", "ま", true, 11),
  new Kana("mi", "み", true, 11),
  new Kana("mu", "む", true, 11),
  new Kana("me", "め", true, 11),
  new Kana("mo", "も", true, 11),
  // y
  new Kana("ya", "や", true, 12),
  new Kana("yu", "ゆ", true, 12),
  new Kana("yo", "よ", true, 12),
  // r
  new Kana("ra", "ら", true, 13),
  new Kana("ri", "り", true, 13),
  new Kana("ru", "る", true, 13),
  new Kana("re", "れ", true, 13),
  new Kana("ro", "ろ", true, 13),
  // w
  new Kana("wa", "わ", true, 14),
  new Kana("wo", "を", true, 14),
  // single n
  new Kana("n", "ん", true, 14),
  /* Katakana */
  // a e i o u
  new Kana("a", "ア", false, 0),
  new Kana("i", "イ", false, 0),
  new Kana("u", "ウ", false, 0),
  new Kana("e", "エ", false, 0),
  new Kana("o", "オ", false, 0),
  // k
  new Kana("ka", "カ", false, 1),
  new Kana("ki", "キ", false, 1),
  new Kana("ku", "ク", false, 1),
  new Kana("ke", "ケ", false, 1),
  new Kana("ko", "コ", false, 1),
  // g
  new Kana("ga", "ガ", false, 2),
  new Kana("gi", "ギ", false, 2),
  new Kana("gu", "グ", false, 2),
  new Kana("ge", "ゲ", false, 2),
  new Kana("go", "ゴ", false, 2),
  // s
  new Kana("sa", "サ", false, 3),
  new Kana("shi", "シ", false, 3),
  new Kana("su", "ス", false, 3),
  new Kana("se", "セ", false, 3),
  new Kana("so", "ソ", false, 3),
  // z
  new Kana("za", "ザ", false, 4),
  new Kana("ji", "ジ", false, 4),
  new Kana("zu", "ズ", false, 4),
  new Kana("ze", "ゼ", false, 4),
  new Kana("zo", "ゾ", false, 4),
  // t
  new Kana("ta", "タ", false, 5),
  new Kana("chi", "チ", false, 5),
  new Kana("tsu", "ツ", false, 5),
  new Kana("te", "テ", false, 5),
  new Kana("to", "ト", false, 5),
  // d
  new Kana("da", "ダ", false, 6),
  new Kana("de", "デ", false, 6),
  new Kana("do", "ド", false, 6),
  // n
  new Kana("na", "ナ", false, 7),
  new Kana("ni", "ニ", false, 7),
  new Kana("nu", "ヌ", false, 7),
  new Kana("ne", "ネ", false, 7),
  new Kana("no", "ノ", false, 7),
  // h
  new Kana("ha", "ハ", false, 8),
  new Kana("hi", "ヒ", false, 8),
  new Kana("fu", "フ", false, 8),
  new Kana("he", "ヘ", false, 8),
  new Kana("ho", "ホ", false, 8),
  // b
  new Kana("ba", "バ", false, 9),
  new Kana("bi", "ビ", false, 9),
  new Kana("bu", "ブ", false, 9),
  new Kana("be", "ベ", false, 9),
  new Kana("bo", "ボ", false, 9),
  // p
  new Kana("pa", "パ", false, 10),
  new Kana("pi", "ピ", false, 10),
  new Kana("pu", "プ", false, 10),
  new Kana("pe", "ペ", false, 10),
  new Kana("po", "ポ", false, 10),
  // m
  new Kana("ma", "マ", false, 11),
  new Kana("mi", "ミ", false, 11),
  new Kana("mu", "ム", false, 11),
  new Kana("me", "メ", false, 11),
  new Kana("mo", "モ", false, 11),
  // y
  new Kana("ya", "ヤ", false, 12),
  new Kana("yu", "ユ", false, 12),
  new Kana("yo", "ヨ", false, 12),
  // r
  new Kana("ra", "ラ", false, 13),
  new Kana("ri", "リ", false, 13),
  new Kana("ru", "ル", false, 13),
  new Kana("re", "レ", false, 13),
  new Kana("ro", "ロ", false, 13),
  // w
  new Kana("wa", "ワ", false, 14),
  new Kana("wo", "ヲ", false, 14),
  // single n
  new Kana("n", "ン", false, 14)
];