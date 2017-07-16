import * as React from "react";
import * as hljs from "highlight.js";

import * as hljs_cs from "highlight.js/lib/languages/cs.js";

/**
 * Code highlighting with highlight.js
 * @example readme.md
 */
export class Code extends React.Component<{}, {}> {
  private ref: Node;
  private setRef = (ref: Node) => {
    this.ref = ref;
  }

  public componentDidMount() {
    hljs.registerLanguage("cs", hljs_cs);
    console.log(hljs.listLanguages());
    hljs.highlightBlock(this.ref);
  }

  public render() {
    return (
      <pre>
        <code
          className="cs"
          ref={this.setRef}
        >
          {this.props.children}
        </code>
      </pre>
    );
  }
}

// Needed for styleguidist
export default Code;