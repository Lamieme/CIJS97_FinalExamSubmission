import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function Content() {
  const [valueTab, setValueTab] = React.useState(0)
  const [todoDatas, setTodoDatas] = React.useState([{}])
  const [fieldData, setFieldData] = React.useState('')
  const [id, setId] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValueTab(newValue)
  }

  const handleFieldDataChange = (e) => {
    setFieldData(e.target.value)
  }
  const handleAddNote = () => {
    if (fieldData) { // check field not empty
      setTodoDatas(oldDatas => (
        [
          ...oldDatas,
          {
            id: id,
            check: false,
            note: fieldData
          }
        ]
      ))
    }
    setFieldData('') // reset field
    setId(id => id + 1) // increase id
  }

  const handleCheckedDataChange = (e, currentId) => {
    const data = todoDatas.find(item => item.id === currentId)

    if (data) {
      setTodoDatas(oldDatas =>
        oldDatas.map(item =>
          item.id === currentId
            ? { ...item, check: e.target.checked } // Update the specific item
            : item
        )
      )
    }
    console.log(e.target.checked, currentId);

  }
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={valueTab} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth" centered>
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Active" {...a11yProps(1)} />
          <Tab label="Complete" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={valueTab} index={0}>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 5 }}>
          <TextField key='enter-note' focused fullWidth label='Text something here...' value={fieldData} onChange={handleFieldDataChange} id="fullWidth" />
          <Button onClick={handleAddNote} size='large' variant="contained" sx={{ px: 7 }}>Add</Button>
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <FormGroup>
            {todoDatas.map((item, idx) => (
              (item.note && <FormControlLabel
                key={idx}
                control={<Checkbox checked={item.check || false}
                  onChange={(e) => handleCheckedDataChange(e, item.id)} />}
                label={item.note}
                sx={{
                  textDecoration: item.check ? 'line-through' : ''
                }} />)
            ))}
            {/* <FormControlLabel control={<Checkbox />} label="Do coding challenges" />
              <FormControlLabel control={<Checkbox />} label="Do coding challenges" /> */}
          </FormGroup>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={valueTab} index={1}>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 5 }}>
          <TextField key='enter-note' focused fullWidth label='Text something here...' value={fieldData} onChange={handleFieldDataChange} id="fullWidth" />
          <Button onClick={handleAddNote} size='large' variant="contained" sx={{ px: 7 }}>Add</Button>
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <FormGroup>
            {todoDatas.map((item, idx) => (
              (item.note && !item.check && <FormControlLabel
                key={idx}
                control={<Checkbox checked={item.check || false}
                  onChange={(e) => handleCheckedDataChange(e, item.id)} />}
                label={item.note}
                sx={{
                  textDecoration: item.check ? 'line-through' : ''
                }} />)
            ))}
          </FormGroup>
        </Box>
      </CustomTabPanel>

      <CustomTabPanel value={valueTab} index={2}>
        <FormGroup>
          {todoDatas.map((item, idx) => (
            (item.note && item.check && <FormControlLabel
              key={idx}
              control={<Checkbox checked={item.check || false}
                onChange={(e) => handleCheckedDataChange(e, item.id)} />}
              label={item.note}
              sx={{
                textDecoration: item.check ? 'line-through' : ''
              }} />)
          ))}
        </FormGroup>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}>
          <Button variant="contained">Delete All</Button>
        </Box>
      </CustomTabPanel>
    </Box>
  )
}
