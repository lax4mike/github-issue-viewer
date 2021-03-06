// https://api.github.com/repos/rails/rails/issues 

import React from "react";
import classnames from "classnames";

import IssueList from "./IssueList.jsx";
import IssueDetail from "./IssueDetail.jsx";



var User = React.createClass({

    propTypes: {
        userData: React.PropTypes.object,
        blurb: React.PropTypes.string
    },

    getUserData: function(){

        if (!this.props.user) { return {}; }

        return {
            name: this.props.user.login,
            img: this.props.user.avatar_url,
            href: "https://github.com/" + this.props.user.login
        }
    },  

    render: function(){ 

        var user = this.getUserData();

        return (
            <div className="user">
                <a href={user.href}>
                    <img className="user__img" src={user.img} />
                </a>
                <div className="user__name">
                    <a href={user.href}>@{user.name}</a>
                </div>
                <div className="user__blurb"dangerouslySetInnerHTML={{__html: this.props.blurb}}></div>
            </div>
        );
    }

}); 

export default User;
