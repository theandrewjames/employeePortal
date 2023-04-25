import * as React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useRecoilState } from "recoil"
import { companyState } from "../globalstate"
import { display } from "@mui/system"

const CreateTeamOverlay = () => {
  const [company, setCompany] = useRecoilState(companyState)
  const [open, setOpen] = React.useState(false)
  const [selectedMembers, setSelectedMembers] = React.useState([])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    //TODO send POST request to server
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    console.log(value)
    !selectedMembers.map((user) => user.id).includes(value.id) &&
      setSelectedMembers([...selectedMembers, value])
  }

  const handleRemoveMember = (event) => {
    console.log("event: ", event)
    console.log(event.target.dataset.id)
    setSelectedMembers(selectedMembers.filter(member => member.id != event.target.dataset.id))
  }

  React.useEffect(() => {
    console.log(selectedMembers)
  }, [selectedMembers])

  const tempCompany = {
    id: 1,
    name: "Company 1",
    description: "desc",
    teams: [
      {
        id: 2,
        name: "team1",
        description: "team1 desc",
        users: [
          {
            id: 4,
            profile: {
              firstname: "Peter",
              lastname: "Luitjens",
            },
          },
          {
            id: 3,
            profile: {
              firstname: "Shilpa",
              lastname: "Nair",
            },
          },
          {
            id: 1,
            profile: {
              firstname: "Dylan",
              lastname: "Nguyen",
            },
          },
          {
            id: 2,
            profile: {
              firstname: "Jiwon",
              lastname: "Shim",
            },
          },
        ],
      },
      {
        id: 3,
        name: "team2",
        description: "team2 desc",
        users: [
          {
            id: 1,
            profile: {
              firstname: "Dylan",
              lastname: "Nguyen",
            },
          },
          {
            id: 2,
            profile: {
              firstname: "Jiwon",
              lastname: "Shim",
            },
          },
        ],
      },
    ],
    users: [
      {
        id: 4,
        profile: {
          firstname: "Peter",
          lastname: "Luitjens",
        },
      },
      {
        id: 3,
        profile: {
          firstname: "Shilpa",
          lastname: "Nair",
        },
      },
      {
        id: 1,
        profile: {
          firstname: "Dylan",
          lastname: "Nguyen",
        },
      },
      {
        id: 2,
        profile: {
          firstname: "Jiwon",
          lastname: "Shim",
        },
      },
    ],
  }

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Open form dialog
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
          />
          <TextField
            autoFocus
            margin='dense'
            id='description'
            label='Description'
            type='text'
            fullWidth
            variant='standard'
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
              {tempCompany?.users?.map((user) => (
                <MenuItem key={user.id} value={user}>
                  {user.profile.firstname} {user.profile.lastname.slice(0, 1)}.
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            {selectedMembers.map((member) => (
              <div key={member.id}>
                <Button variant='contained'>
                  {member.profile.firstname}{" "}
                  {member.profile.lastname.slice(0, 1)}.
                </Button>
                <Button variant='outlined' color='error' data-id={member.id} onClick={handleRemoveMember}>
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
