var React = require("react");
var Results = require('./Results.js');

var Query = React.createClass({
  render: function() {
	return (
	  <div>
		<Results 
		  articles={this.props.articleArray}
		  parentSaved={this.props.parentSaved} 
		/>
	  </div>
	);
  }
});


module.exports = Query;
