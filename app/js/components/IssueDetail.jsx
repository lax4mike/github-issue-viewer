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
        issueNumber: React.PropTypes.number.isRequired
    },

    getInitialState: function(){
        return {
            issueNumber: this.props.issueNumber,
            issueData: {},
            issueComments: [],
            loading: false,
            loadingComments: false
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

        // if there are no comments, don't do anything
        if(!this.state.issueData.comments){ return; };

        // otherwise, show the loading indicator
        this.setState({
            loadingComments: true
        });

        // and fetch the comments
        WebApi.getComments(this.state.issueData.comments_url)
            .done(function(data){
                
                this.setState({
                    issueComments: data
                });

            }.bind(this))

            .always(function(){
                this.setState({
                    loadingComments: false
                });
            }.bind(this));

    },

    onBackClick: function(){
        window.history.go(-1);
    },

    getLabels: function(){

        // if there are no labels, return nothing
        if (!this.state.issueData.labels || 
            !this.state.issueData.labels.length) { return ""; }

            this.state.issueData.labels.push({
                name: "poooo",
                color: "#2b092b"
            });

        return (
            <div className="labels">
                {this.state.issueData.labels.map(function(label, i){
    
                    return (
                        <div className="label" 
                           key={i} 
                           // href={label.url} // this is the api url...
                           style={{
                                background: "#" + label.color,
                                color: getTextColor(label.color)
                           }}>

                            {label.name}
                        </div>   
                    ); 
                })}
            </div>
        );
    },

    getBody: function(){

        // return nothing if we don't have data yet
        if (!this.state.issueData.body){
            return "";
        }

        // otherwise, convert the markdown to html
        return marked(this.state.issueData.body, {sanitize: true});
    },

    getComments: function(){

        // if there are no comments, return nothing
        if (!this.state.issueComments.length) { return ""; }

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

        var commentsLoader = "";

        if (this.state.loadingComments) {
            commentsLoader = <Loader text="loading comments..." />;
        }

        return (
            <div className={issueClassNames}>

                <Loader className="page__loader" />

                <div className="page__header">
                    <button className="issue__back" onClick={this.onBackClick}>Back</button>
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
                            {this.getLabels()}
                        </div>
                        <div className="media-obj__right">
                            <div className="issue__body" dangerouslySetInnerHTML={{__html: this.getBody()}} />
                            
                            {commentsLoader}
                            {this.getComments()}

                        </div>
                    </div>

                </div>

            </div>
        );
    }

}); 


// given a background color, determine if the text should be black or white
function getTextColor(backgroundHex) {
    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(backgroundHex);
    rgb = rgb ? {
        r: parseInt(rgb[1], 16),
        g: parseInt(rgb[2], 16),
        b: parseInt(rgb[3], 16)
    } : null;

    if (!rgb){ return "black"; }

    // http://www.w3.org/TR/AERT#color-contrast
    var brightness = Math.round(((parseInt(rgb["r"]) * 299) + (parseInt(rgb["g"]) * 587) + (parseInt(rgb["b"]) * 114)) / 1000);

    return (brightness > 125) ? "black" : "white";
}

export default IssueDetail;
