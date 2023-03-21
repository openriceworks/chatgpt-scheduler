import { Box, Typography } from "@mui/material"
import { useQuery } from "react-query"
import { Version } from 'shared'

function Footer() {
  const getVersion = async () => {
    const res = await fetch('/version')
    return res.ok ? (await res.json()) as Version : {version: ''}
  }

  const version = useQuery('version', getVersion, {staleTime: Infinity})

  return (
    <Box sx={{width: '100vw', position: 'fixed', bottom: '0', left: '0', paddingX: '10px'}}>
      <Typography variant="inherit" textAlign="start">
        version: {version.data?.version}
      </Typography>
    </Box>

  )
}

export default Footer