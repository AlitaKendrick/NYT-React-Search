var React = require("react");
var Search = require('./children/Search.js');
var Saved = require('./children/Saved.js');
var helpers = require("./utils/helpers");

// main component
var Main = React.createClass({

  getInitialState: function() {
	return { savedArticle: [] };
  },
  
  getSaved: function(articles) {
	this.setState({ savedArticle: articles });
  },

//render main component
  render: function() {
	return (
	  <div className="main-container">
	    <div className="container">
		  <Search parentSaved={this.getSaved} />
			<Saved 
			  articles={this.state.savedArticle}
			  parentSaved={this.getSaved} 
			/>
		</div>
	</div>
	);
  }
});

module.exports = Main;
