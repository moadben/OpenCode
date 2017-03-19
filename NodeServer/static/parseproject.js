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
    console.log({projects});
    return (
      <div>
        {
            projects.map(project => {

              project.onDockerClick = function (){generateDockerFile(project)}
              project.onSuperClick = function (){generateSuperScriptFile(project)}
              project.onRunScriptClick = function(){generateRunScriptFile(project)}
            return (
            <div key={project.projectid}>
              <p>{project.title}</p>
              <p>{project.description}</p>
              <ul>
              <div>
              <a href={'#start' + project.title}>
                <p><img className="colIcons" src="img/git.png"/> Start!</p>
              </a>




            <div id={'start' + project.title} className="modalDialog">
              <div> <a href="#close" title="Close" className="close">X</a>

                <div className="innerModal" id={'start' + project.title}>
                  <h1>Steps to environment set up</h1>
                  <br/>
                  <h3>1. Fork the Repo of the selected project</h3>
                  <script async defer src="https://buttons.github.io/buttons.js"></script>
                  <a className="github-button" href={project.giturl +'/fork'} data-icon="octicon-repo-forked" data-style="mega" data-count-href={project.userid + '/' + project.title + '/network'} data-count-api={'/repos/'+project.userid+'/'+project.title+'#forks_count'} data-count-aria-label="# forks on GitHub" aria-label={'Fork' +project.userid+'/'+project.title+' on GitHub'}>Fork</a>
                  <br/>

                  <ul>
                      <script src="js/fileGeneration.js"></script>
                        <li>
                          a. Open a terminal
                        </li>
                        <li>
                          b. Create a project folder<br/>
                          <code>mkdir ~/OpenCodeProjects; cd ~/OpenCodeProjects</code>
                        </li>
                        <li>
                          c. Clone the newly forked repo<br/>
                         <code>git clone {project.giturl}; cd {project.title}</code>
                        </li>
                        <li>
                          d. Preform either both steps 2 and 3, or just step 4<br/>
                        </li>
                      </ul>
                      <br/>
                    <h3>2. Download generated Dockerfile</h3>
                      <button className="docButton" onClick={project.onDockerClick}>Download Dockerfile</button>
                      <br/>
                      <br/>
                      <h3>3. Download Generated Run Scripts</h3>
                      <button className="docButton" onClick={project.onRunScriptClick}>Download Run Scripts</button>
                      <br/>

                      <ul>
                        <li>
                          a. Run the Downloaded Run Script<br/>
                          <code>chmod x+ opencode.sh; ./opencode.sh</code>
                        </li>
                        <li>
                          b. The environment should be up and running
                        </li>
                      </ul>
                      <br/>
                      <h3>4. Or Download Generated Super Script</h3>
                      <button className="docButton" onClick={project.onSuperClick}>Download Super Script</button>
                      <ul>
                        <li>
                          a. Run the Downloaded Run Script<br/>
                          <code>chmod x+ superScript.sh; ./superScript.sh</code>
                        </li>
                        <li>
                          b. The environment should be up and running
                        </li>
                      </ul>
                  
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
