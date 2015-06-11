import React from "react";
import IssueList from "./components/IssueList.jsx";
import IssueDetail from "./components/IssueDetail.jsx";
import { Router } from "director";


var router = Router({
        "/issues/:page": issues,
        "/issue/:number": issue
    })
    .configure({
        notfound: function(){
            window.location.hash = "/issues";
        }
    })
    .init("/issues/1");


// hack https://github.com/flatiron/director/issues/199
window.dispatchEvent(new HashChangeEvent("hashchange"));


function issues(page) {
    page = Number(page);
    renderPage(<IssueList page={page} />);
}

function issue(number) {
    number = Number(number);
    renderPage(<IssueDetail issueNumber={number} />);
}


// render the given component, or the error page
function renderPage(component){
    React.render(component, document.querySelector(".mount"));
}


