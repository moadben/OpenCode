package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Projects is...
func Projects(c *gin.Context) {
	c.String(http.StatusOK, "wagwaan")
}

// Ideas is...
func Ideas(c *gin.Context) {
	c.String(http.StatusOK, "rudeboi")
}

// Index is...
func Index(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{
		"title": "Main website",
	})
}

func main() {
	r := gin.Default()
	//setting html folder in templates
	r.LoadHTMLGlob("templates/*")

	r.GET("/", Index)
	r.GET("/projects", Projects)
	r.GET("/ideas", Ideas)
	r.Run()
}
