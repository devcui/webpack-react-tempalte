import "./index.scss"
import "./index.less"
import React from "react";
import ReactDom from 'react-dom'
import App from "src/App";

if (module && module.hot) {
    module.hot.accept()
}


ReactDom.render(<App/>, document.querySelector("#root"))