// https://api.github.com/repos/rails/rails/issues 

import React from "react";

import IssueList from "./IssueList.jsx";
import IssueDetail from "./IssueDetail.jsx";



var User = React.createClass({

    propTypes: {
        userData: React.PropTypes.object
    },

    getUserData: function(){

        if (!this.props.user) { return {}; }

        return {
            name: this.props.user.login,
            img: this.props.user.avatar_url
        }
    },


    render: function(){ 

        var user = this.getUserData();

        return (
            <div className="user">
                <div className="user__posted-by">Posted by</div>
                <img className="user__img" src={user.img} />
                <div className="user__name">{user.name}</div>
            </div>
        );
    }

}); 

export default User;
