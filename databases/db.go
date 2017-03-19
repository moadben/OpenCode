package databases

import "time"

// Comment holds the userid, comment and timestamp related to comments
type Comment struct {
	UserID    string    `json:"userid"`
	Comment   string    `json:"comment"`
	TimeStamp time.Time `json:"timestamp"`
}

// Discussion holds multiple comments based on timestamp
type Discussion struct {
	Comments []Comment `json:"comments"`
}

//Project stores Project objects
type Project struct {
	Title       string     `json:"title"`
	Description string     `json:"description"`
	UserName    string     `json:"username"`
	ProjectID   int        `json:"projectid"`
	GitURL      string     `json:"giturl"`
	ProjectName string     `json:"projectname"`
	TimeStamp   time.Time  `json:"timestamp"`
	Discussion  Discussion `json:"discussion"`
	Languages   []string   `json:"languages"`
	AppPort     string     `json:"appport"`
	InitCommand string     `json:"initcommand"`
	RunCommand  string     `json:"runcommand"`
}

// Idea stores Idea objects
type Idea struct {
	Title       string     `json:"title"`
	Description string     `json:"description"`
	UserName    string     `json:"username"`
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
