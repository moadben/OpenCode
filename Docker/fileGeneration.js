String.format = function() {
  var s = arguments[0];
  for (var i = 0; i < arguments.length - 1; i++) {       
      var reg = new RegExp("\\{" + i + "\\}", "gm");             
      s = s.replace(reg, arguments[i + 1]);
  }
  return s;
}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

function generateSuperScriptFile(project){
	var filename = "superScript.sh";
	var contents = generateSuperScriptFileContents(project);
	download(filename, contents);
}

function generateSuperScriptFileContents(project){

	var gitusername = project["gitusername"];
	var gitprojectname = project["gitprojectname"];
	var dependencies = project["dependencies"].join(" ");
	var appport = project["appport"];
	var runcommand = project["runcommand"];
	var initcommand = project["initcommand"];


	var contentsFormat = `
#!/bin/bash\n
# -- Generate Dockerfile 
echo "\n
{0}\n
" > Dockerfile\n\n

{1}
`

	var contents = String.format(contentsFormat, generateDockerFileContent(project), generateRunScriptFileContents(project));
	console.log("content: \n" + contents);
	return contents;
}

function generateDockerFile(project){

	var filename = "Dockerfile"
	var contents = generateDockerFileContent(project);

	download(filename, contents);
}

function generateDockerFileContent(project){
	var gitusername = project["gitusername"];
	var gitprojectname = project["gitprojectname"];
	var dependencies = project["dependencies"].join(" ");
	var appport = project["appport"];
	var runcommand = project["runcommand"];
	var initcommand = project["initcommand"];


	var contentsFormat = `FROM alpine:3.3\n
RUN apk update && apk upgrade && mkdir /home/app && apk add git bash {0}
WORKDIR /home/app\n
#COPY package.json /home/app\n
#RUN npm install\n
#RUN npm init -f && npm install express --save\n
COPY . /home/app\n
\n
RUN {1}

EXPOSE {2}\n
CMD {3}\n
`

	var contents = String.format(contentsFormat, dependencies, initcommand, appport, runcommand);
	console.log("content: \n" + contents);
	return contents;
}

function generateRunScriptFile(project){

	var filename = "opencode.sh"
	var contents = generateRunScriptFileContents(project);

	download(filename, contents);
}

function generateRunScriptFileContents(project){
	var gitusername = project["gitusername"];
	var gitprojectname = project["gitprojectname"];
	var dependencies = project["dependencies"].join(" ");
	var appport = project["appport"];
	var runcommand = project["runcommand"];
	var initcommand = project["initcommand"];


	var contentsFormat = `
#!/bin/bash\n
# -- Build the docker container with name {0}\n
docker build -t {0} .\n\n
# -- Run the application in a background process\n
docker run -p 127.0.0.1:{1}:{1} --name {0} -t {0} &\n\n
# -- Access the container and map the current directory to the in container app dir\n
docker run -t -i -v $(pwd):/home/app  {0} /bin/bash\n
`

	var contents = String.format(contentsFormat, gitprojectname.toLowerCase(), appport);
	console.log("content: \n" + contents);
	return contents;
}

// Sample Idea object
var idea = {
	"title": "Title of Idea",
	"description": "Description of Idea",
	"timestamp" : "2017-12-12",
	"discussion": [
		{
			"username": "testuser",
			"comment" : "comment"
		}
	],
}	

//Sample Project object
var project = {
	"title": "Title of project",
	"description": "Description of project",
	"gitprojectname": "gitprojectname",
	"gitusername": "gitusername",
	"dependencies": ["nodejs", "apache2"],
	"appport" : "8080",
	"initcommand": "npm install",
	"runcommand": "npm start",
	"discussion": [
		{
			"username": "testuser",
			"comment" : "comment"
		}
	],
	"timestamp": "2017-12-12",
}


//Sample Project object
var TestNodeApp = {
	"title": "TestNodeApp",
	"description": "This is an app to test node",
	"gitprojectname": "TestNodeApp",
	"gitusername": "soxies1",
	"dependencies": ["nodejs", "apache2"],
	"appport" : "8080",
	"initcommand": "npm install",
	"runcommand": "node app.js",
	"discussion": [
		{
			"username": "testuser",
			"comment" : "comment"
		}
	],
	"timestamp": "2017-12-12",
}