import React from "react";

var ErrorPage = React.createClass({

    render: function(){
        return (
            <div className="error">
                <img width="300" height="152" src="http://cliparts.co/cliparts/Bia/KKx/BiaKKxLBT.png" />
                <h1>Yarr!</h1>
                <p>
                    Thar be something wrong!
                </p>
            </div>
        );
    }
});

function throwError() {
    React.render(<ErrorPage />, document.querySelector(".mount"));    
}


export default { throwError }; 

