package databases

import "time"

// Comment is...
type Comment struct {
	UserID    string    `json:"userid"`
	Comment   string    `json:"comment"`
	TimeStamp time.Time `json:"timestamp"`
}

// Discussion is...
type Discussion struct {
	Comments []Comment `json:"comments"`
}

//Project stores Project objects
type Project struct {
	Title       string     `json:"title"`
	Description string     `json:"description"`
	UserID      string     `json:"userid"`
	ProjectID   int        `json:"projectid"`
	GitURL      string     `json:"giturl"`
	TimeStamp   time.Time  `json:"timestamp"`
	Discussion  Discussion `json:"discussion"`
	Languages   []string   `json:"languages"`
}

// Idea stores Idea objects
type Idea struct {
	Title       string     `json:"title"`
	Description string     `json:"description"`
	UserID      string     `json:"userid"`
	IdeaID      int        `json:"ideaid"`
	TimeStamp   time.Time  `json:"timestamp"`
	Discussion  Discussion `json:"discussion"`
}

// Database is the interface all databases must comply with
type Database interface {
	ReturnProjects() (*[]Project, error)
	ReturnIdeas() (*[]Idea, error)
	GetProjectByID(id string) (*Project, error)
	GetIdeaByID(id string) (*Idea, error)
	InsertProject(proj Project) error
	InsertIdea(idea Idea) error
	UpdateProjectEntry(project *Project) error
	UpdateIdeaEntry(idea *Idea) error
}
