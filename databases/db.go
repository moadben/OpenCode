package databases

import "time"

// Comment is...
type Comment struct {
	ID        string
	Comment   string
	TimeStamp time.Time
}

// Discussion is...
type Discussion struct {
	Comment []Comment
}

//Project stores Project objects
type Project struct {
	Title       string
	Description string
	ID          string
	TimeStamp   time.Time
	Languages   []string
}

// Idea stores Idea objects
type Idea struct {
	Title       string
	Description string
	ID          string
	TimeStamp   time.Time
	Discussion  Discussion
}

// Database is the interface all databases must comply with
type Database interface {
	ReturnProjects() (*[]Project, error)
	ReturnIdeas() (*[]Idea, error)
	InsertProject(proj Project) error
	InsertIdea(idea Idea) error
}
