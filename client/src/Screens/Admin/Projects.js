import { Navigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import NavBar from "../../Components/NavBar"
import { userState, currentTeamState } from "../../globalstate"
import { useEffect } from "react"

const Projects = () => {
  const [user, setUser] = useRecoilState(userState)
  const [currentTeam, setCurrentTeam] = useRecoilState(currentTeamState)

  useEffect(() => {
    console.log(currentTeam)
  }, [currentTeam])

  if (!user.isLoggedIn) {
    return <Navigate replace to='/' />
  } else {
    return (
      <div>
        <NavBar />
        <h1>Projects</h1>
        <h2>{currentTeam?.name}</h2>
      </div>
    )
  }
}

export default Projects
