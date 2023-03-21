import { useQuery } from "react-query"
import { Version } from 'shared'

function Footer() {
  const getVersion = async () => {
    const res = await fetch('/version')
    return res.ok ? (await res.json()) as Version : {version: ''}
  }

  const version = useQuery('version', getVersion)

  return (
    <div style={{position: 'fixed', bottom: '0', left: '0', width: '100vw', backgroundColor: 'gray'}}>
      version: {version.data?.version}
    </div>
  )
}

export default Footer