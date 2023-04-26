import { Link, Navigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import NavBar from '../../Components/NavBar'
import { companyState, currentTeamState, userState } from '../../globalstate'
import { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'

import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import {
  createProject,
  getProjects,
  saveProject,
} from '../../Services/projects'

const Projects = () => {
  const [user, setUser] = useRecoilState(userState)
  const [teamState, setTeamState] = useRecoilState(currentTeamState)
  const [company, setCompany] = useRecoilState(companyState)
  const [newOpen, setNewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [projects, setProjects] = useState([{}])
  const [projectListUpdate, setProjectsListUpdate] = useState(false)
  const [currentProject, setCurrentProject] = useState({})
  const [projectName, setProjectName] = useState('')
  const [description, setDescription] = useState('')
  const [isActiveProject, setIsActiveProject] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const data = await getProjects(company.id, teamState.id)
      setProjects(data)
    }
    fetchData()
  }, [projectListUpdate, company, teamState])

  const handleNewOpen = () => {
    //Empty text fields
    setProjectName('')
    setDescription('')
    setNewOpen(true)
  }

  const handleNewClose = () => {
    //Empty text fields
    setProjectName('')
    setDescription('')
    setNewOpen(false)
  }

  const handleNewSubmit = () => {
    //Create new project and send to database
    createProject(
      {
        name: projectName,
        description: description,
        active: isActiveProject,
        team: teamState,
      },
      {
        id: user.id,
        profile: user.profile,
        isAdmin: user.isAdmine,
        active: user.active,
        status: user.status,
      }
    )
    setProjectName('')
    setDescription('')
    setProjectsListUpdate(!projectListUpdate)
    setNewOpen(false)
  }

  const handleEditOpen = (project) => {
    //Populate text with correct values and current project
    setCurrentProject(project)
    setProjectName(project.name)
    setDescription(project.description)
    setIsActiveProject(project.active)
    setEditOpen(true)
  }

  const handleEditClose = () => {
    //Reset current project and text fields
    setCurrentProject({})
    setProjectName('')
    setDescription('')
    setEditOpen(false)
  }

  const handleEditSave = () => {
    //Edit project with correct id and send to database
    setCurrentProject({
      ...currentProject,
      name: projectName,
      description: description,
      active: isActiveProject,
    })
    saveProject(currentProject)
    setProjectsListUpdate(!projectListUpdate)
  }

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handleActiveChange = (event) => {
    setIsActiveProject(event.target.value)
  }

  if (!user.isLoggedIn) {
    return <Navigate replace to='/' />
  } else if (teamState === {}) {
    return <Navigate replace to='/teams' />
  } else {
    return (
      <div>
        <NavBar />
        <br />
        <br />
        <Button>
          <Link to='/teams'>
            <ArrowBackIosIcon />
            Back
          </Link>
        </Button>
        <h1>Projects For {teamState.name}</h1>
        <Button variant='outlined' onClick={handleNewOpen}>
          New
        </Button>
        <Dialog open={newOpen} onClose={handleNewClose}>
          <DialogActions>
            <IconButton onClick={handleNewClose}>
              <HighlightOffIcon />
            </IconButton>
          </DialogActions>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='Project-Name'
              label='Project Name'
              type='text'
              fullWidth
              variant='standard'
              value={projectName}
              onChange={handleProjectNameChange}
            />
            <TextField
              autoFocus
              margin='dense'
              id='Description'
              label='Description'
              type='text'
              fullWidth
              variant='standard'
              value={description}
              onChange={handleDescriptionChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNewSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
        <Grid item xs={12} md={6}>
          <div>
            <List dense={false}>
              {projects.map((project) => (
                <ListItem
                  key={project.id}
                  secondaryAction={
                    <Button
                      onClick={(project) => handleEditOpen(project)}
                      edge='end'
                      aria-label='edit'
                    >
                      Edit
                    </Button>
                  }
                >
                  <ListItemText
                    primary={
                      <>
                        {project.name}
                        {project.active ? (
                          <Button style={{ marginLeft: 70 }}>Active</Button>
                        ) : (
                          <Button style={{ marginLeft: 70 }}>Inactive</Button>
                        )}
                      </>
                    }
                    secondary={project.description}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
        <Dialog open={editOpen} onClose={handleEditClose}>
          <DialogActions>
            <IconButton onClick={handleEditClose}>
              <HighlightOffIcon />
            </IconButton>
          </DialogActions>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Project Name'
              type='text'
              fullWidth
              variant='standard'
              value={projectName}
              onChange={handleProjectNameChange}
            />
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Description'
              type='text'
              fullWidth
              variant='standard'
              value={description}
              onChange={handleDescriptionChange}
            />
          </DialogContent>
          <DialogTitle>Active?</DialogTitle>
          <InputLabel>Pick an option</InputLabel>
          <Select
            value={isActiveProject}
            label='Pick an option'
            onChange={handleActiveChange}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
          <DialogActions>
            <Button onClick={handleEditSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default Projects
