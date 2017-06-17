var React = require("react");
var ReactDOM = require("react-dom");

//bring in components
var Main = require("./components/Main");
var Saved = require("./components/children/Saved");
var Search = require("./components/children/Search");

ReactDOM.render(<div className="main-container"> <Main /> </div>,
 document.getElementById("app")
);
