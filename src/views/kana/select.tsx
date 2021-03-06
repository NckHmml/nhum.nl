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
  private addRepeat = () => {
    const { repeat } = this.state;
    this.setState({
      repeat: repeat + 1
    });
  }

  /**
   * Updates 'repeat' in the state
   */
  private decRepeat = () => {
    const { repeat } = this.state;
    if (repeat <= 1) return;
    this.setState({
      repeat: repeat - 1
    });
  }

  /**
   * Updates 'delay' in the state
   */
  private addDelay = () => {
    const { delay } = this.state;
    this.setState({
      delay: delay + 100
    });
  }

  /**
   * Updates 'delay' in the state
   */
  private decDelay = () => {
    const { delay } = this.state;
    if (delay <= 200) return;
    this.setState({
      delay: delay - 100
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
      <React.Fragment>
        <section className="group">
          <p className="g-20 g-p-2">
            During the time I spent living in Japan, I wanted to at least be able to read the basic character (kana) sets called "Hiragana" and "Katakana" respectively.<br />
            Sadly, in my quest to learn these sets, I was not able to find a tool to my liking. So I ended up writing my own tool.
          </p>
        </section>
        <section className="group">
          <div className="g-20 g-p-2">
            <h3>Instructions</h3>
            <p>
              This tool works by repeating a selected sets of characters, with the idea that after repeating it enough they will be stored in the long term memory.<br />
              The following options are available;
            </p>
            <ul>
              <li>repeat: the number of times to repeat each set in a single session</li>
              <li>reverse mode: this will switch the tool from "kana to latin" to "latin to kana"</li>
              <li>delay between answers: this will change the time it takes between characters</li>
            </ul>
            <p>Select the characters by clicking the checkbox to their right, after which you can press the button to start.</p>
          </div>
        </section>
        <section className="group">
          <div className="g-20 g-p-2">
            <h3>
              Hiragana sets
              <Checkbox
                defaultValue={allHiraganaSelected}
                title="add all"
                onChange={this.checkAllKana(true)}
              />
            </h3>
            {hiraganaGroups.map(group => this.renderKanaGroup(group, true))}
          </div>
        </section>
        <section className="group">
          <div className="g-20 g-p-2">
            <h3>
              Katakana sets
              <Checkbox
                defaultValue={allKatakanaSelected}
                title="add all"
                onChange={this.checkAllKana(false)}
              />
            </h3>
            {katakanaGroups.map(group => this.renderKanaGroup(group, false))}
          </div>
        </section>
        <section className="group">
          <div className="g-20 g-p-2">
            <h3>Settings</h3>
            <table className="kana-settings">
              <tbody>
                <tr>
                  <td>repeat</td>
                  <td>
                    <span>{repeat} {repeat == 1 ? "time" : "times"}</span>
                  </td>
                  <td>
                    <div className="c-adder secondary" onClick={this.addRepeat}>+</div>
                    &nbsp;
                    <div className="c-adder" onClick={this.decRepeat}>-</div>
                  </td>
                </tr>
                <tr>
                  <td>reverse mode</td>
                  <td>&nbsp;</td>
                  <td>
                    <Checkbox
                      defaultValue={reverse}
                      onChange={this.setReverse}
                    />
                  </td>
                </tr>
                <tr>
                  <td>delay between answers</td>
                  <td>
                    <span>{delay} ms</span>
                  </td>
                  <td>
                    <div className="c-adder secondary" onClick={this.addDelay}>+</div>
                    &nbsp;
                    <div className="c-adder" onClick={this.decDelay}>-</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="g-20 g-p-2">
            <Button
              className="kana-button"
              onClick={this.startTest}
            >
              Start
            </Button>
          </div>
        </section>
      </React.Fragment>
    );
  }
}