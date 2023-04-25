import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import NavBar from "../../Components/NavBar"
import { userState, companyState } from "../../globalstate"
import { Button, Box, TextField } from "@mui/material"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import {
  getAnnouncements,
  saveAnnouncement,
} from "../../Services/announcements"
import styled from "styled-components"

const Announcements = () => {
  const [user, setUser] = useRecoilState(userState)
  const [company] = useRecoilState(companyState)
  const [compAnnouncements, setCompAnnouncements] = useState([])
  const [announcementUpdate, setAnnouncementUpdate] = useState(false)
  const [openNewDialog, setOpenNewDialog] = useState(false)
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")

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
    marginTop: "1%",
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
  useEffect(() => {
    async function fetchData() {
      const data = await getAnnouncements(company[0].id)
      setCompAnnouncements(data)
    }
    fetchData()
  }, [announcementUpdate])

  const handleNewAnnoucement = () => {
    setOpenNewDialog(true)
  }

  const saveAnnoucement = async () => {
    setOpenNewDialog(false)
    console.log(user)
    const savedData = await saveAnnouncement(
      company[0].id,
      title,
      message,
      user
    )
    console.log("Saving announcements...")
    setAnnouncementUpdate(true)
  }

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
            height: "100%",
            scrollBehavior: "auto",
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
              {user.isAdmin && (
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={btnstyle}
                  onClick={() => handleNewAnnoucement()}
                >
                  New
                </Button>
              )}
              <h1 style={h1Style}> Announcements</h1>
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
          <Dialog open={openNewDialog} onClose={() => setOpenNewDialog(false)}>
            <DialogTitle>Create new announcement</DialogTitle>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
            />
            <DialogActions>
              <Button onClick={() => saveAnnoucement()}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    )
  }
}

export default Announcements
