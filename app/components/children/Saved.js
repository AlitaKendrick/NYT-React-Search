var React = require("react");
var helpers = require("../utils/helpers");

var Saved = React.createClass({
  deleteArticle: function(event) {
	helpers.deleteSavedArticle(this.props.articles[event.target.value]).then(function() {
	  helpers.getSavedArticles().then(function(response) {
	    this.props.parentSaved(response.data);
	  }.bind(this));
    }.bind(this));
  },

//render saved articles with delete button
  render: function() {
    return (
      <div className="saved-container">
	  <div className="panel-heading">
		<h3 className="panel-title"> Saved Articles</h3>
	  </div>
	  <div className="panel-body">
		{this.props.articles.map(function(result, i) {
		return (
		<div key={i}>
		  <h4>{result.title}</h4>
		  <p>{result.date}</p>
		  <a href={result.url}>{result.url}</a>
		  <br />
		  <button className="btn btn-danger" type="button" value={i} onClick={this.deleteArticle}>Delete Article</button>
		</div>
		);
		}.bind(this))}
	  </div>
	  </div>
    );
  }
});

module.exports = Saved;
