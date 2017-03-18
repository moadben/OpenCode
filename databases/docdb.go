package db

import (
	"errors"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// A DocDB Object
type DocDB struct {
	Session *mgo.Session
}

// NewDocDB creates and returns a new DocumentDB connection
func NewDocDB(conn string) (DocDB, error) {
	session, err := mgo.Dial(conn)
	if err != nil {
		return DocDB{}, errors.New("Could not connect to DocDB server")
	}
	defer session.Close()

	// Optional. Switch the session to a monotonic behavior.
	session.SetMode(mgo.Monotonic, true)

	return DocDB{session}, nil
}

// ReturnProjects is...
func (d *DocDB) ReturnProjects() (*[]Project, error) {
	Coll := d.Session.DB("opencode").C("projects")
	result := new([]Project)
	err := Coll.Find(bson.M{}).All(&result)
	return result, err
}

// ReturnIdeas is...
func (d *DocDB) ReturnIdeas() (*[]Idea, error) {
	Coll := d.Session.DB("opencode").C("ideas")
	result := new([]Idea)
	err := Coll.Find(bson.M{}).All(&result)
	return result, err
}

// InsertProject is...
func (d *DocDB) InsertProject(Proj Project) error {
	Coll := d.Session.DB("opencode").C("projects")
	err := Coll.Insert(&Proj)
	return err
}

// InsertIdea is...
func (d *DocDB) InsertIdea(Idea Idea) error {
	Coll := d.Session.DB("opencode").C("ideas")
	err := Coll.Insert(&Idea)
	return err
}
