import { Outlet } from "react-router"
import Header from "./components/Header"
import { Toaster } from "react-hot-toast"



function App() {

  return (
    <>
    <Header/>
    <Outlet/>
    <Toaster/>
    
    </>
  )
}

export default App
