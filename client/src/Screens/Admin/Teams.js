import { Navigate, redirect } from "react-router-dom"
import { useRecoilState } from "recoil"
import NavBar from "../../Components/NavBar"
import { userState, companyState, currentTeamState } from "../../globalstate"
import { Button, Card, CardContent, CardHeader } from "@mui/material"
import CreateTeamOverlay from "../../Components/CreateTeamOverlay"
import { useEffect, useState } from "react"
import { getProjectsByTeam, getTeamById } from "../../Services/teams"

const cardStyle = {
  // width: "30%",
  // height: "300px",
  width: "313px",
  height: "241px",
  background: "#0B2D45",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.45)",
  borderRadius: "20px",
  cursor: "pointer",
}

const cardHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "0 1rem",
}

const cardContentStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderTop: "1px solid #DEB992",
}

const teammateStyle = {
  width: "80%",
  display: "flex",
  flexWrap: "wrap",
  gap: "1.3rem",
  justifyContent: "space-between",
  alignItems: "space-evenly",
}

const memberNameStyle = {
  textAlign: "center",
  lineHeight: "150%",
  background: "#1BA098",
  width: "45%",
  fontFamily: "Mulish",
  color: "rgba(255, 255, 255, 0.75)",
  fontStyle: "normal",
  fontWeight: "400",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: "10.2875px",
}

const newTeamCardStyle = {
  width: "313px",
  height: "241px",
  cursor: 'pointer',
  border: "2px solid #DEB992",
  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.45))",
  borderRadius: "20px",
  background: "#051622",

}

const newTeamCardContentStyle = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
}

const Teams = () => {
  const [user, setUser] = useRecoilState(userState)
  const [company, setCompany] = useRecoilState(companyState)
  const [currentTeam, setCurrentTeam] = useRecoilState(currentTeamState)
  const [teamSelected, setTeamSelected] = useState(false)
  const [teamsList, setTeamsList] = useState([])
  const [teamsListReady, setTeamsListReady] = useState(false)
  const [isAdmin, setIsAdmin] = useState(user.admin)

  useEffect(() => {
    const newTeamsList = []
    const teamIds = company?.teams?.forEach(async (team) => {
      const projects = await getProjectsByTeam(company.id, team.id)
      console.log("id: ", team.id, "projects: ", projects)
      newTeamsList.push({
        ...team,
        projectsCount: "# of Projects: " + projects.length,
      })
    })
    console.log(newTeamsList)

    setTeamsList(newTeamsList)
    console.log(teamsList)
  }, [company, setTeamsList])

  useEffect(() => {
    console.log(teamsList)
    console.log(teamsList.length)
    if (teamsList.length > 0) {
      setTeamsListReady(true)
    }
  }, [teamsList])

  useEffect(() => {
    console.log(user)
  }, [user])

  const handleCardClick = async (event) => {
    setCurrentTeam(await getTeamById(event.currentTarget.dataset.id))
    setTeamSelected(true)
  }

  // const calcProjectsCountString = (id) => {
  //   const str = teamProjectsCounts
  //     .filter((obj) => obj.teamId === id)
  //     .map((obj) => obj.projectsCount)[0]
  //   console.log(str)
  //   return str
  // }
  console.log(company)
  console.log(teamsList.length)

  const teamsArray = isAdmin ? company.teams : user.teams

  if (!user.isLoggedIn) {
    return <Navigate replace to='/' />
  } else if (company && Object.keys(company).length == 0) {
    if (isAdmin) {
      return <Navigate replace to='/company' />
    } else {
      setCompany(user.company)
    }
  } else if (teamSelected) {
    return <Navigate replace to='/projects' />
  } else {
    return (
      // !teamsListReady ? (<h1>Loading...</h1>) :
      <>
        <NavBar />
        <div
          style={{
            height: "94vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            background: "#051622",
            fontFamily: "Mulish",
          }}
        >
          <h1 style={{ marginTop: "6vh", color: "#1ba098", fontSize: "3rem" }}>
            Teams {teamsList.length}
          </h1>
          <div
            style={{
              width: "80%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent:
                teamsArray.length < 3 ? "flex-start" : "space-evenly",
              alignItems: "space-evenly",
              gap: "6rem",
              marginTop: "5vh",
            }}
          >
            {teamsArray.map((team) => (
              <Card
                key={team.id}
                data-id={team.id}
                onClick={handleCardClick}
                style={cardStyle}
              >
                <div style={cardHeaderStyle}>
                  <h2
                    style={{
                      color: "#FFF",
                      marginLeft: "10px",
                    }}
                  >
                    {team.name}
                  </h2>
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.75)",
                      fontStyle: "normal",
                      fontWeight: "400",
                      marginRight: "10px",
                    }}
                  >
                    !{team.projectsCount}!
                  </span>
                </div>
                <CardContent style={cardContentStyle}>
                  <h3
                    style={{
                      color: "rgba(255, 255, 255, 0.75)",
                      fontStyle: "normal",
                      fontWeight: "400",
                    }}
                  >
                    Members
                  </h3>
                  <div style={teammateStyle}>
                    {team?.teammates?.map((user) => (
                      <span key={user.id} style={memberNameStyle}>
                        {user?.profile?.firstName}{" "}
                        {user?.profile?.lastName?.slice(0, 1)}.
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            {isAdmin && (
              <Card style={newTeamCardStyle}>
                {/* <CardContent style={newTeamCardContentStyle}> */}
                  <CreateTeamOverlay></CreateTeamOverlay>
                {/* </CardContent> */}
              </Card>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default Teams
