import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'

export default function Loading() {
  return (
    <Box
        sx={{
          display: "flex",
          width: "100vw",
          height: "45vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
  )
}
