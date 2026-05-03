import { useHistory } from 'react-router-dom'
import { LockOutlined } from '@mui/icons-material'
import Button from '@mui/material/Button'

export const Unauthorized = () => {
  const history = useHistory()

  return (
    <div className="error-page">
      <LockOutlined sx={{ fontSize: 80, color: '#ef9a9a' }} />
      <h1 className="error-code">403</h1>
      <p className="error-message">You don't have permission to view this page.</p>
      <Button variant="contained" color="error" sx={{ fontWeight: 'bold' }} onClick={() => history.push('/')}>
        Back to Dashboard
      </Button>
    </div>
  )
}

export default Unauthorized