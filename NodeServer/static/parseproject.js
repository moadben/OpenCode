var Pproject = React.createClass({
  getInitialState: function() {
    return {
      projects: [],
    };
  },

  componentDidMount: async function() {
    const request = await fetch('http://opencode.me:8080/projects');
    const projects = await request.json();
    this.setState({ projects });
  },

  componentWillUnmount: function() {
    // this.serverRequest.abort();
  },

  render: function() {
    var {projects} = this.state;
    return (
      <div>
        {
            projects.map(project => {
            return (
            <div key={project.projectid}>
              <p>{project.title}</p>
              <p>{project.description}</p>
              <ul>
                {
                  project.discussion.comments.map(comment => <li key={comment.comment}>{comment.comment}</li>)
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

ReactDOM.render(<Pproject/>, document.getElementById('ooo'));
