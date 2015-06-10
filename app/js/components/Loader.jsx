import React from "react";
import classnames from "classnames";

var Loader = React.createClass({

	render: function(){

		var loaderClasses = classnames(
			"loader",
			this.props.className || {} // classes from parent
		)

		return (
			<div className={loaderClasses}>
				loading...
			</div>
		)
	}

});

export default Loader;
