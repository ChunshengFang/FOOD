// import { FAQ } from "@/components/FAQ";
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { ScrollToTop } from '@/components/ScrollToTop'
import '@/App.css'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
      <div className='main-container'>
        <Outlet />
      </div>
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default App
