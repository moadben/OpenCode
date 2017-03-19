var Main = React.createClass({
  getInitialState: function() {
    return {
      ideas: [],
    };
  },

  componentDidMount: async function() {
    const request = await fetch('/testdata.json');
    const ideas = await request.json();
    this.setState({ ideas });
  },

  componentWillUnmount: function() {
    // this.serverRequest.abort();
  },

  render: function() {
    var {ideas} = this.state;
    return (
      <div>
        {
            ideas.map(idea => {
            return (
            <div key={idea.title}>
              <p>{idea.title}</p>
              <p>{idea.description}</p>
              <ul>
                {
                  idea.discussion.map(comment => <li key={comment.comment}>{comment.comment}</li>)
                }
              </ul>
              <hr></hr>
            </div>
            )
          })
        }
      </div>
    );
  }
});


ReactDOM.render(<Main/>, document.getElementById('blah'));
