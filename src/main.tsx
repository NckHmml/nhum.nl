import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";

import { Footer } from "./components/footer";
import { Navigation } from "./components/navigation";

import { Index } from "./views/index";

import "../style/main.scss";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Navigation />
      <main className="container main">
        {/* Routing */}
        <Route exact path="/" component={Index} />

      </main>
      <Footer />
    </div>
  </BrowserRouter>,
  document.getElementById("container")
);
