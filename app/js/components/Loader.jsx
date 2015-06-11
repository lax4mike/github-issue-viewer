import React from "react";
import classnames from "classnames";

var Loader = React.createClass({

    propTypes: {
        className: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.object
        ]),
        text: React.PropTypes.string
    },

    render: function(){

        var loaderClasses = classnames(
            "loader",
            this.props.className || {} // classes from parent
        )

        var text = (typeof this.props.text !== "undefined") ? this.props.text : "loading...";

        return (
            <div className={loaderClasses}>
                {text}
            </div>
        )
    }

});

export default Loader;
