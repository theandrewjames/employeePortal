import { Navigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import NavBar from "../../Components/NavBar"
import { userState } from "../../globalstate"
import { companyState } from "../../globalstate"
import { Button, Card, CardContent, CardHeader } from "@mui/material"
import CreateTeamOverlay from "../../Components/CreateTeamOverlay"

const handleCreateNewTeam = () => {
  console.log("Add new team")
}

const Teams = () => {
  const [user, setUser] = useRecoilState(userState)
  const [company, setCompany] = useRecoilState(companyState)

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
    users: [],
  }

  if (!user.isLoggedIn) {
    return <Navigate replace to='/' />
  } else {
    return (
      <div style={{ height: '100%',
        width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
        <NavBar />
        <h1 style={{ marginTop: "6vh" }}>Teams</h1>
        {tempCompany.teams.map((team) => (
          <Card key={team.id}>
            <CardHeader title={team.name} subheader='# of Projects: 5' />
            <CardContent>
              <h3>Members</h3>
              {team.users.map((user) => (
                <Button
                  key={user.id}
                  variant='contained'
                  href=''
                  onClick={() => console.log("User clicked")}
                >
                  {user.profile.firstname} {user.profile.lastname.slice(0, 1)}.
                </Button>
              ))}
            </CardContent>
          </Card>
        ))}
        <Card onClick={handleCreateNewTeam}>
          <CardContent>
            <CreateTeamOverlay></CreateTeamOverlay>
            <span>New Team</span>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default Teams
