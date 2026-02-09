import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/login'
import Register from './pages/Register'
import {Toaster} from "sonner"
import VerifyOtp from './pages/VerifyOtp'
import { AppData } from './context/AppContext'
import Loading from './Loading'
function App() {
const {isAuth,loading}=AppData()
  return (
    <>
      {loading?(
        <Loading/>): (<BrowserRouter>
<Toaster/>
       <Routes>
        <Route  path='/' element={isAuth? <Home/>:<Login/>}/>
        <Route  path='/login' element={isAuth? <Home/>:<Login/>}/>
        <Route  path='/register' element={isAuth? <Home/>:<Register/>}/>
        <Route  path='/verifyotp' element={isAuth? <Home/>:<VerifyOtp/>}/>


       </Routes>
       </BrowserRouter>)}
    </>
  )
}

export default App
