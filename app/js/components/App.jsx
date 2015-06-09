// https://api.github.com/repos/rails/rails/issues 

import React from "react";

import IssueList from "./IssueList.jsx";
import IssueDetail from "./IssueDetail.jsx";
import "Object.assign";


var App = React.createClass({

    getInitialState: function(){
        return {
            issueNumber: -1,
            error: ""
        };
    },

    componentWillReceiveProps: function(newProps){
        // blow away the old state and add newProps
        var newState = Object.assign({}, this.getInitialState(), newProps);
        this.setState(newState);
    },


    onIssueClick: function(issueNumber){
        window.location.hash = "#/issue/" + issueNumber;
    },

    onBackClick: function(){
        window.location.hash = "#/issues";
    },

    render: function(){ 

        if (this.state.issueNumber !== -1){
            var page = <IssueDetail 
                            issueNumber={this.state.issueNumber} 
                            onBackClick={this.onBackClick}/>
        }
        else {
            var page = <IssueList 
                            onIssueClick={this.onIssueClick} />
        }

        return (
            <div className="app">
                {page}
            </div>
        );
    }

}); 

export default App;
