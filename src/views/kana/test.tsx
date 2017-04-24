import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { ClassNames } from "helpers/classnames";
import { KanaItem, IKanaTest } from "models/kana";

interface IKanaTestProps extends RouteComponentProps<void> {
  reverse: boolean;
  settings: IKanaTest;
}

interface IKanaTestState {
  guess: string;
  current: KanaItem;
  options: Array<KanaOption>;
}

class KanaOption extends KanaItem {
  public clicked: boolean = false;
}

const UNKNOWN_KANA: string = "?";

export class KanaTest extends React.Component<IKanaTestProps, IKanaTestState> {
  private indices: Array<number>;
  private step: number;
  private started: boolean = false;

  public state: IKanaTestState = {
    guess: "",
    current: new KanaItem("", "", false, 0),
    options: []
  };

  /**
   * Handles option click event
   */
  private clickOption(option: KanaOption) {
    return () => {
      option.clicked = true;
      this.setGuess(option.romaji);
    };
  }

  /**
   * Handles the guess event
   */
  private doGuess = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setGuess(event.target.value);
  }

  /**
   * Cancels the test
   */
  private cancel = () => {
    this.props.history.push("/kana");
  }

  /**
   * Randomizes an array
   * @param array array to randomize
   */
  private randomize<T>(array: Array<T>) {
    var rand: number;
    var temp: T;
    for (let index = array.length; index > 0; index--) {
      rand = Math.floor(Math.random() * index);
      temp = array[index - 1];
      array[index - 1] = array[rand];
      array[rand] = temp;
    }
  }

  /**
   * Set next kana in test
   */
  private next() {
    const { reverse, kana } = this.props.settings;
    const { current } = this.state;

    const next = this.props.settings.kana[this.indices[this.step++]];
    const options = new Array<KanaOption>();

    if (this.props.settings.reverse) {
      // Push the valid option
      options.push(next as KanaOption);
      // Get kana in the same group
      const group = this.props.settings.kana.filter(item => item.group === next.group && item.hiragana === next.hiragana && item !== next);
      // Randomize
      this.randomize(group);
      // Pop 2 (smallest group is 3)
      options.push(group.pop() as KanaOption);
      options.push(group.pop() as KanaOption);
      // Randomize options
      this.randomize(options);
      // Undo clicked
      options.forEach(option => option.clicked = false);
    }

    this.setState({
      current: next,
      guess: "",
      options: options
    });
  }

  /**
   * Tries to get a kana equivelent of the current guess
   */
  private getKanaForGuess(): string {
    const { guess, current } = this.state;

    const result = this.props.settings.kana.filter(kana => kana.romaji === guess && kana.hiragana === current.hiragana);
    if (result.length > 0)
      return result[0].kana;
    return UNKNOWN_KANA;
  }

  /**
   * Checks and sets the guess value
   * @param guess the new guess value
   */
  private setGuess(guess: string) {
    this.setState({
      guess: guess
    }, () => {
      // Check if valid
      if (this.isValidGuess()) {
        setTimeout(() => {
          // Check if end of test
          if (this.step >= this.indices.length) {
            alert("finished!");
            this.cancel();
          } else {
            // Get next
            this.next();
          }
        }, this.props.settings.delay);
      }
    });
  }

  /**
   * Checks if the current guess is valid
   */
  private isValidGuess(): boolean {
    const { current, guess } = this.state;
    return guess === current.romaji || guess === current.kana;
  }

  /**
   * Renders a KanaOption
   * @param option option to render
   */
  private renderOption(option: KanaOption) {
    const { current } = this.state;

    const className = ClassNames({
      "valid": option.clicked && option.romaji === current.romaji,
      "invalid": option.clicked && option.romaji !== current.romaji,
    });

    return (
      <li
        className={className}
        key={option.kana}
        onClick={this.clickOption(option)}
      >
        {option.kana}
      </li>
    );
  }

  /**
   * Renders reverse test
   */
  private renderReverse() {
    const options = this.state.options.map((option) => this.renderOption(option));
    return (
      <div>
        <section className="group">
          <div className="g-24">
            <ul className="kana-preview">
              <li>{this.state.current.romaji}</li>
            </ul>
            <ul className="kana-preview click">
              {options}
            </ul>
          </div>
        </section>
        <footer className="group">
          <div className="g-24">
            <button
              className="kana-button button"
              onClick={this.cancel}
            >
              Cancel
            </button>
          </div>
        </footer>
      </div>
    );
  }

  /**
   * Renders normal test
   */
  private renderDefault() {
    const guessed = this.getKanaForGuess();

    const previewClass = ClassNames({
      "kana-preview": true,
      "valid": this.isValidGuess(),
      "invalid": !this.isValidGuess() && guessed !== UNKNOWN_KANA
    });

    return (
      <div>
        <section className="group">
          <div className="g-24">
            <ul className={previewClass}>
              <li><span>{this.state.current.kana}</span></li>
              <li><span>{guessed}</span></li>
            </ul>
          </div>
        </section>
        <section className="group">
          <div className="g-24">
            <fieldset>
              <input
                type="test"
                className="kana-guess"
                maxLength={4}
                onChange={this.doGuess}
                value={this.state.guess}
              />
            </fieldset>
          </div>
        </section>
        <footer className="group">
          <div className="g-24">
            <button
              className="kana-button button"
              onClick={this.cancel}
            >
              Cancel
            </button>
          </div>
        </footer>
      </div>
    );
  }

  /**
   * React render
   */
  public render() {
    if (!this.props.settings)
      return <div />;

    if (this.props.reverse)
      return this.renderReverse();
    else
      return this.renderDefault();
  }

  /**
   * React component mounting
   */
  public componentWillMount() {
    const { history, location, settings, reverse } = this.props;

    if (!settings) {
      history.push("/kana");
      return;
    }

    // Get all selected kana * amount of repeat
    this.indices = settings.kana.reduce((array, cur, index) => {
      if (cur.selected)
        for (let i = 0; i < settings.repeat; i++)
          array.push(index);
      return array;
    }, []);
    // Randomize buffer
    this.randomize(this.indices);
    this.step = 0;
    this.started = true;
    this.next();
  }
}