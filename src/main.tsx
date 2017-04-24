import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Link, Route } from "react-router-dom";

import { Footer } from "partials/footer";
import { Navigation } from "partials/navigation";

import { Index } from "views/index";
import { Kana } from "views/kana";
import { Sudoku } from "views/sudoku";

import "../style/main.scss";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Navigation />
      <main className="container main">
        <Route path="/" component={Index} exact={true} />
        <Route path="/kana" component={Kana} />
        <Route path="/sudoku" component={Sudoku} />
      </main>
      <Footer />
    </div>
  </BrowserRouter>,
  document.getElementById("container")
);
