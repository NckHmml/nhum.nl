import * as React from "react";
import { Link, Route, RouteComponentProps } from "react-router-dom";

import { KanaItem, IKanaTest } from "~/models/kana";
import { KanaSelect } from "./select";
import { KanaTest } from "./test";

interface IKanaState {
  settings?: IKanaTest;
}

/**
 * Kana index page
 */
export class Kana extends React.Component<RouteComponentProps<void>, IKanaState> {
  public state: IKanaState = {
    settings: undefined
  };

  public kanaBuffer: Array<KanaItem> = [
    /* Hiragana */
    // a e i o u
    new KanaItem("a", "あ", true, 0),
    new KanaItem("i", "い", true, 0),
    new KanaItem("u", "う", true, 0),
    new KanaItem("e", "え", true, 0),
    new KanaItem("o", "お", true, 0),
    // k
    new KanaItem("ka", "か", true, 1),
    new KanaItem("ki", "き", true, 1),
    new KanaItem("ku", "く", true, 1),
    new KanaItem("ke", "け", true, 1),
    new KanaItem("ko", "こ", true, 1),
    // g
    new KanaItem("ga", "が", true, 2),
    new KanaItem("gi", "ぎ", true, 2),
    new KanaItem("gu", "ぐ", true, 2),
    new KanaItem("ge", "げ", true, 2),
    new KanaItem("go", "ご", true, 2),
    // s
    new KanaItem("sa", "さ", true, 3),
    new KanaItem("shi", "し", true, 3),
    new KanaItem("su", "す", true, 3),
    new KanaItem("se", "せ", true, 3),
    new KanaItem("so", "そ", true, 3),
    // z
    new KanaItem("za", "ざ", true, 4),
    new KanaItem("ji", "じ", true, 4),
    new KanaItem("zu", "ず", true, 4),
    new KanaItem("ze", "ぜ", true, 4),
    new KanaItem("zo", "ぞ", true, 4),
    // t
    new KanaItem("ta", "た", true, 5),
    new KanaItem("chi", "ち", true, 5),
    new KanaItem("tsu", "つ", true, 5),
    new KanaItem("te", "て", true, 5),
    new KanaItem("to", "と", true, 5),
    // d
    new KanaItem("da", "だ", true, 6),
    new KanaItem("de", "で", true, 6),
    new KanaItem("do", "ど", true, 6),
    // n
    new KanaItem("na", "な", true, 7),
    new KanaItem("ni", "に", true, 7),
    new KanaItem("nu", "ぬ", true, 7),
    new KanaItem("ne", "ね", true, 7),
    new KanaItem("no", "の", true, 7),
    // h
    new KanaItem("ha", "は", true, 8),
    new KanaItem("hi", "ひ", true, 8),
    new KanaItem("fu", "ふ", true, 8),
    new KanaItem("he", "へ", true, 8),
    new KanaItem("ho", "ほ", true, 8),
    // b
    new KanaItem("ba", "ば", true, 9),
    new KanaItem("bi", "び", true, 9),
    new KanaItem("bu", "ぶ", true, 9),
    new KanaItem("be", "べ", true, 9),
    new KanaItem("bo", "ぼ", true, 9),
    // p
    new KanaItem("pa", "ぱ", true, 10),
    new KanaItem("pi", "ぴ", true, 10),
    new KanaItem("pu", "ぷ", true, 10),
    new KanaItem("pe", "ぺ", true, 10),
    new KanaItem("po", "ぽ", true, 10),
    // m
    new KanaItem("ma", "ま", true, 11),
    new KanaItem("mi", "み", true, 11),
    new KanaItem("mu", "む", true, 11),
    new KanaItem("me", "め", true, 11),
    new KanaItem("mo", "も", true, 11),
    // y
    new KanaItem("ya", "や", true, 12),
    new KanaItem("yu", "ゆ", true, 12),
    new KanaItem("yo", "よ", true, 12),
    // r
    new KanaItem("ra", "ら", true, 13),
    new KanaItem("ri", "り", true, 13),
    new KanaItem("ru", "る", true, 13),
    new KanaItem("re", "れ", true, 13),
    new KanaItem("ro", "ろ", true, 13),
    // w
    new KanaItem("wa", "わ", true, 14),
    new KanaItem("wo", "を", true, 14),
    // single n
    new KanaItem("n", "ん", true, 14),
    /* Katakana */
    // a e i o u
    new KanaItem("a", "ア", false, 0),
    new KanaItem("i", "イ", false, 0),
    new KanaItem("u", "ウ", false, 0),
    new KanaItem("e", "エ", false, 0),
    new KanaItem("o", "オ", false, 0),
    // k
    new KanaItem("ka", "カ", false, 1),
    new KanaItem("ki", "キ", false, 1),
    new KanaItem("ku", "ク", false, 1),
    new KanaItem("ke", "ケ", false, 1),
    new KanaItem("ko", "コ", false, 1),
    // g
    new KanaItem("ga", "ガ", false, 2),
    new KanaItem("gi", "ギ", false, 2),
    new KanaItem("gu", "グ", false, 2),
    new KanaItem("ge", "ゲ", false, 2),
    new KanaItem("go", "ゴ", false, 2),
    // s
    new KanaItem("sa", "サ", false, 3),
    new KanaItem("shi", "シ", false, 3),
    new KanaItem("su", "ス", false, 3),
    new KanaItem("se", "セ", false, 3),
    new KanaItem("so", "ソ", false, 3),
    // z
    new KanaItem("za", "ザ", false, 4),
    new KanaItem("ji", "ジ", false, 4),
    new KanaItem("zu", "ズ", false, 4),
    new KanaItem("ze", "ゼ", false, 4),
    new KanaItem("zo", "ゾ", false, 4),
    // t
    new KanaItem("ta", "タ", false, 5),
    new KanaItem("chi", "チ", false, 5),
    new KanaItem("tsu", "ツ", false, 5),
    new KanaItem("te", "テ", false, 5),
    new KanaItem("to", "ト", false, 5),
    // d
    new KanaItem("da", "ダ", false, 6),
    new KanaItem("de", "デ", false, 6),
    new KanaItem("do", "ド", false, 6),
    // n
    new KanaItem("na", "ナ", false, 7),
    new KanaItem("ni", "ニ", false, 7),
    new KanaItem("nu", "ヌ", false, 7),
    new KanaItem("ne", "ネ", false, 7),
    new KanaItem("no", "ノ", false, 7),
    // h
    new KanaItem("ha", "ハ", false, 8),
    new KanaItem("hi", "ヒ", false, 8),
    new KanaItem("fu", "フ", false, 8),
    new KanaItem("he", "ヘ", false, 8),
    new KanaItem("ho", "ホ", false, 8),
    // b
    new KanaItem("ba", "バ", false, 9),
    new KanaItem("bi", "ビ", false, 9),
    new KanaItem("bu", "ブ", false, 9),
    new KanaItem("be", "ベ", false, 9),
    new KanaItem("bo", "ボ", false, 9),
    // p
    new KanaItem("pa", "パ", false, 10),
    new KanaItem("pi", "ピ", false, 10),
    new KanaItem("pu", "プ", false, 10),
    new KanaItem("pe", "ペ", false, 10),
    new KanaItem("po", "ポ", false, 10),
    // m
    new KanaItem("ma", "マ", false, 11),
    new KanaItem("mi", "ミ", false, 11),
    new KanaItem("mu", "ム", false, 11),
    new KanaItem("me", "メ", false, 11),
    new KanaItem("mo", "モ", false, 11),
    // y
    new KanaItem("ya", "ヤ", false, 12),
    new KanaItem("yu", "ユ", false, 12),
    new KanaItem("yo", "ヨ", false, 12),
    // r
    new KanaItem("ra", "ラ", false, 13),
    new KanaItem("ri", "リ", false, 13),
    new KanaItem("ru", "ル", false, 13),
    new KanaItem("re", "レ", false, 13),
    new KanaItem("ro", "ロ", false, 13),
    // w
    new KanaItem("wa", "ワ", false, 14),
    new KanaItem("wo", "ヲ", false, 14),
    // single n
    new KanaItem("n", "ン", false, 14)
  ];

