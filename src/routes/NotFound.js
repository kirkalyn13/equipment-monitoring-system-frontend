import { useHistory } from 'react-router-dom'
import { SentimentDissatisfied } from '@mui/icons-material'
import Button from '@mui/material/Button'

export const NotFound = () => {
  const history = useHistory()

  return (
    <div className="error-page">
      <SentimentDissatisfied sx={{ fontSize: 80, color: '#FFA000' }} />
      <h1 className="error-code">404</h1>
      <p className="error-message">Looks like this page doesn't exist.</p>
      <Button variant="contained" sx={{ fontWeight: 'bold', backgroundColor: '#FFAA00' }} onClick={() => history.push('/')}>
        Back to Dashboard
      </Button>
    </div>
  )
}

export default NotFound