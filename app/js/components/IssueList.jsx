import React         from "react";
import $             from "jquery";
import classnames    from "classnames";
import IssueListItem from "./IssueListItem.jsx";
import Loader        from "./Loader.jsx";
import errorHandler  from "../common/errorHandler.js";
import WebApi        from "../common/WebApi.js";

var IssuesList = React.createClass({

    propTypes: {
        page: React.PropTypes.number
    },

    getDefaultProps: function(){
        return {
            page: 1
        }
    },

    getInitialState: function(){
        return {
            issues: [],
            loading: false,
        };
    },

    fetchIssues: function(){

        this.setState({
            loading: true
        });

        console.log(this.props.page);
        
        WebApi.getIssues(this.props.page)
                
            .done(function(data){
                this.setState({
                    issues: data
                })
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

    componentWillMount: function(){
        this.fetchIssues();
    },

    componentWillReceiveProps: function(){
        this.fetchIssues();
    },

    onIssueClick: function(issueNumber){
        window.location.hash = "#/issue/" + issueNumber;  
    },

    onPrevClick: function(){
        if (this.props.page === 1) { return; }

        var page = this.props.page - 1;

        window.location.hash = "#/issues/" + page;  
    
        $('html,body').animate({
            scrollTop: 0
        }, 250);
    
    },

    onNextClick: function(){

        var page = this.props.page + 1;

        window.location.hash = "#/issues/" + page;  
    
        $('html,body').animate({
            scrollTop: 0
        }, 250);
    },

    render: function(){ 

        var issuesClassNames = classnames(
            "issues",
            {
                "is-loading": this.state.loading
            }
        );

        var nums = this.state.issues.map(function(issue){
            return issue.number
        });


        return (
            <div className={issuesClassNames}>
                
                <Loader className="page__loader" />

                <div className="page__header">
                    <h1>Github issues for rails/rails</h1>
                </div>

                <div className="page__body">
                
                    {this.state.issues.map(function(issue, i){
                        return <IssueListItem 
                            issue={issue} 
                            key={issue.number} 
                            onClick={this.onIssueClick.bind(this, issue.number)} />
                    }.bind(this))}
                    
                    <div className="pagination">
                        <button className="pagination__prev" onClick={this.onPrevClick}>Prev</button>
                        <div className="pagination__label">
                            Page: <span className="pagination__page">{this.props.page}</span>
                        </div>
                        <button className="pagination__next" onClick={this.onNextClick}>Next</button>
                    </div>
                </div>

            </div>
        );
    }

}); 

export default IssuesList;
