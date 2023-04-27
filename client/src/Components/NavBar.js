import * as React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import MenuIcon from "@mui/icons-material/Menu"
import { Link } from "react-router-dom"
import CloseIcon from "@mui/icons-material/Close"
import { userState } from "../globalstate"
import { useRecoilState } from "recoil"
import { AppBar, Toolbar, Typography } from "@mui/material"

const NavBar = () => {
  const [user, setUser] = useRecoilState(userState)
  const [isAdmin, setIsAdmin] = React.useState(user.admin)
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })
  const anchor = "top"
  const [toggled, setToggled] = React.useState(true)

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
    setToggled(!toggled)
  }

  const linksArray = isAdmin ? ["Home", "Company", "Teams", "Users"] : ["Home", "Teams"]

  return (
    // user.admin ? (
    //   <Box style={{ color: '#1ba098', background: '#051622' }}>
    //     {/* height: "6vh", */}
    //     <AppBar position='static'>
    //       <Toolbar
    //         variant='dense'
    //         style={{
    //           background: '#051622',
    //           display: 'flex',
    //           justifyContent: 'flex-end',
    //           border: '2px solid #DEB992',
    //         }}
    //       >
    //         <List
    //           style={{ textAlign: 'center', background: '#051622' }}
    //           sx={{
    //             width: '50%',
    //             display: 'flex',
    //             flexDirection: 'row',
    //             justifyContent: 'space-evenly',
    //           }}
    //         >
    //           {['Home', 'Company', 'Teams', 'Users'].map((text, index) => (
    //             <ListItem key={text}>
    //               <Link
    //                 to={
    //                   text.toLowerCase() === 'home'
    //                     ? '/announcements'
    //                     : '/' + text.toLowerCase()
    //                 }
    //                 style={{ textDecoration: 'none', color: 'black' }}
    //               >
    //                 <ListItemButton sx={{ width: '20%', paddingRight: '2vw' }}>
    //                   <ListItemText
    //                     style={{ color: '#1ba098' }}
    //                     primaryTypographyProps={{ fontSize: '35px' }}
    //                     primary={text}
    //                   />
    //                 </ListItemButton>
    //               </Link>
    //             </ListItem>
    //           ))}
    //           <ListItem key={'logout'} sx={{ width: '10vw' }}>
    //             <ListItemButton
    //               sx={{
    //                 width: '100%',
    //                 textAlign: 'center',
    //                 paddingRight: '2vw',
    //               }}
    //               onClick={() => {
    //                 setUser({})
    //                 localStorage.clear()
    //               }}
    //             >
    //               <ListItemText
    //                 style={{ color: '#1ba098' }}
    //                 primaryTypographyProps={{ fontSize: '35px' }}
    //                 primary='Logout'
    //               />
    //             </ListItemButton>
    //           </ListItem>
    //         </List>
    //       </Toolbar>
    //     </AppBar>
    //   </Box>
    // ) : (
    //   <Box style={{ color: '#1ba098', background: '#051622' }}>
    //     {/* height: "6vh", */}
    //     <AppBar position='static'>
    //       <Toolbar
    //         variant='dense'
    //         style={{
    //           background: '#051622',
    //           display: 'flex',
    //           justifyContent: 'flex-end',
    //           border: '2px solid #DEB992',
    //         }}
    //       >
    //         <List
    //           style={{ textAlign: 'center', background: '#051622' }}
    //           sx={{
    //             width: '50%',
    //             display: 'flex',
    //             flexDirection: 'row',
    //             justifyContent: 'space-evenly',
    //           }}
    //         >
    //           {['Home', 'Teams'].map((text, index) => (
    //             <ListItem key={text}>
    //               <Link
    //                 to={
    //                   text.toLowerCase() === 'home'
    //                     ? '/announcements'
    //                     : '/' + text.toLowerCase()
    //                 }
    //                 style={{ textDecoration: 'none', color: 'black' }}
    //               >
    //                 <ListItemButton sx={{ width: '20%', paddingRight: '2vw' }}>
    //                   <ListItemText
    //                     style={{ color: '#1ba098' }}
    //                     primaryTypographyProps={{ fontSize: '35px' }}
    //                     primary={text}
    //                   />
    //                 </ListItemButton>
    //               </Link>
    //             </ListItem>
    //           ))}
    //           <ListItem key={'logout'} sx={{ width: '10vw' }}>
    //             <ListItemButton
    //               sx={{
    //                 width: '100%',
    //                 textAlign: 'center',
    //                 paddingRight: '2vw',
    //               }}
    //               onClick={() => {
    //                 setUser({})
    //                 localStorage.clear()
    //               }}
    //             >
    //               <ListItemText
    //                 style={{ color: '#1ba098' }}
    //                 primaryTypographyProps={{ fontSize: '35px' }}
    //                 primary='Logout'
    //               />
    //             </ListItemButton>
    //           </ListItem>
    //         </List>
    //       </Toolbar>
    //     </AppBar>
    //   </Box>
    // )
    // )
    <Box style={{ color: "#1ba098", background: "#051622" }}>
      {/* height: "6vh", */}
      <AppBar position='static'>
        <Toolbar
          variant='dense'
          style={{
            width: "calc(100% - 5px)",
            background: "#051622",
            display: "flex",
            justifyContent: "space-between",
            border: "2px solid #DEB992",
            padding: "0",
          }}
        >
          <div style={{ width: "5%", marginLeft: "2rem" }}>
            <img src='logo.png' style={{ width: "4rem" }} />
          </div>
          <div style={{ width: "15%", color: "red" }}>
            {isAdmin ? (<span>ACTING AS ADMIN</span>) : (<span>{user?.profile?.firstName} {user?.profile?.lastName?.slice(0, 1)}.</span>)}
          </div>
          <List
            style={{ textAlign: "center", background: "#051622" }}
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginRight: "2rem",
            }}
          >
            {linksArray.map((text, index) => (
              <ListItem key={text} style={{ width: "15%", flex: "0 2 auto" }}>
                <Link
                  to={
                    text.toLowerCase() === "home"
                      ? "/announcements"
                      : "/" + text.toLowerCase()
                  }
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItemButton sx={{ width: "15%" }}>
                    <ListItemText
                      style={{ color: "#1ba098" }}
                      primaryTypographyProps={{ fontSize: "2em" }}
                      primary={text}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
            <ListItem key={"logout"} sx={{ width: "10%" }}>
              <ListItemButton
                sx={{ width: "100%", textAlign: "center", paddingRight: "2vw" }}
                onClick={() => {
                  setUser({})
                  localStorage.clear()
                }}
              >
                <ListItemText
                  style={{ color: "#1ba098" }}
                  primaryTypographyProps={{ fontSize: "2em" }}
                  primary='Logout'
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
