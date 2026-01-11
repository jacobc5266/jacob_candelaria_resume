import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import Maintenance from "./components/maintenance/Maintenance.tsx";

const maintenance = import.meta.env.VITE_MAINTENANCE === "true";

function App() {

    if (maintenance) {
        return <Maintenance />
    }

  return (
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
  )
}

export default App
