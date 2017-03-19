var ProjForm = React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
  },

  onDifficultyChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {difficulty: e.target.value}));
  },

  onTitleChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {title: e.target.value}));
  },

  onGiturlChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {giturl: e.target.value}));
  },
  onDescriptionChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {description: e.target.value}));
  },

  onDependencyChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {dependency: e.target.value}));
  },

  onAppportChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {appport: e.target.value}));
  },

  onInitcommandChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {initcommand: e.target.value}));
  },

  onRuncommandChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {runcommand: e.target.value}));
  },

  onSubmit: function(e) {
    e.preventDefault();
    this.props.onSubmit();
    var json_data = JSON.stringify(this.props.value);
    console.log(json_data);
  },


  render: function(){
    var errors = this.props.value.errors || {};
    return(
      React.createElement('form', {onSubmit: this.onSubmit, className: 'ProjForm', noValidate: true},
        React.createElement('input', {
          type: 'text',
          className: errors.title && 'ProjForm-error',
          placeholder: 'Title (required)',
          value: this.props.value.title,
          onChange: this.onTitleChange,
        }),
        React.createElement('input', {
          type: 'text',
          className: errors.giturl && 'ProjForm-error',
          placeholder: 'Git URL (required)',
          value: this.props.value.giturl,
          onChange: this.onGiturlChange,
        }),
        React.createElement('textarea', {
          type: 'text',
          className: errors.description && 'ProjForm-error',
          placeholder: 'Description (required)',
          value: this.props.value.description,
          onChange: this.onDescriptionChange,
        }),
        React.createElement('textarea', {
          type: 'text',
          className: errors.dependency && 'ProjForm-error',
          placeholder: 'Dependencies (required) e.g.: node , build-essential',
          value: this.props.value.dependency,
          onChange: this.onDependencyChange,
        }),
        React.createElement('input', {
          type: 'text',
          className: errors.appport && 'ProjForm-error',
          placeholder: 'App Port (required)',
          value: this.props.value.appport,
          onChange: this.onAppportChange,
        }),
        React.createElement('textarea', {
          type: 'text',
          className: errors.initcommand && 'ProjForm-error',
          placeholder: 'Init Command (required)',
          value: this.props.value.initcommand,
          onChange: this.onInitcommandChange,
        }),
        React.createElement('textarea', {
          type: 'text',
          className: errors.runcommand && 'ProjForm-error',
          placeholder: 'Run Command (required)',
          value: this.props.value.runcommand,
          onChange: this.onRuncommandChange,
        }),
        React.createElement('button', {type: 'submit'}, "Add Project")
      )
    );
  },
});

var ProjItem = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    giturl: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
  },

  render: function() {
    return (
      React.createElement('li', {className: 'ProjItem'},
        React.createElement('h2', {className: 'ProjItem-title'}, this.props.title),
        React.createElement('h2', {className: 'ProjItem-giturlname'}, this.props.giturl),
        React.createElement('div', {className: 'ProjItem-description'}, this.props.description)
      )
    );
  },
});



var ProjView = React.createClass({
  propTypes: {
    projs: React.PropTypes.array.isRequired,
    newProj: React.PropTypes.object.isRequired,
    onNewProjChange: React.PropTypes.func.isRequired,
    onNewProjSubmit: React.PropTypes.func.isRequired,
  },

  render: function() {
    var projItemElements = this.props.projs
      .map(function(proj) { return React.createElement(ProjItem, proj); });

    return (
        React.createElement(ProjForm, {
          value: this.props.newProj,
          onChange: this.props.onNewProjChange,
          onSubmit: this.props.onNewProjSubmit,
        })
      );
    }
  });



var PROJ_TEMPLATE = {title: "", giturl: "", gitprojectname: "", description: "", dependency: "", appport: "", initcommand: "", runcommand: "", errors: null};

function updateNewProj(proj) {
  setState({ newProj: proj });
}


function submitNewProj(){
  var proj = Object.assign({}, state.newProj, {key: state.projs.length + 1, errors: {}});


  setState(
    Object.keys(proj.errors).length == 0
    ? {
      newProj: Object.assign({}, PROJ_TEMPLATE),
      projs: state.projs.slice(0).concat(proj),
    }
    : {newProj: proj}
  );
}

var state = {};

function setState(changes){
  Object.assign(state, changes);

  ReactDOM.render(
    React.createElement(ProjView, Object.assign({}, state,{
      onNewProjChange: updateNewProj,
      onNewProjSubmit: submitNewProj,
    })),
    document.getElementById('container')
  );
}

setState({
  projs: [
    {key: 1, title: "forkIt", giturl: "jason", gitprojectname: "sss", description: "sd", dependency: "wwqe", appport: "wqewqe", initcommand: "wwww", runcommand: "dvd", errors: null},
  ],
  newProj: Object.assign({}, PROJ_TEMPLATE),
});
