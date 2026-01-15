import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import Maintenance from "./components/maintenance/Maintenance.tsx";
import Experience from "./pages/Experience.tsx";
import Projects from "./pages/Projects.tsx";

const maintenance = import.meta.env.VITE_MAINTENANCE === "true";

function App() {

    if (maintenance) {
        return <Maintenance/>
    }

    return (
        <div className="appShell">
            <Navbar/>

            <header>
                <h1>Jacob Candelaria</h1>
                <h2>Backend Software Engineer</h2>
                <hr/>
            </header>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/experience" element={<Experience/>}/>
                <Route path="/projects" element={<Projects/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
            </Routes>
        </div>
    )
}

export default App
