import { PropTypes, Component } from 'react'

export class newProjForm extends Component{
  constructor(props){
    super(props)
    this.submit = this.submit.bind(this)
  }


  submit(e){
    e.preventDefault()
    console.log('title', this.refs.title.value)
    console.log('owner', this.refs.owner.value)
    console.log('description', this.refs.description.value)
    console.log('timestamp', this.refs.timestamp.checked)
  }


  render(){
    const {title, description, timestamp} = this.props

    return(
      <form onSubmit={this.submit} className="newProjForm">

        <label htmlFor="title">Project title</label>
        <input id="title" type="text" required ref="title"/>

        <label htmlFor="owner">Idea Owner</label>
        <input id="owner" type="text" required ref="owner"/>

        <label htmlFor="description">Idea Owner</label>
        <input id="description" type="text" required ref="description"/>

        <button>Submit idea</button></form>
    )
  }
}
