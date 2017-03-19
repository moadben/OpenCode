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
              <div>
              <a href="#start">
                <p><img className="colIcons" src="img/git.png"/> Start!</p>
              </a>



            <div id="start" className="modalDialog">
              <div> <a href="#close" title="Close" className="close">X</a>

                <div className="innerModal" id="start">
                  <h1>Steps to environment set up</h1>
                  <br/>
                  <h3>1. Fork the Repo of the selected project</h3>
                  <a className="github-button" href="{project.giturl}/fork" data-icon="octicon-repo-forked" data-style="mega" data-count-href="{project.userid}/{project.title}/network" data-count-api="/repos/{project.userid}/{project.title}#forks_count" data-count-aria-label="# forks on GitHub" aria-label="Fork {project.userid}/{project.title} on GitHub">Fork</a>
                  <br/>

                  <ul >
                  <script src="js/fileGeneration.js"></script>
                    <li>
                      X. Open a terminal
                    </li>
                    <li>
                      X. Create a project folder
                      <span>mkdir OpenCodeProjects; cd OpenCodeProjects</span>
                    </li>
                    <li>
                      X. Clone the newly forked repo
                     <span>git clone {project.giturl}; cd {project.title}</span>
                    </li>
                  </ul>
                  <br/>
                  <h3>3. Download generated Dockerfile</h3>
                  <button className="docButton" onclick="generateDockerFile(TestNodeApp);">Download Dockerfile</button>
                  <br/>
                  <br/>
                  <h3>4. Download Generated Run Scripts</h3>
                  <button className="docButton" onclick="generateRunScriptFile(TestNodeApp);">Download Run Scripts</button>
                  <br/>
                  <br/>
                  <h3>5. Or Download Generated Super Script</h3>
                  <button className="docButton" onclick="generateSuperScriptFile(TestNodeApp);">Download Super Script</button>
                </div>
                </div>
              </div>
            </div>
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

ReactDOM.render(<Pproject/>, document.getElementById('projectSec'));
