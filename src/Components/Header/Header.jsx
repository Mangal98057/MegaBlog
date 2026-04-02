import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: 'Login', slug: "/login", active: !authStatus },
    { name: 'Signup', slug: "/signup", active: !authStatus },
    { name: 'All Posts', slug: "/all-posts", active: authStatus },
    { name: 'Add Post', slug: "/add-post", active: authStatus },
  ]

  return (
    <header className='py-3 shadow-md bg-yellow-700'>
      <Container>
        <nav className='flex items-center'>

          {/* Logo */}
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>

          {/* Nav Items */}
          <ul className='flex ml-auto items-center gap-2'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='px-5 py-2 text-white rounded-full transition-all duration-200 
                    hover:bg-white hover:text-yellow-700'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <div className='ml-2'>
                  <LogoutBtn className='px-5 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200' />
                </div>
              </li>
            )}
          </ul>

        </nav>
      </Container>
    </header>
  )
}

export default Header