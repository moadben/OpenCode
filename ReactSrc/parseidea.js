var Pidea = React.createClass({
  getInitialState: function() {
    return {
      ideas: [],
    };
  },

  componentDidMount: async function() {
    const request = await fetch('http://opencode.me:8080/ideas');
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
            <div key={idea.ideaid}>
              <p>{idea.title}</p>
              <p>{idea.description}</p>
              <ul>
                {
                  idea.discussion.comments.map(comment => <li key={comment.comment}>{comment.comment}</li>)
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


ReactDOM.render(<Pidea/>, document.getElementById('blah'));
