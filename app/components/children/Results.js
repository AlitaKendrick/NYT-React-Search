var React = require("react");
var helpers = require("../utils/helpers");


var Results = React.createClass({

  getInitialState: function() {
  	return { savedArticles: [] };
  },

  saveArticleToDb: function(event) {
	helpers.postSavedArticles(this.props.articles[event.target.value]).then(function() {
	  helpers.getSavedArticles().then(function(response) {
		this.props.parentSaved(response.data);
	  }.bind(this));
	}.bind(this));
  },

//render the component
  render: function() {
	return (
	  <div className="results-container">
		  <div className="panel-heading">
			<h3 className="panel-title"> Results</h3>
		  </div>
		  <div className="panel-body">
			{this.props.articles.map(function(result, i) {
			return (
			  <div key={i}>
				<h3>{result.title}</h3>
				<p>{result.date}</p>
			    <a href={result.url}>{result.url}</a>
				<br />
				<button className="btn btn-success" id="save-article-button" type="button" value={i} onClick={this.saveArticleToDb}>Save Article</button>
			  </div>
			);
			}.bind(this))}
		  </div>
	  </div>
	);
  }
});


module.exports = Results;
