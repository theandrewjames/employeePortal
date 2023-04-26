import { Navigate, redirect } from "react-router-dom"
import { useRecoilState } from "recoil"
import NavBar from "../../Components/NavBar"
import { userState, companyState, currentTeamState } from "../../globalstate"
import { Button, Card, CardContent, CardHeader } from "@mui/material"
import CreateTeamOverlay from "../../Components/CreateTeamOverlay"
import { useEffect, useState } from "react"
import { getProjectsByTeam } from "../../Services/teams"

const Teams = () => {
  const [user, setUser] = useRecoilState(userState)
  const [company, setCompany] = useRecoilState(companyState)
  const [currentTeam, setCurrentTeam] = useRecoilState(currentTeamState)
  const [teamSelected, setTeamSelected] = useState(false)
  const [teamProjectsCounts, setTeamProjectsCounts] = useState([])

  useEffect(() => {
    const teamIds = company[0]?.teams?.map((team) => team.id)
    console.log(teamIds)
    teamIds?.forEach(async (teamId) => {
      const projects = await getProjectsByTeam(company[0].id, teamId)
      setTeamProjectsCounts([...teamProjectsCounts, { teamId: teamId, projectsCount: '# of Projects: ' + projects.length }])
    })
    console.log(company)
  }, [company])

  const handleCardClick = (event) => {
    console.log(event.currentTarget.dataset.id)
    const team = company[0].teams.filter(
      (team) => team.id == event.currentTarget.dataset.id
    )[0]
    console.log(team)

    setCurrentTeam(team)
    setTeamSelected(true)
  }

  const handleCreateNewTeam = () => {
    console.log("Add new team")
  }

  if (!user.isLoggedIn) {
    return <Navigate replace to='/' />
  } else {
    return teamSelected ? (
      <Navigate replace to='/projects' />
    ) : (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <NavBar />
        <h1 style={{ marginTop: "6vh" }}>Teams</h1>
        {company[0]?.teams?.map((team) => (
          <Card key={team.id} data-id={team.id} onClick={handleCardClick}>
            <CardHeader title={team.name} subheader={teamProjectsCounts[0]?.projectsCount} />
            <CardContent>
              <h3>Members</h3>
              {team?.teammates?.map((user) => (
                <Button key={user.id} variant='contained'>
                  {user?.profile?.firstName}{" "}
                  {user?.profile?.lastName?.slice(0, 1)}.
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
