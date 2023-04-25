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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  }

  const h1Style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    fontSize: "4rem",
    marginTop: "2%",
    width: "40vw",
    height: "10vh",
    borderBottom: "2px solid #DEB992",
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
    }
    fetchData()
  }, [])

  const handleNewAnnoucement = () => {}

  if (!user.isLoggedIn) {
    return <Navigate replace to="/" />
  } else {
    return (
      <>
        <NavBar />
        <div
          style={{
            // marginTop: "10vh",
            background: "#051622",
            width: "100vw",
            height: "100vh",
          }}
        >
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
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "top",
                fontSize: "3em",
                marginTop: "2%",
              }}
            >
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                onClick={() => handleNewAnnoucement()}
              >
                New
              </Button>
              <h1 style={h1Style}>Announcements</h1>
            </div>
          </Box>
          <GridContainer>
            {compAnnouncements.map((announcement) => (
              <GridItem key={announcement.id}>
                <Container>
                  <Paragraph>
                    {announcement.author.profile.firstName}{" "}
                    {announcement.author.profile.lastName}
                  </Paragraph>
                  <Paragraph>
                    {new Date(announcement.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Paragraph>
                  <Paragraph>{announcement.message}</Paragraph>
                </Container>
              </GridItem>
            ))}
          </GridContainer>
        </div>
      </>
    )
  }
}

export default Announcements
