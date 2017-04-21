import * as React from "react";
import { Link } from "react-router-dom";

const description = "A small portofolio app in Angular2 and Jekyll";

export const Footer: React.StatelessComponent<void> = () => (
  <footer className="footer">
    <div className="container">
      <div className="g-9">
        <h2 className="footer-header">
          <Link to="/">nhum.nl</Link>
        </h2>
      </div>
      <div className="g-6">
        <p className="footer-github">
          {/*By {% include icon-github.html username=site.github_username %}*/}
        </p>
      </div>
      <div className="g-9">
        <p
          className="footer-description ellipsis"
          title={description}
        >
          {description}
        </p>
      </div>
    </div>
  </footer>
);