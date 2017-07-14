import * as React from "react";
import * as Zxcvbn from "zxcvbn-typescript";

import { ClassNames } from "~/helpers/classnames";

interface IPasswordProps {
  onValid: (value: string) => void;
  inputs?: string[];
}

interface IPasswordState {
  password: string;
  confirm: string;
  score: Score;
}

enum Score {
  Excellent = 4,
  Good = 3,
  Medium = 2,
  Weak = 1,
  Bad = 0
}

/**
 * Password checking component
 * @example readme.md
 */
export class Password extends React.Component<IPasswordProps, IPasswordState> {
  public state: IPasswordState = {
    password: "",
    confirm: "",
    score: Score.Bad
  };

  constructor(props: IPasswordProps) {
    super(props);
    // Manually trigger the matching build
    Object.apply(Zxcvbn.Checker.matching);
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    const score = this.testScore(password, this.props.inputs);

    this.setState({
      password: password,
      score: score
    }, () => this.check());
  }

  private onChangeConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      confirm: event.target.value,
    }, () => this.check());
  }

  private check() {
    const { score, confirm, password } = this.state;
    if (score >= Score.Good && confirm === password) {
      this.props.onValid(password);
    }
  }

  private testScore(password: string, userInputs: string[]): Score {
    const result = Zxcvbn.check(password, userInputs);

    let score = Score.Bad;

    if (password) {
      if (result.guessesLog10 > 9) {
        score = Score.Excellent;
      } else if (result.guessesLog10 > 6.5) {
        score = Score.Good;
      } else if (result.guessesLog10 > 4.5) {
        score = Score.Medium;
      } else if (result.guessesLog10 > 1.5) {
        score = Score.Weak;
      }
    }

    return score;
  }

  public componentWillReceiveProps(nextProps: IPasswordProps) {
    const { score, password } = this.state;
    const newScore = this.testScore(password, nextProps.inputs);

    this.setState({
      score: newScore
    }, () => this.check());
  }

  public render() {
    const { score, confirm, password } = this.state;

    const passwordClass = ClassNames({
      "c-password-bar": true,
      "weak": score === Score.Weak && password !== "",
      "medium": score === Score.Medium,
      "good": score === Score.Good,
      "excellent": score === Score.Excellent
    });

    const confirmClass = ClassNames({
      "c-password-bar": true,
      "excellent": confirm === password && password !== ""
    });

    return (
      <div className="c-password">
        <fieldset className={passwordClass}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={this.onChange}
          />
          <hr />
        </fieldset>
        <fieldset className={confirmClass}>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirm}
            onChange={this.onChangeConfirm}
          />
          <hr />
        </fieldset>
      </div>
    );
  }
}

// Needed for styleguidist
export default Password;