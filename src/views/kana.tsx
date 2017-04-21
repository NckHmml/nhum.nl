import * as React from "react";
import { Link, Route, RouteComponentProps } from "react-router-dom";

import { KanaIndex } from "./kana.index"; 

export class Kana extends React.Component<RouteComponentProps<void>, void> {
  render() {
    return (
      <div className="group">
        <section className="g-24 g-md-16 g-md-p-4 kana-container">
          <header className="group">
            <div className="g-24">
              <h2>Kana learning tool</h2>
            </div>
          </header>
          <Route 
            exact 
            path={this.props.match.url} 
            render={(props) => <KanaIndex {...props} test="hello" />} 
          />
        </section>
      </div>
    );
  }
}