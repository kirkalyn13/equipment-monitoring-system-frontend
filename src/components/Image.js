import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Loading from './Loading'

const Image = ({ name, image }) => {
  const [loading, setLoading] = useState(true)

  const hasImage = image && image !== "null"

  useEffect(() => {
    setLoading(true)
  }, [image])

  return (
    <div className="container-img">
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': { m: 1, width: 400, height: 400 },
          alignItems: 'center',
          justifyContent: 'space-around'
        }}
      >
        <Paper variant="outlined" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {loading && <Loading />}
          {!hasImage && !loading ? (
            <img
              src="/img/placeholder.png"
              alt="no-image"
              style={{ width: 'inherit', height: 'inherit', objectFit: 'contain' }}
            />
          ) : (
            <img
              src={image}
              alt="equipment-image"
              onLoad={() => setLoading(false)}
              style={{
                width: 'inherit',
                height: 'inherit',
                objectFit: 'contain',
                display: loading ? 'none' : 'block'
              }}
            />
          )}
        </Paper>
      </Box>
      <h2>{name}</h2>
    </div>
  )
}

export default Image