package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/moadben/OpenCode/databases"
)

var db databases.Database

// Projects returns all projects from the database via JSON
func Projects(c *gin.Context) {
	proj, err := db.ReturnProjects()
	if err != nil {
		log.Println(err)
	}
	c.JSON(http.StatusOK, proj)
}

// AddProject returns all projects from the database via JSON
func AddProject(c *gin.Context) {
	var proj databases.Project
	err := c.BindJSON(&proj)
	if err != nil {
		c.String(400, "Could not post project")
		return
	}
	err = db.InsertProject(proj)
	if err != nil {
		fmt.Println(err)
		c.String(400, "Could not post project")
		return
	}
}

// GetProject returns the project mapped to a unique ID
func GetProject(c *gin.Context) {
	id := c.Param("id")
	project, err := db.GetProjectByID(id)
	if err != nil {
		c.String(400, err.Error())
		return
	}
	c.JSON(http.StatusOK, project)
}

// Ideas returns all ideas from the database via JSON
func Ideas(c *gin.Context) {
	ideas, err := db.ReturnIdeas()
	if err != nil {
		c.String(400, err.Error())
		return
	}
	c.JSON(http.StatusOK, ideas)
}

// AddIdea returns all projects from the database via JSON
func AddIdea(c *gin.Context) {
	var idea databases.Idea
	err := c.BindJSON(&idea)
	if err != nil {
		c.String(400, "Could not post project")
		return
	}
	err = db.InsertIdea(idea)
	if err != nil {
		c.String(400, "Could not post project")
		return
	}
}

// GetIdea returns the project mapped to a unique ID
func GetIdea(c *gin.Context) {
	id := c.Param("id")
	idea, err := db.GetIdeaByID(id)
	if err != nil {
		c.String(400, "Could not grab project by ID")
		return
	}
	c.JSON(http.StatusOK, idea)
}

// Index is...
func Index(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{
		"title": "Index Page",
	})
}

func main() {
	//Flag initialization
	DBConn := flag.String("DB", "test", "DB Connection string for ")
	flag.Parse()

	//DB setup
	fmt.Println(*DBConn)
	temp, err := databases.NewDocDB(*DBConn)
	if err != nil {
		panic(err)
	}
	defer temp.Session.Close()
	db = &temp

	//Running of server
	r := gin.Default()
	//setting html folder in templates
	r.LoadHTMLGlob("templates/*")

	// GET
	r.GET("/", Index)
	r.GET("/projects", Projects)
	r.GET("/ideas", Ideas)

	r.GET("/projects/:id", GetProject)
	r.GET("/ideas/:id", GetIdea)

	// POST
	r.POST("/add_project", AddProject)
	r.POST("/add_idea", AddIdea)
	r.Run()
}