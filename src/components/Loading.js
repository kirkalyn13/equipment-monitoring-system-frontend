import CircularProgress from '@mui/material/CircularProgress'

const Loading = ({offset = false}) => {
  return (
    <div className='container-loading'>
      <CircularProgress color="inherit" size="3rem"  sx={offset ? { mt: '-20%' } : null}/>
    </div>
  )
}

export default Loading