import * as React from "react";
import { Link, Route, RouteComponentProps } from "react-router-dom";

import { IKanaTest } from "~/models/kana";
import { KanaSelect } from "./select";
import { KanaTest } from "./test";

interface IKanaState {
  settings: IKanaTest;
}

/**
 * Kana index page
 */
export class Kana extends React.Component<RouteComponentProps<void>, IKanaState> {
  public state: IKanaState = {
    settings: undefined
  };

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
    return <KanaSelect {...props} startTest={this.startTest} />;
  }

  /**
   * Renders the kana test page
   */
  private renderTest = (props: RouteComponentProps<void>) => {
    return <KanaTest {...props} settings={this.state.settings} reverse={false} />;
  }

  /**
   * Renders the kana reversed test page
   */
  private renderReverseTest = (props: RouteComponentProps<void>) => {
    return <KanaTest {...props} settings={this.state.settings} reverse={true} />;
  }

  /**
   * React render
   */
  render() {
    const { match } = this.props;

    return (
      <div className="group">
        <section className="g-24 g-md-16 g-md-p-4 kana-container">
          <header className="group">
            <div className="g-24">
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