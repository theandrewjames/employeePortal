import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import NavBar from "../../Components/NavBar"
import { userState, companyState } from "../../globalstate"
import { Button, Box } from "@mui/material"
import { getAnnouncements } from "../../Services/announcements"
import styled from "styled-components"

const Announcements = () => {
  const [user] = useRecoilState(userState)
  const [company] = useRecoilState(companyState)
  const [compAnnouncements, setCompAnnoucements] = useState([])

  const btnstyle = {
    margin: "2px 0",
    background: "#1BA098",
    color: "#FFFFFF",
    border: "1px solid #1ba098",
    borderRadius: "5%",
    width: "5vw",
    height: "5vh",
  }

  const Container = styled.div`
    background-color: #0b2d45;
    border-radius: 10px;
    padding: 20px;
  `

  const Paragraph = styled.p`
    margin-bottom: 10px;
    font-size: 1rem;
    line-height: 1.5;
    color: white;
  `
  const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 5fr);
    grid-gap: 30px;
    justify-content: center;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  `

  const GridItem = styled.div`
    display: flex;
    justify-content: center;
  `

  const announcements = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  ]

  useEffect(() => {
    async function fetchData() {
      const data = await getAnnouncements(7)
      console.log("Fetching...")
      console.log(data)
      setCompAnnoucements(data)
      console.log(data)
    }
    fetchData()
  }, [])

  const handleNewAnnoucement = () => {}

  if (!user.isLoggedIn) {
    return <Navigate replace to="/" />
  } else {
    return (
      <div style={{ background: "#051622", width: "100vw", height: "100vh" }}>
        <NavBar />
        <Box
          style={{
            color: "#1ba098",
            background: "#051622",
            display: "flex",
            justifyContent: "center",
            alignItems: "top",
            textAlign: "center",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              fontSize: "3em",
              marginTop: "2%",
            }}
          >
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                fontSize: "4rem",
                marginTop: "2%",
                width: "40vw",
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
        </Box>
        <GridContainer>
          {announcements.map((announcement) => (
            <GridItem key={announcement}>
              <Container>
                <Paragraph>{announcement}</Paragraph>
              </Container>
            </GridItem>
          ))}
        </GridContainer>
      </div>
    )
  }
}

export default Announcements
