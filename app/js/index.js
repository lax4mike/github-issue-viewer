import React from "react";
import App from "./components/App.jsx";
import { Router } from "director";
import "Object.assign";


var router = Router({
    "/issues": issues,
    "/issue/:number": issue
})
.init();

// make sure we start on the issues page when the app loads/reloads
window.location.hash = "#/issues";

function issues() {
    React.render(<App />, document.querySelector(".mount"));
}

function issue(number) {
    React.render(<App issueNumber={number} />, document.querySelector(".mount"));
}


