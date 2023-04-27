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
  getProjectById,
  getProjects,
  saveProject,
} from '../../Services/projects'
import styled from 'styled-components'

const Container = styled.div`
  ${'' /* background-color: #051622; */}
  background-color:white;
  color: #1ba098;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${'' /* justify-content: center; */}
  text-align: center;
  height: 100vh;
  fontsize: 35px;
`

const BackButton = styled.div`
  position: fixed;
  top: 150px;
  left: 0;
  width: 200px;
  height: 100%;
  a {
    color: #1ba098;
    text-decoration: none;
  }
`

const Projects = () => {
  const [user, setUser] = useRecoilState(userState)
  const [teamState, setTeamState] = useRecoilState(currentTeamState)
  const [company, setCompany] = useRecoilState(companyState)
  const [newOpen, setNewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [projects, setProjects] = useState([{}])
  const [projectListUpdate, setProjectsListUpdate] = useState(0)
  const [currentProjectId, setCurrentProjectId] = useState(null)
  const [projectName, setProjectName] = useState('')
  const [description, setDescription] = useState('')
  const [isActiveProject, setIsActiveProject] = useState(null)

  useEffect(() => {
    async function fetchData() {
      let data
      if (user.admin) {
        data = await getProjects(company.id, teamState.id)
      } else {
        data = await getProjects(user.companies[0].id, teamState.id)
      }

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

  const handleNewSubmit = async () => {
    await createProject(
      {
        name: projectName,
        description: description,
        active: true,
        team: teamState,
      },
      {
        id: user.id,
        profile: user.profile,
        admin: user.admin,
        active: user.active,
        status: user.status,
      }
    )
    setProjectName('')
    setDescription('')
    setProjectsListUpdate(projectListUpdate + 1)
    setNewOpen(false)
  }

  const handleEditOpen = async (projectId) => {
    //Populate text with correct values and current project
    const currentProject = await getProjectById(projectId)
    setCurrentProjectId(projectId)
    setProjectName(currentProject.name)
    setDescription(currentProject.description)
    setIsActiveProject(currentProject.active)
    setEditOpen(true)
  }

  const handleEditClose = () => {
    //Reset current project and text fields
    setCurrentProjectId(null)
    setProjectName('')
    setDescription('')
    setEditOpen(false)
  }

  const handleEditSave = async () => {
    //Edit project with correct id and send to database
    const currentProject = await getProjectById(currentProjectId)

    await saveProject({
      ...currentProject,
      name: projectName,
      description: description,
      active: isActiveProject,
    })

    setCurrentProjectId(null)
    setProjectName('')
    setDescription('')
    setProjectsListUpdate(projectListUpdate + 1)
    setEditOpen(false)
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
      <>
        <div>
          <NavBar />
        </div>
        <Container>
          <BackButton>
            <Button>
              <Link to='/teams'>
                <ArrowBackIosIcon />
                Back
              </Link>
            </Button>
          </BackButton>

          <h1>Projects For {teamState.name}</h1>
          {user.admin && (
            <Button variant='outlined' onClick={handleNewOpen}>
              New
            </Button>
          )}
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
                        value={project.id}
                        onClick={() => handleEditOpen(project.id)}
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
                defaultValue={projectName}
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
                defaultValue={description}
              />
            </DialogContent>
            <DialogTitle>Active?</DialogTitle>
            <InputLabel>Pick an option</InputLabel>
            <Select
              label='Pick an option'
              value={isActiveProject === null ? '' : isActiveProject}
              onChange={handleActiveChange}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            <DialogActions>
              <Button onClick={handleEditSave}>Save</Button>
            </DialogActions>
          </Dialog>
        </Container>
      </>
    )
  }
}

export default Projects
