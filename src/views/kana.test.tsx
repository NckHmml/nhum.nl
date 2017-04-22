import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { IKanaTest } from "../models/kana.test";

interface IKanaTestProps extends RouteComponentProps<void> {
  reverse: boolean;
  settings: IKanaTest;
}

export class KanaTest extends React.Component<IKanaTestProps, void> {
  private cancel() {
    this.props.history.push("/kana");
  }

  /**
   * Renders reverse test
   */
  private renderReverse() {
    return (
      <div>
        <section className="group">
          <div className="g-24" />
        </section>
        <section className="group">
          <div className="g-24">
            <fieldset />
          </div>
        </section>
        <footer className="group">
          <div className="g-24">
            <button
              className="kana-button button"
              onClick={() => this.cancel()}
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
    return (
      <div>
        <section className="group">
          <div className="g-24" />
        </section>
        <section className="group">
          <div className="g-24">
            <fieldset />
          </div>
        </section>
        <footer className="group">
          <div className="g-24">
            <button
              className="kana-button button"
              onClick={() => this.cancel()}
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
    console.log(this.props.settings);
    if (this.props.reverse)
      return this.renderReverse();
    else
      return this.renderDefault();
  }
}