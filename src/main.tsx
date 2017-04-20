import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/hello.component";

import "./style/main.scss";

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("container")
);
