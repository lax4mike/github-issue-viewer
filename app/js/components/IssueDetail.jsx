import React        from "react";
import $            from "jquery";
import classnames   from "classnames";
import marked       from "marked";
import errorHandler from "../common/errorHandler.js";
import Loader       from "./Loader.jsx";

import User         from "./User.jsx";


var IssueDetail = React.createClass({

    propTypes: {
        issueNumber: React.PropTypes.number.isRequired,
        onBackClick: React.PropTypes.func.isRequired
    },

    getInitialState: function(){
        return {
            issueNumber: this.props.issueNumber,
            issueData: {},
            issueComments: [],
            loading: false
        };
    },

    componentWillMount: function(){

        this.setState({
            loading: true
        });

        // fetch issue
        $.get("https://api.github.com/repos/rails/rails/issues/" + this.state.issueNumber)
            
            .done(function(data){
                this.setState({
                    issueData: data
                }, this.checkForComments);
            }.bind(this))

            .fail(function(err){
                // "Error reaching github, probably the rate limit, https://developer.github.com/v3/#rate-limiting"
                console.error(err);
                return errorHandler.throwError();
            }.bind(this))

            .always(function(){
                this.setState({
                    loading: false
                });
            }.bind(this));
    },

    checkForComments: function(){

        if(!this.state.issueData.comments){ return; };

        $.get(this.state.issueData.comments_url)
            .done(function(data){
                
                this.setState({
                    issueComments: data
                });

            }.bind(this))

    },

    getBody: function(){

        // return nothing if we don't have data yet
        if (!this.state.issueData.body){
            return "";
        }

        // otherwise, conver the markdown to html
        return marked(this.state.issueData.body, {sanitize: true});
    },
    
    render: function(){ 

        var comments = "";

        if (this.state.issueComments.length > 0) {
            comments = <div className="issue_comments">

                Comments: 
                {this.state.issueComments.map(function(comment, i){
                    return (
                        <div className="comment" key={i}>
                            {comment.body}
                            <User user={comment.user} />
                        </div>
                    );
                }.bind(this))}
            </div>
        }

        var issueClassNames = classnames(
            "issue",
            "issue--detail",
            {
                "is-loading": this.state.loading
            }
        );


        return (
            <div className={issueClassNames}>

                <Loader className="page-loader" />

                <div className="issue__header">
                    <button className="issue__back" onClick={this.props.onBackClick}>Back</button>
                </div>

                <div className="issue__state">{this.state.issueData.state}</div>
                <div className="issue__title">{this.state.issueData.title}</div>
                
                <User user={this.state.issueData.user} />

                <div className="issue__body" dangerouslySetInnerHTML={{__html: this.getBody()}} />

                {comments}

            </div>
        );
    }

}); 

export default IssueDetail;
