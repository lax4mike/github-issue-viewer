import React from "react";
import $ from "jquery";
import classnames from "classnames";
import IssueListItem from "./IssueListItem.jsx";

var IssuesList = React.createClass({

    getInitialState: function(){
        return {
            issues: [],
            page: 1,
            loading: false
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
                    issues: data,
                    loading: false
                })
            }.bind(this))

            .fail(function(err){
                this.setState({
                    loading: false
                });
                console.error(err);
            }.bind(this));
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
                "issues--loading": this.state.loading
            }
        );

        var nums = this.state.issues.map(function(issue){
            return issue.number
        });


        return (
            <div className={issuesClassNames}>
                
                {this.state.issues.map(function(issue, i){
                    return <IssueListItem 
                        issue={issue} 
                        key={issue.number} 
                        onClick={this.onIssueClick.bind(this, issue.number)} />
                }.bind(this))}
                
                {this.state.loading}

                {this.state.page}

                <div className="pagination">
                    <button className="pagination__prev" onClick={this.onPrevClick}>Prev</button>
                    <button className="pagination__next" onClick={this.onNextClick}>Next</button>
                </div>
            </div>
        );
    }

}); 

export default IssuesList;
