import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../Store/AuthSlice'

function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = async () => {
    try {
      await authService.logout()
      dispatch(logout())
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <button
      className='inline-block px-6 py-2 duration-200 hover:bg-amber-300 rounded-full'
      onClick={logoutHandler}
    >
      Logout
    </button>
  )
}

export default LogoutBtn