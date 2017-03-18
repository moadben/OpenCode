package databases

import (
	"crypto/tls"
	"fmt"
	"net"

	"gopkg.in/mgo.v2"
)

// A DocDB Object
type DocDB struct {
	Session *mgo.Session
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

	return DocDB{session}, nil
}

// ReturnProjects is...
func (d *DocDB) ReturnProjects() (*[]Project, error) {
	d.Session.Refresh()
	Coll := d.Session.DB("opencode").C("projects")
	var result []Project
	err := Coll.Find(nil).All(&result)
	return &result, err
}

// ReturnIdeas is...
func (d *DocDB) ReturnIdeas() (*[]Idea, error) {
	d.Session.Refresh()
	Coll := d.Session.DB("opencode").C("ideas")
	var result []Idea
	err := Coll.Find(nil).All(&result)
	return &result, err
}

// InsertProject is...
func (d *DocDB) InsertProject(Proj Project) error {
	d.Session.Refresh()
	fmt.Println(Proj)
	Coll := d.Session.DB("opencode").C("projects")
	err := Coll.Insert(&Proj)
	return err
}

// InsertIdea is...
func (d *DocDB) InsertIdea(Idea Idea) error {
	d.Session.Refresh()
	Coll := d.Session.DB("opencode").C("ideas")
	err := Coll.Insert(&Idea)
	return err
}
