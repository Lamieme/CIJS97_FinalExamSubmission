import { Container } from '@mui/material'
import AppBar from '../components/AppBar'
import Content from './Content'

function Page() {
  return (
    <Container disableGutters maxWidth={'sm'} sx={{ height: '100vh' }}>
      <AppBar />
      <Content />
    </Container>
  )
}

export default Page
