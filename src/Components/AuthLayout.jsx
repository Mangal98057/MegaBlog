import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({ children, authentication = true }) {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector(state => state.auth.status)

  useEffect(() => {
    if (authentication && !authStatus) {
      navigate('/login')
    } else if (!authentication && authStatus) {
      navigate('/')
    } else {
      setLoader(false) // only when allowed
    }
  }, [authStatus, navigate, authentication])

  if (loader) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <div className='text-xl font-bold'>Loading...</div>
      </div>
    )
  }

  return <>{children}</>
}

export default Protected