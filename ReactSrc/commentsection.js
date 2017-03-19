var Comment1 = React.createClass ({
  render: function() {
    return (
      <div className="comment">
        <h3 className="commentUser">
          {this.props.userid}
        </h3>
        {this.props.comment}
      </div>
    );
  }
});

var CommentList = React.createClass ({
    var {cgroup} = this.state;

    return (
      <div className="CommentList">
        {
          cgroup.discussion.comments.map(comment => {
            <Comment1 key={comment.timestamp} author={comment.comment}>
              {comment.comment}
            </Comment1>
          })
        }
      </div>
    );
  }
});


var CommentForm = React.createClass ({
  render: function() {
    return (
      <div className="commentForm">
        CommentForm is here
      </div>
    );
  }
});



var CommentSection = React.createClass ({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: async function() {
    const request = await fetch('/projectdata.json');
    const projects = await request.json();
    this.setState({ data });
  },
  render: function() {
    return (
      <div className="commentSection">
        <h1>CommentSection</h1>
        <CommentList/>
        <CommentForm/>
      </div>
    );
  }
});

ReactDOM.render(<CommentSection/>, document.getElementById('cbox'));
