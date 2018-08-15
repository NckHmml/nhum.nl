import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";

import { Footer } from "~/partials/footer";
import { Navigation } from "~/partials/navigation";

import { Index } from "~/views";
import { Euler } from "~/views/euler";
import { Kana } from "~/views/kana";
import { Password } from "~/views/password";
import { Sudoku } from "~/views/sudoku";

// Import styling
import "../style/main.scss";

// React entry point
ReactDOM.render(
  <BrowserRouter>
    <ParallaxProvider>
      <div>
        <Navigation />
        <main className="container main">
          {/* Routes */}
          <Route path="/" component={Index} exact={true} />
          <Route path="/euler" component={Euler} />
          <Route path="/kana" component={Kana} />
          <Route path="/password" component={Password} />
          <Route path="/sudoku" component={Sudoku} />
        </main>
        <Footer />
      </div>
    </ParallaxProvider>
  </BrowserRouter>,
  document.getElementById("container")
);
