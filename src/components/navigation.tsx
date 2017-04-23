import * as React from "react";
import { Link } from "react-router-dom";

import { ClassNames } from "../helpers/classnames";

interface INavigationState {
  open: boolean;
}

export class Navigation extends React.Component<void, INavigationState> {
  public state: INavigationState = {
    open: false
  };

  /**
   * Navigation slide onClick
   */
  private trigger(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();

    this.setState({
      open: !this.state.open
    });
  }

  /**
   * Window onClick
   */
  private close = (event: Event) => {
    event.stopPropagation();

    if (!this.state.open)
      return;

    this.setState({
      open: false
    });
  }

  /**
   * React component mount
   */
  public componentDidMount() {
    window.addEventListener("click", this.close);
  }

  /**
   * React component unmount
   */
  public componentWillUnmount() {
    window.removeEventListener("click", this.close);
  }

  /**
   * React render
   */
  public render() {
    const className = ClassNames({
      "open": this.state.open,
      "navigation": true
    });

    return (
      <nav className={className}>
        <div className="container">
          <header className="g-24">
            <h1>Navigation</h1>
          </header>
          <section className="g-12 text right">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/kana">Kana learning tool</Link></li>
            </ul>
          </section>
          <section className="g-12">
            <ul>
              <li><a href="#">Project Euler</a></li>
              <li><Link to="/sudoku">Sudoku solver</Link></li>
            </ul>
          </section>
        </div>
        <div className="navigation-slide" onClick={(event) => this.trigger(event)}>
          <ul>
            <li />
            <li />
            <li />
          </ul>
        </div>
      </nav>
    );
  }
}