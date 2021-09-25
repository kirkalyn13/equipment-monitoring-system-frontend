import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

const Image = ({name, image}) => {
    return (
        <div className="container-img">
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 1,
                    width: 400,
                    height: 400,
                    },
                    alignItems: 'center',
                    justifyContent: 'space-around'
                }}
                >
                <Paper variant="outlined">
                    {image !== "" ? 
                    (<img src={image} style={{width:"inherit", height:"inherit"}} alt="No Image Available." />)
                    : (<img src="/img/placeholder.png" style={{width:"400", height:"400"}} alt="equipment-image" />)}
                </Paper>
            </Box>
            <h2>{name}</h2>
        </div>
    )
}

export default Image
