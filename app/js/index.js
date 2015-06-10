import React from "react";
import App from "./components/App.jsx";
import { Router } from "director";
import "Object.assign";


var router = Router({
        "/issues": issues,
        "/issue/:number": issue
    })
    .configure({
        notfound: function(){
            window.location.hash = "/issues";
        }
    })
    .init("/issues");


// hack https://github.com/flatiron/director/issues/199
window.dispatchEvent(new HashChangeEvent("hashchange"));


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


