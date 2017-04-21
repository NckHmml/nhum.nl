import * as React from "react";
import { Link } from "react-router-dom";

export const Footer: React.StatelessComponent<void> = () => (
  <footer className="footer">
    <div className="container">
      <div className="g-9">
        <h2 className="footer-header">
          <Link to="/">nhum.nl</Link>
          {/*<a className="{{ site.baseurl }}/">{{ site.title }}</a>*/}
        </h2>
      </div>
      <div className="g-6">
        <p className="footer-github">
          {/*By {% include icon-github.html username=site.github_username %}*/}
      </p>
      </div>
      <div className="g-9">
        {/*<p className="footer-description ellipsis" title="{{ site.description }}">{{ site.description }}</p>*/}
      </div>
    </div>
  </footer>
);