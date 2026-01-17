import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import Maintenance from "./components/maintenance/Maintenance.tsx";
import Experience from "./pages/Experience.tsx";
import Projects from "./pages/Projects.tsx";
import ScrollToTop from "./components/routing/ScrollToTop.ts";

const maintenance = import.meta.env.VITE_MAINTENANCE === "true";
const showViewport = import.meta.env.SHOW_VIEWPORT === "true";

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

            <ScrollToTop />

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/experience" element={<Experience/>}/>
                <Route path="/projects" element={<Projects/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
            </Routes>

            {showViewport &&
                <p style={{ position: "fixed", bottom: 8, left: 8, fontSize: 12, opacity: 0.7 }}>
                    {window.innerWidth} x {window.innerHeight}
                </p>
            }

        </div>
    )
}

export default App