  /**
   * Starts the kana test
   */
  private startTest = (settings: IKanaTest) => {
    const { history, match } = this.props;
    // Push settings
    this.setState({
      settings: settings
    }, () => {
      // Check if reverse, then navigate
      if (settings.reverse)
        history.push(`${match.url}/test/reverse`);
      else
        history.push(`${match.url}/test`);
    });
  }

  /**
   * Renders the kana select page
   */
  private renderSelect = (props: RouteComponentProps<void>) => {
    return (
      <KanaSelect {...props}
        settings={this.state.settings}
        startTest={this.startTest}
        buffer={this.kanaBuffer}
      />
    );
  }

  /**
   * Renders the kana test page
   */
  private renderTest = (props: RouteComponentProps<void>) => {
    return (
      <KanaTest {...props}
        settings={this.state.settings}
        reverse={false}
        buffer={this.kanaBuffer}
      />
    );
  }

  /**
   * Renders the kana reversed test page
   */
  private renderReverseTest = (props: RouteComponentProps<void>) => {
    return (
      <KanaTest {...props}
        settings={this.state.settings}
        reverse={true}
        buffer={this.kanaBuffer}
      />
    );
  }

  /**
   * React render
   */
  render() {
    const { match } = this.props;

    return (
      <div className="group">
        <section className="kana-container">
          <header className="group kana-container-title">
            <div className="g-20 g-p-2">
              <h2>Kana learning tool</h2>
            </div>
          </header>
          <Route
            path={match.url}
            render={this.renderSelect}
            exact={true}
          />
          <Route
            path={`${match.url}/test`}
            render={this.renderTest}
            exact={true}
          />
          <Route
            path={`${match.url}/test/reverse`}
            render={this.renderReverseTest}
            exact={true}
          />
        </section>
      </div>
    );
  }
}