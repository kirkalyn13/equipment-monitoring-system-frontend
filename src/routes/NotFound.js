import { useHistory } from 'react-router-dom'
import { SentimentDissatisfied } from '@mui/icons-material'
import Button from '@mui/material/Button'

export const NotFound = () => {
  const history = useHistory()

  return (
    <div className="error-page">
      <SentimentDissatisfied sx={{ fontSize: 80, color: '#FFC107'}} />
      <h1 className="error-code">404</h1>
      <p className="error-message">Looks like this page doesn't exist.</p>
      <Button
        variant="contained"
        onClick={() => history.push('/')}
        sx={{ fontWeight: 'bold', backgroundColor: '#FFC107', '&:hover': { backgroundColor: '#FFAA00' }}}>
        Back to Dashboard
      </Button>
    </div>
  )
}

export default NotFound