import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Link, Route } from "react-router-dom";

import { Footer } from "~/partials/footer";
import { Navigation } from "~/partials/navigation";

import { Index } from "~/views";
import { Kana } from "~/views/kana";
import { Password } from "~/views/password";
import { Sudoku } from "~/views/sudoku";

// Import styling
import "../style/main.scss";

// React entry point
ReactDOM.render(
  <BrowserRouter>
    <div>
      <Navigation />
      <main className="container main">
        {/* Routes */}
        <Route path="/" component={Index} exact={true} />
        <Route path="/kana" component={Kana} />
        <Route path="/password" component={Password} />
        <Route path="/sudoku" component={Sudoku} />
      </main>
      <Footer />
    </div>
  </BrowserRouter>,
  document.getElementById("container")
);
