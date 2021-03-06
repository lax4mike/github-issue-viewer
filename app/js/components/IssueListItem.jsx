import React from "react";
import User from "./User.jsx";
import removeMarkdown from "remove-markdown";
import marked from "marked";
import moment from "moment";

var IssueListItem = React.createClass({

    propTypes: {
        issue: React.PropTypes.object
    },

    // return the first 140 chars of the body to the closest word 
    getSummary: function(){

        // Remove the markup and get first 141 chars from the body string
        var body = removeMarkdown(this.props.issue.body)
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
        if (this.props.issue.body.length > 140){
            body += "...";
        }

        return body;
    },



    render: function(){ 

        var blurb = "opened <br>" + moment(this.props.issue.created_at).fromNow();

        var issueLink = "#/issue/" + this.props.issue.number;

        return (
            <div className="issue issue--list-item media-obj">
                <div className="media-obj__left">
                    <div className="issue__number" >
                        <a href={issueLink}>#{this.props.issue.number}</a>
                    </div>
                    <User user={this.props.issue.user} blurb={blurb}/>
                </div>

                <div className="media-obj__right">
                    <a href={issueLink} className="issue__title">
                        {this.props.issue.title}
                    </a>

                    {/*
                    <div><span>{this.props.issue.comments}</span> comments</div>
                    */}
                    
                    <div className="issue__summary">{this.getSummary()}</div>
                </div>

            </div>
        );
    }

}); 

export default IssueListItem;
