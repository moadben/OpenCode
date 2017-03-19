var Main = React.createClass({
  getInitialState: function() {
    return {
      sensors: [],
    };
  },

  componentDidMount: function() {
    var _this = this;
    this.serverRequest =
      axios
        .get("http://localhost:3000/testdata.json")
        .then(function(result) {
          _this.setState({
            sensors: result.data
          });
        }) // chain api calls to obtain ALL data needed
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    var {sensors} = this.state;

    return (
      <h1>Ideas!</h1>
      {this.state.sensors.map(function)}
        <div>
            {sensors}
        </div>
    );
  }
});


ReactDOM.render(<Main/>, document.getElementById('blah'));
