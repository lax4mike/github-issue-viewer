import $ from "jquery";

var mock = false;

var api = {

    getIssue: function(issueNumber) {
        
        if (mock){ return $.get("/mock/issue.json"); }

        return $.get("https://api.github.com/repos/rails/rails/issues/" + issueNumber);

    },

    getIssues: function(page){

        if (mock){ return $.get("/mock/issues.json"); }

        return $.get("https://api.github.com/repos/rails/rails/issues", {
                    page: page 
                });
    },

    getComments: function(commentUrl){

        if (mock){ return $.get("/mock/comments.json"); }

        return $.get(commentUrl);
    }
};

export default api;

