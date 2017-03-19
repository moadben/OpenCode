/*
 * Components
 */


var IdeaForm = React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
  },

  onTitleChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {title: e.target.value}));
  },

  onOwnerChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {owner: e.target.value}));
  },


  onDescriptionChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {description: e.target.value}));
  },

  onSubmit: function(e) {
    e.preventDefault();
    this.props.onSubmit();
    var json_data = JSON.stringify(this.props.value);
    console.log(json_data);
  },

  render: function() {
    var errors = this.props.value.errors || {};

    return (
      React.createElement('form', {onSubmit: this.onSubmit, className: 'IdeaForm', noValidate: true},
        React.createElement('input', {
          type: 'text',
          className: errors.title && 'IdeaForm-error',
          placeholder: 'Title (required)',
          value: this.props.value.title,
          onChange: this.onTitleChange,
        }),
        React.createElement('input', {
          type: 'text',
          className: errors.owner && 'IdeaForm-error',
          placeholder: 'Owner (required)',
          value: this.props.value.owner,
          onChange: this.onOwnerChange,
        }),
        React.createElement('textarea', {
          placeholder: 'Description',
          value: this.props.value.description,
          onChange: this.onDescriptionChange,
        }),
        React.createElement('button', {type: 'submit'}, "Add Idea")
      )
    );
  },
});


var IdeaItem = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    owner: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
  },

  render: function() {
    return (
      React.createElement('li', {className: 'IdeaItem'},
        React.createElement('h2', {className: 'IdeaItem-title'}, this.props.title),
        React.createElement('h2', {className: 'IdeaItem-owner'}, this.props.owner),
        React.createElement('div', {className: 'IdeaItem-description'}, this.props.description)
      )
    );
  },
});


var IdeaView = React.createClass({
  propTypes: {
    ideas: React.PropTypes.array.isRequired,
    newIdea: React.PropTypes.object.isRequired,
    onNewIdeaChange: React.PropTypes.func.isRequired,
    onNewIdeaSubmit: React.PropTypes.func.isRequired,
  },

  render: function() {
    var ideaItemElements = this.props.ideas
      .map(function(idea) { return React.createElement(IdeaItem, idea); });

    return (
      React.createElement('div', {className: 'IdeaView'},
        React.createElement('h1', {className: 'IdeaView-title'}, "Ideas"),
        React.createElement('ul', {className: 'IdeaView-list'}, ideaItemElements),
        React.createElement(IdeaForm, {
          value: this.props.newIdea,
          onChange: this.props.onNewIdeaChange,
          onSubmit: this.props.onNewIdeaSubmit,
        })
      )
    );
  },
});


/*
 * Constants
 */


var IDEA_TEMPLATE = {title: "", owner: "", description: "", errors: null};



/*
 * Actions
 */


function updateNewIdea(idea) {
  setState({ newIdea: idea });
}


function submitNewIdea() {
  var idea = Object.assign({}, state.newIdea, {key: state.ideas.length + 1, errors: {}});

  if (!idea.owner) {
    idea.errors.owner = ["Please enter your new idea's owner"];
  }

  setState(
    Object.keys(idea.errors).length === 0
    ? {
        newIdea: Object.assign({}, IDEA_TEMPLATE),
        ideas: state.ideas.slice(0).concat(idea),
      }
    : { newIdea: idea }
  );
}


/*
 * Model
 */


// The app's complete current state
var state = {};

// Make the given changes to the state and perform any required housekeeping
function setState(changes) {
  Object.assign(state, changes);

  ReactDOM.render(
    React.createElement(IdeaView, Object.assign({}, state, {
      onNewIdeaChange: updateNewIdea,
      onNewIdeaSubmit: submitNewIdea,
    })),
    document.getElementById('container')
  );
}

// Set initial data
setState({
  ideas: [
    {key: 1, title: "forkIt", owner: "James K Nelson",  description: "Front-end Unicorn"},
    {key: 2, title: "hello world", owner: "Jim"},
  ],
  newIdea: Object.assign({}, IDEA_TEMPLATE),
});
