import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/login'
import Register from './pages/Register'
import {Toaster} from "sonner"
import VerifyOtp from './pages/VerifyOtp'
function App() {

  return (
    <>
       <BrowserRouter>
<Toaster/>
       <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route  path='/login' element={<Login/>}/>
        <Route  path='/register' element={<Register/>}/>
        <Route  path='/verifyotp' element={<VerifyOtp/>}/>


       </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
