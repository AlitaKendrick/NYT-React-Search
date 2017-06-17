var React = require("react");
var Query = require('./Query.js');
var helpers = require("../utils/helpers");

var Search = React.createClass({
  getInitialState: function() {
    return {
	  topic: "",
	  startYear: "",
	  endYear: "",
	  articleArray: []
	}
  },
  
  handleChange: function(key) {
    return function(e){
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  },

  handleSubmit: function(event) {
	event.preventDefault();
	  helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear).then(function(data) {
	  this.setState({ 
	    topic: "",
	    startYear: "",
	    endYear: "",
	    articleArray: data 
	  });
	}.bind(this));
  },
//render search form
  render: function() {
	return (
	  <div class="search-container">
	  <div className="panel-heading">
		<h3 className="panel-title">Search NYT Articles</h3>
	  </div>
	  <div className="panel-body">
	  <form onSubmit={this.handleSubmit}>
		<div className="form-group">
		 <center> Topic:</center><input type="text" className="form-control" value={this.state.topic} onChange={this.handleChange('topic')} />
		</div>
		<div className="form-group">
		  <center>Start Year: </center><input type="text" className="form-control" value={this.state.startYear} onChange={this.handleChange('startYear')} />
		</div>
		<div className="form-group">
		 <center> End Year: </center><input type="text" className="form-control" value={this.state.endYear} onChange={this.handleChange('endYear')} />
		</div>
		<button className="btn btn-primary" type="submit">Submit</button>
	  </form>
	  </div>

	  <Query
		articleArray={this.state.articleArray}
		parentSaved={this.props.parentSaved}
	  />
	  </div>
	);
	}
});

module.exports = Search;
