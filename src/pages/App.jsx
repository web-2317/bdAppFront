import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Projects from './Projects';
import NotFound from './NotFound';
import Home from './Home';
import ProjectDetails from './ProjectDetails';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App
