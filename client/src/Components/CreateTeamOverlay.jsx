import * as React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useRecoilState } from "recoil"
import { companyState, userState } from "../globalstate"
import { display, width } from "@mui/system"
import api from "../Services/api"
import { createTeam, addTeamToCompany } from "../Services/teams"

const CreateTeamOverlay = () => {
  const [company, setCompany] = useRecoilState(companyState)
  const [user, setUser] = useRecoilState(userState)
  const [open, setOpen] = React.useState(false)
  const [teamName, setTeamName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [selectedMembers, setSelectedMembers] = React.useState([])
  const [newTeam, setNewTeam] = React.useState(null)
  const [teamAdded, setTeamAdded] = React.useState(false)

  React.useEffect(() => {
    // console.log("start set company")

    if (newTeam) {
      // console.log("new team true")

      setCompany({ ...company, teams: [...company.teams, newTeam] })
      setNewTeam(null)
      setTeamAdded(true)
      // console.log("teamadded in set company: ", teamAdded)
    }
    // console.log("end set company")
  }, [newTeam])

  React.useEffect(() => {
    // console.log("start set user")
    // console.log("teamadded in set user: ", teamAdded)
    if (teamAdded) {
      // console.log("team added true")

      setUser({
        ...user,
        companies: [
          ...user.companies.map((currentCompany) =>
            currentCompany.id === company.id ? company : currentCompany
          ),
        ],
      })
      setTeamAdded(false)
    }
    // console.log('end set user')
  }, [company, teamAdded])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = async () => {
    // console.log("info: ", teamName, description, selectedMembers)

    const teamDto = {
      name: teamName,
      description: description,
      teammates: selectedMembers,
    }
    // console.log(teamDto)
    setNewTeam(await createTeam(user.id, company.id, teamDto))
    // console.log(newTeam)

    setOpen(false)
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    // console.log(value)
    !selectedMembers.map((user) => user.id).includes(value.id) &&
      setSelectedMembers([...selectedMembers, value])
  }

  const handleRemoveMember = (event) => {
    // console.log(event.target.dataset.id)
    setSelectedMembers(
      selectedMembers.filter((member) => member.id != event.target.dataset.id)
    )
  }

  return (
    <div style={{ width: "100%" }}>
      <Button
        variant='text'
        onClick={handleClickOpen}
        style={{ fontSize: "8rem", width: "100%" }}
      >
        +
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='team-name'
            label='Team Name'
            type='text'
            fullWidth
            variant='standard'
            onChange={(event) => setTeamName(event.target.value)}
          />
          <TextField
            autoFocus
            margin='dense'
            id='description'
            label='Description'
            type='text'
            fullWidth
            variant='standard'
            onChange={(event) => setDescription(event.target.value)}
          />
          <DialogContentText>Select Members</DialogContentText>
          <FormControl fullWidth>
            <InputLabel id='select-label'>Pick an option</InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId='select-label'
              id='members-select'
              value={selectedMembers}
              label='Pick an option'
              onChange={handleChange}
            >
              {company?.employees?.map((employee) => (
                <MenuItem key={employee.id} value={employee}>
                  {employee.profile.firstName}{" "}
                  {employee.profile.lastName?.slice(0, 1)}.
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            {selectedMembers.map((member) => (
              <div key={member.id}>
                <Button variant='contained'>
                  {member.profile.firstName}{" "}
                  {member.profile.lastName.slice(0, 1)}.
                </Button>
                <Button
                  variant='outlined'
                  color='error'
                  data-id={member.id}
                  onClick={handleRemoveMember}
                >
                  X
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleClose}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateTeamOverlay
