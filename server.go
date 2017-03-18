package main

import (
	"flag"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/moadben/OpenCode/databases"
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
	//Flag initialization
	DBConn := flag.String("DB", "test", "DB Connection string for ")
	flag.Parse()

	//DB setup
	fmt.Println(*DBConn)
	db, err := databases.NewDocDB(*DBConn)
	if err != nil {
		panic(err)
	}
	defer db.Session.Close()

	//Running of server
	r := gin.Default()
	//setting html folder in templates
	r.LoadHTMLGlob("templates/*")

	r.GET("/", Index)
	r.GET("/projects", Projects)
	r.GET("/ideas", Ideas)
	r.Run()
}
