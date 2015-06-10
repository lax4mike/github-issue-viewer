import React from "react";
import User from "./User.jsx";
import removeMarkdown from "remove-markdown";
import marked from "marked";

var IssueListItem = React.createClass({

    propTypes: {
        issue: React.PropTypes.object,
        onClick: React.PropTypes.func
    },

    getInitialState: function(){
        return {
            issue: this.props.issue, // raw data
            user: null
        };
    },

    // return the first 140 chars of the body to the closest word 
    getSummary: function(){

        // Remove the markup and get first 141 chars from the body string
        var body = removeMarkdown(this.state.issue.body)
            .substr(0, 141);

        // from the end, pop off letters until we find a space
        while(body.length){
            var lastChar = body.slice(-1);
            body = body.slice(0, -1);
            
            if (lastChar.match(/\W/) !== null){
                break;
            }

        }

        // add ... at the end to indicate that it's cut off
        if (this.state.issue.body.length > 140){
            body += "...";
        }

        return body;
    },



    render: function(){ 

        return (
            <div className="issue issue--list-item">
                
                <div className="issue__left">
                    <div className="issue__number">#{this.state.issue.number}</div>
                    <User user={this.state.issue.user} />
                </div>

                <div className="issue__right">
                    <div className="issue__title" onClick={this.props.onClick}>
                        {this.state.issue.title}
                    </div>

                    {/*
                    <div><span>{this.state.issue.comments}</span> comments</div>
                    */}
                    
                    <div className="issue__summary">{this.getSummary()}</div>
                </div>

            </div>
        );
    }

}); 

export default IssueListItem;
