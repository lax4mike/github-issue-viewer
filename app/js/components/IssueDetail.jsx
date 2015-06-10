import React        from "react";
import $            from "jquery";
import classnames   from "classnames";
import marked       from "marked";
import moment       from "moment";
import errorHandler from "../common/errorHandler.js";
import WebApi       from "../common/WebApi.js";
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
        WebApi.getIssue(this.state.issueNumber)

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

        WebApi.getComments(this.state.issueData.comments_url)
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

    getComments: function(){
        if (this.state.issueComments.length > 0) {
            return(
                <div className="issue__comments">

                    {this.state.issueComments.map(function(comment, i){

                        var blurb = "commented <br>" + moment(comment.created_at).fromNow();

                        return (
                            <div className="comment" key={i}>
                                <div className="comment__user">
                                    <User user={comment.user} blurb={blurb}/>
                                </div>
                                <div className="comment__body" dangerouslySetInnerHTML={{__html: marked(comment.body)}}></div>
                            </div>
                        );
                    }.bind(this))}
                </div>
            );
        }

        return "";
    },
    
    render: function(){      

        var issueClassNames = classnames(
            "issue",
            "issue--detail",
            {
                "is-loading": this.state.loading
            }
        );

        var blurb = "opened <br>" + moment(this.state.issueData.created_at).fromNow();

        return (
            <div className={issueClassNames}>

                <Loader className="page__loader" />

                <div className="page__header">
                    <button className="issue__back" onClick={this.props.onBackClick}>Back</button>
                </div>

                <div className="page__body">

                    
                    <div className="issue__title media-obj">
                        <div className="media-obj__left">
                            <span className="issue__number">#{this.state.issueData.number}</span>
                            <div className="issue__state">{this.state.issueData.state}</div>
                        </div>
                        <div className="media-obj__right">
                            <div className="issue__title">{this.state.issueData.title}</div>
                        </div>
                    </div>
                    
                    <div className="media-obj">
                        <div className="media-obj__left">
                            <User user={this.state.issueData.user} blurb={blurb}/>
                        </div>
                        <div className="media-obj__right">
                            <div className="issue__body" dangerouslySetInnerHTML={{__html: this.getBody()}} />
                            {this.getComments()}
                        </div>
                    </div>

                    


                </div>

            </div>
        );
    }

}); 

export default IssueDetail;
