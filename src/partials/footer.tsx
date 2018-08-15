import * as React from "react";
import { Link } from "react-router-dom";

/**
 * Footer description
 */
const description = "A small portofolio app in TypeScript and React";

/**
 * Page footer
 */
export const Footer: React.StatelessComponent<{}> = () => (
  <footer className="c-footer">
    <div className="container">
      <div className="g-24">
        <h2 className="c-footer-header">
          <Link to="/">nhum.nl</Link>
        </h2>
      </div>
      <div className="g-24">
        <p
          className="c-footer-description ellipsis"
          title={description}
        >
          {description}
        </p>
      </div>
    </div>
  </footer>
);