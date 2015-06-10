import React         from "react";
import $             from "jquery";
import classnames    from "classnames";
import IssueListItem from "./IssueListItem.jsx";
import Loader        from "./Loader.jsx";
import errorHandler  from "../common/errorHandler.js";

var IssuesList = React.createClass({

    propTypes: {
        onIssueClick: React.PropTypes.func
    },

    getInitialState: function(){
        return {
            issues: [],
            page: 1,
            loading: false,
        };
    },

    fetchIssues: function(){

        this.setState({
            loading: true
        });
        
        $.get("https://api.github.com/repos/rails/rails/issues", {
                page: this.state.page
            })
                
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
            }.bind(this));;
    },

    componentWillMount: function(){
        this.fetchIssues();
    },

    onIssueClick: function(issueNumber){
        this.props.onIssueClick(issueNumber);
    },

    onPrevClick: function(){
        if (this.state.page === 1) { return; }

        this.setState({ page: this.state.page - 1}, function(){
            this.fetchIssues();
            $('html,body').animate({
                scrollTop: 0
            }, 250);
        });
    },

    onNextClick: function(){
        this.setState({ page: this.state.page + 1}, function(){
            this.fetchIssues();
            $('html,body').animate({
                scrollTop: 0
            }, 250);
        });
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
                
                <Loader className="page-loader" />
                
                {this.state.issues.map(function(issue, i){
                    return <IssueListItem 
                        issue={issue} 
                        key={issue.number} 
                        onClick={this.onIssueClick.bind(this, issue.number)} />
                }.bind(this))}
                


                <div className="pagination">
                {this.state.page}
                    <button className="pagination__prev" onClick={this.onPrevClick}>Prev</button>
                    <button className="pagination__next" onClick={this.onNextClick}>Next</button>
                </div>

            </div>
        );
    }

}); 

export default IssuesList;
