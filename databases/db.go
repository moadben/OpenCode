package db

//Project stores Project objects
type Project struct {
}

// Idea stores Idea objects
type Idea struct {
}

// Database is the interface all databases must comply with
type Database interface {
	ReturnProjects() (*[]Project, error)
	ReturnIdeas() (*[]Idea, error)
	InsertProject(proj Project) error
	InsertIdea(idea Idea) error
}
