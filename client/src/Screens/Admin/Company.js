import { Navigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState } from '../../globalstate'
import { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
const CompanyScreen = () => {
  const [user, setUser] = useRecoilState(userState)

  //Get companies that admin can access
  const [company, setCompany] = useState('')

  const handleChange = (event) => {
    setCompany(event.target.value)
  }

  if (!user.isLoggedIn) {
    return <Navigate replace to='/' />
  } else if (!user.isAdmin) {
    return <Navigate replace to='/announcements' />
  } else {
    return (
      <div>
        <h1>Select Company</h1>
        <FormControl fullWidth>
          <InputLabel>Pick a company</InputLabel>
          <Select
            value={company}
            label='Pick a company'
            onChange={handleChange}
          >
            {user.companies.map((company) => (
              <MenuItem key={company} value={company}>
                {company}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )
  }
}

export default CompanyScreen
