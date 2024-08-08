import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

function AppBar() {
  return (
    <Box sx={{
      backgroundColor: '#fff',
      width: '100%',
      height: (theme) => theme.trello.appBarHeight
    }}>
      <Typography sx={{
        fontWeight: '700',
        fontSize: '30px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        #todo
      </Typography>
    </Box>
  )
}

export default AppBar
