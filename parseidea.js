var Main = React.createClass({
  getInitialState: function() {
    return {
      ideas: [],
    };
  },

  componentDidMount: async function() {
    const request = await fetch('/ideadata.json');
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

// var IdeaList = React.createClass({
//   render: function() {
//     var {ideas} = this.props;
//     var renderIdeas = () => {
//       return ideas.map(idea => {
//         return (
//           <Idea key={idea.title} name={idea.description} value={}
//         );
//       }
//     }
//   }
// });

// var CommentList = React.createClass({
//   render: function() {
//     var {comments} = this.props;
//     var renderComments = () => {
//       return ideas.map(idea => {
//         return (
//           <Idea key={idea.title} name={idea.description} value={}
//         );
//       }
//     }
//   }
// });


ReactDOM.render(<Main/>, document.getElementById('blah'));
