package databases

import (
	"crypto/tls"
	"errors"
	"fmt"
	"net"
	"strconv"
	"strings"
	"time"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// A DocDB Object
type DocDB struct {
	Session        *mgo.Session
	IdeaCounter    int
	ProjectCounter int
}

// NewDocDB creates and returns a new DocumentDB connection
func NewDocDB(conn string) (DocDB, error) {
	// WORK AROUND FOR SSL //
	tlsConfig := &tls.Config{}
	tlsConfig.InsecureSkipVerify = true

	dialInfo, err := mgo.ParseURL(conn)

	if err != nil {
		return DocDB{}, err
	}

	dialInfo.DialServer = func(addr *mgo.ServerAddr) (net.Conn, error) {
		conn, err := tls.Dial("tcp", addr.String(), tlsConfig)
		return conn, err
	}

	// Actual connection
	session, err := mgo.DialWithInfo(dialInfo)
	if err != nil {
		return DocDB{}, err
	}
	db := DocDB{session, 0, 0}
	// SETTING PROJCOUNTER
	projects, err := db.ReturnProjects()
	if len(*projects) != 0 {
		x := len(*projects) - 1
		y := *projects
		projCounter := y[x].ProjectID
		db.ProjectCounter = projCounter + 1
	}
	// SETTING IDEACOUNTER
	ideas, err := db.ReturnIdeas()
	if len(*ideas) != 0 {
		x := len(*ideas) - 1
		z := *ideas
		ideaCounter := z[x].IdeaID
		db.IdeaCounter = ideaCounter + 1
	}
	return db, nil
}

// ReturnProjects returns all projects in the database
func (d *DocDB) ReturnProjects() (*[]Project, error) {
	d.Session.Refresh()
	Coll := d.Session.DB("opencode").C("projects")
	var result []Project
	err := Coll.Find(nil).All(&result)
	return &result, err
}

// ReturnIdeas returns all ideas in the database
func (d *DocDB) ReturnIdeas() (*[]Idea, error) {
	d.Session.Refresh()
	Coll := d.Session.DB("opencode").C("ideas")
	var result []Idea
	err := Coll.Find(nil).All(&result)
	return &result, err
}

// InsertProject inserts a project into the database
func (d *DocDB) InsertProject(Proj Project) error {
	d.Session.Refresh()
	// creating unique ID
	Proj.ProjectID = d.ProjectCounter
	d.ProjectCounter++
	// creating timestamp
	Proj.TimeStamp = time.Now()
	// manipulating url
	url := strings.Split(Proj.GitURL, "/")
	if len(url) > 2 {
		Proj.ProjectName = url[len(url)-1]
		Proj.UserName = url[len(url)-2]
	} else {
		return errors.New("Invalid Git URL provided")
	}
	Coll := d.Session.DB("opencode").C("projects")
	err := Coll.Insert(&Proj)
	return err
}

// InsertIdea is inserts an idea into the database
func (d *DocDB) InsertIdea(Idea Idea) error {
	d.Session.Refresh()
	Idea.IdeaID = d.IdeaCounter
	d.IdeaCounter++
	Idea.TimeStamp = time.Now()
	Coll := d.Session.DB("opencode").C("ideas")
	err := Coll.Insert(&Idea)
	return err
}

// GetProjectByID grabs one object through a unique project id
func (d *DocDB) GetProjectByID(id string) (*Project, error) {
	d.Session.Refresh()
	intID, err := strconv.Atoi(id)
	if err != nil {
		return nil, err
	}
	Coll := d.Session.DB("opencode").C("projects")
	var result Project
	err = Coll.Find(bson.M{"projectid": intID}).One(&result)
	return &result, err
}

// GetIdeaByID grabs one object through a unique idea id
func (d *DocDB) GetIdeaByID(id string) (*Idea, error) {
	d.Session.Refresh()
	intID, err := strconv.Atoi(id)
	if err != nil {
		return nil, err
	}
	Coll := d.Session.DB("opencode").C("ideas")
	var result Idea
	err = Coll.Find(bson.M{"ideaid": intID}).One(&result)
	return &result, err
}

// UpdateProjectEntry updates the comments for a project entry
func (d *DocDB) UpdateProjectEntry(project *Project) error {
	d.Session.Refresh()
	Coll := d.Session.DB("opencode").C("projects")

	fmt.Println(project.ProjectID)
	colQuerier := bson.M{"projectid": project.ProjectID}
	change := bson.M{"$set": bson.M{"discussion": project.Discussion}}
	err := Coll.Update(colQuerier, change)
	return err
}

// UpdateIdeaEntry updates the comments for a idea entry
func (d *DocDB) UpdateIdeaEntry(idea *Idea) error {
	d.Session.Refresh()
	Coll := d.Session.DB("opencode").C("ideas")

	colQuerier := bson.M{"ideaid": idea.IdeaID}
	change := bson.M{"$set": bson.M{"discussion": idea.Discussion}}
	err := Coll.Update(colQuerier, change)
	return err
}
