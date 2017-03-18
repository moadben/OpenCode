const { render } = ReactDOM
const divStyle = {
  backgroundImage: 'url(ImgSrc/background.png)',

};

render(
  <div>
      <h1>Open Code</h1>
      <h2>GIT GOING WITH OPEN SOURCE</h2>
    </div>,
    document.getElementById('container')
)
// function splash(){
//   const splashText =  (
//     <div id="title">
//       <h1>Open Code</h1>
//       <h2>git going w open source</h2>
//     </div>
//   )
//
// };
//
//
// ReactDOM.render(
//   splashText,
// 	document.getElementById('container')
// )
