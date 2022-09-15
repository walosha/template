import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '@/modules/authentication/login/Login'
import Register from '@/modules/authentication/register/Register'
import AuthLayout from '@/layout/AuthLayout'
import DashboardLayout from '@/layout/DashboardLayout'
import Dashboard from '@/modules/dashboard/Dashboard'
import PageNotFound from '@/modules/authentication/pageNotFound/PageNotFound'
import { Suspense } from 'react'

const RenderRoutes = function () {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        {/* Dashboard */}
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path='/' element={<Dashboard />} />
          </Route>
          {/* Authentication */}
          <Route element={<AuthLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
          {/* Page Not Found */}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
export default RenderRoutes
