import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Store/Store.js'

// Pages
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import AllPosts from './pages/AllPost.jsx'   // ✅ FIXED
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'

// Components
import { AuthLayout, Login } from './Components'


const ErrorPage = () => (
  <h1 style={{ textAlign: 'center', marginTop: '50px' }}>
    404 - Page Not Found
  </h1>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,   // IMPORTANT
    children: [
      {
        index: true,               // instead of path: '/'
        element: <Home />
      },
      {
        path: 'login',             // no '/'
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: 'signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: 'add-post',
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: 'all-posts',
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: 'edit-post/:slug',
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: 'post/:slug',
        element: <Post />
      },

      // ✅ catch-all route
      {
        path: '*',
        element: <ErrorPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)