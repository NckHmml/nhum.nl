import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { Button } from "~/components/button";
import { Checkbox } from "~/components/checkbox";
import { KanaItem, IKanaTest } from "~/models/kana";

interface IKanaSelectProps extends RouteComponentProps<void> {
  startTest: (settings: IKanaSelectState) => void;
  settings: IKanaTest;
  buffer: Array<KanaItem>;
}

interface IKanaSelectState extends IKanaTest {
  kana: Array<KanaItem>;
}

/**
 * Kana select page
 */
export class KanaSelect extends React.Component<IKanaSelectProps, IKanaSelectState> {
  public state: IKanaSelectState = {
    kana: this.props.buffer,
    reverse: this.props.settings ? this.props.settings.reverse : false,
    repeat: this.props.settings ? this.props.settings.repeat : 1,
    delay: this.props.settings ? this.props.settings.delay : 500
  };

  /**
   * Updates 'repeat' in the state
   */
  private setRepeat = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      repeat: parseInt(event.target.value)
    });
  }

  /**
   * Updates 'delay' in the state
   */
  private setDelay = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      delay: parseInt(event.target.value)
    });
  }

  /**
   * Updates 'reverse' in the state
   */
  private setReverse = (reverse: boolean) => {
    this.setState({
      reverse: reverse
    });
  }

  /**
   * Tries to start the test
   */
  private startTest = () => {
    const selected = this.state.kana.some(kana => kana.selected);
    if (!selected) {
      alert("Select some options first");
      return;
    }
    this.props.startTest(this.state);
  }

  /**
   * Checks or unchecks all kana
   * @param hiragana katakana if false
   */
  private checkAllKana(hiragana: boolean): (checked: boolean) => void {
    return (checked: boolean) => {
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
    };
  }

  /**
   * Checks or unchecks a certain kana group
   * @param group group to (un)check
   * @param hiragana katakana if false
   */
  private checkKana(group: number, hiragana: boolean): (checked: boolean) => void {
    return (checked: boolean) => {
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
    };
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
            onChange={this.checkKana(group, hiragana)}
          />
          <ul>
            {kanaListItems}
          </ul>
        </div>
      </div>
    );
  }

  /**
   * React render
   */
  public render() {
    const { kana, repeat, delay, reverse } = this.state;

    // Check if all hiragana is selected
    const allHiraganaSelected = kana.every(kana => !kana.hiragana || kana.selected);
    // Check if all hiragana is selected
    const allKatakanaSelected = kana.every(kana => kana.hiragana || kana.selected);

    // Get all hiragana groups
    const hiraganaGroups = kana.reduce((buffer, kana) => {
      if (kana.hiragana && buffer.indexOf(kana.group) === -1)
        buffer.push(kana.group);
      return buffer;
    }, new Array<number>());

    // Get all katakana groups
    const katakanaGroups = kana.reduce((buffer, kana) => {
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
                onChange={this.checkAllKana(true)}
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
                onChange={this.checkAllKana(false)}
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
                      value={repeat}
                      onChange={this.setRepeat}
                    />
                    <span>{repeat == 1 ? "time" : "times"}</span>
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
                      value={delay}
                      onChange={this.setDelay}
                    />
                    <span>ms</span>
                  </td>
                </tr>
                <tr>
                  <td>reverse mode</td>
                  <td>
                    <Checkbox
                      defaultValue={reverse}
                      onChange={this.setReverse}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <footer className="group">
          <div className="g-24">
            <Button
              className="kana-button"
              onClick={this.startTest}
            >
              Start
            </Button>
          </div>
        </footer>
      </div>
    );
  }
}