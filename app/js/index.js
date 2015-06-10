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
    renderPage(<App />);
}

function issue(number) {
    number = parseInt(number);
    renderPage(<App issueNumber={number} />);
}


// render the given component, or the error page
function renderPage(component){
    React.render(component, document.querySelector(".mount"));
}


