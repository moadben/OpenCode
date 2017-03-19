<<<<<<< HEAD
var Project = React.createClass({
=======
var Pproject = React.createClass({
>>>>>>> origin/master
  getInitialState: function() {
    return {
      projects: [],
    };
  },

  componentDidMount: async function() {
    const request = await fetch('/projectdata.json');
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
            <div key={project.title}>
              <p>{project.title}</p>
              <p>{project.description}</p>
<<<<<<< HEAD
              <p>{project.gitprojectname}</p>
              <p>{project.username}</p>
=======
>>>>>>> origin/master
              <ul>
                {
                  project.discussion.map(comment => <li key={comment.comment}>{comment.comment}</li>)
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


<<<<<<< HEAD
ReactDOM.render(<Project/>, document.getElementById('ooo'));
=======
ReactDOM.render(<Pproject/>, document.getElementById('ooo'));
>>>>>>> origin/master
