const { render } = ReactDOM

render(
	<h1 id='title'
		className='header'
		style={{backgroundColor: 'orange', color: 'white', fontFamily: 'verdana'}}>
Hello</h1>,
	document.getElementById('container')
)
