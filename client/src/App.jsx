import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { ToastContainer, toast } from 'react-toastify';

function App() {

  return (
    <>
      <Header />
      <main className="min-h-[80vh] shadow-md">
        <Outlet />
      </main>
      <Footer/>
      <ToastContainer/>
    </>
  )
}

export default App
