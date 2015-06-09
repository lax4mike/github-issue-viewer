// https://api.github.com/repos/rails/rails/issues 

import React from "react";

import IssueList from "./IssueList.jsx";
import IssueDetail from "./IssueDetail.jsx";



var App = React.createClass({

    getInitialState: function(){
        return {
            issueNumber: -1,
            error: ""
        };
    },

    onIssueClick: function(issueNumber){
        this.setState({
            issueNumber: issueNumber
        });
    },

    onBackClick: function(){
        this.setState({
            issueNumber: -1
        });
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
