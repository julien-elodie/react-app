import React from "react";
import ReactDOM from "react-dom";

import Nav from "./public/compoments/nav"
import Foot from "./public/compoments/foot"

require("./public/css/inverse-nav.css")
require("./public/css/sticky-footer.css")

ReactDOM.render(<Nav />, document.getElementById("nav"));
ReactDOM.render(<Foot />, document.getElementById("foot"));