import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
// import Education from './pages/Education'
// import Work from './pages/Work'
import Projects from './pages/Projects'
import DigraphExplorerProject from './pages/projects/DigraphExplorer'
import EducationalGamesProject from './pages/projects/EducationalGames'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/academic" element={<Education />} /> */}
        {/* <Route path="/professional" element={<Work />} /> */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/digraph-explorer" element={<DigraphExplorerProject />} />
        <Route path="/projects/educational-games" element={<EducationalGamesProject />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/blog/tag/:tag" element={<Blog />} />
      </Routes>
    </Router>
  )
}

export default App