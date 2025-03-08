import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import './index.css'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'
import Users from './pages/Users'
import UserDetails from './pages/UserDetails'
import Companies from './pages/Companies'
import CompanyDetails from './pages/CompanyDetails'
import Posts from './pages/Posts'
import PostDetails from './pages/PostDetails'

function App() {
  const NotFound = () => <h1>Not Found</h1>

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/users' element={<Users />} />
          <Route path='/user-details/:id' element={<UserDetails />} />
          <Route path='/companies' element={<Companies />} />
          <Route path='/company-details/:id' element={<CompanyDetails />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/post-details/:post_id' element={<PostDetails />} />
          <Route path='comments/:id' element={<PostDetails />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
