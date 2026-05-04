import CircularProgress from '@mui/material/CircularProgress'

const Loading = ({offset = false}) => {
  return (
    <div className='container-loading'>
      <CircularProgress size="3rem" sx={{ color: '#FFAA00', ...(offset ? { mt: '-20%' } : {}) }} />
    </div>
  )
}

export default Loading