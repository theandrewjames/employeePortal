import { Navigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import NavBar from "../../Components/NavBar"
import { userState } from "../../globalstate"
import { Button, Box } from "@mui/material"
import { Stack, Grid, ListItem } from "@mui/material"

const Announcements = () => {
  const [user] = useRecoilState(userState)

  const btnstyle = {
    margin: "2px 0",
    background: "#1BA098",
    color: "#FFFFFF",
    border: "1px solid #1ba098",
    borderRadius: "5%",
    width: "5vw",
    height: "5vh",
  }

  const handleNewAnnoucement = () => {}

  if (!user.isLoggedIn) {
    return <Navigate replace to="/" />
  } else {
    return (
      <div>
        <NavBar />
        <Box
          style={{
            color: "#1ba098",
            background: "#051622",
            display: "flex",
            justifyContent: "center",
            alignItems: "top",
            textAlign: "center",
            width: "100vw",
            height: "100vh",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              fontSize: "3em",
              marginTop: "2%",
              borderBottom: "5px solid #DEB992",
            }}
          >
            <h1
              style={{
                display: "flex",
                flexDirection: "row",
                fontSize: "2em",
                marginTop: "2%",
                width: "30vw",
                height: "10vh",
                borderBottom: "2px solid #DEB992",
              }}
            >
              Announcements
            </h1>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              onClick={() => handleNewAnnoucement()}
            >
              New
            </Button>
          </div>
          <Stack>dfsf</Stack>
        </Box>
      </div>
      //   </div>
    )
  }
}

export default Announcements
