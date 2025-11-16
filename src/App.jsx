import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Education from './pages/Education'
import Work from './pages/Work'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

import DigraphExplorerProject from './pages/projects/DigraphExplorer'
import EducationalGamesProject from './pages/projects/EducationalGames'
import ComtradeProject from './pages/projects/Comtrade'
import MastermindGameProject from './pages/projects/MastermindGame'

import Vanlife from './pages/travel/Vanlife'
import Travels from './pages/Travels'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/academic" element={<Education />} />
        <Route path="/professional" element={<Work />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/digraph-explorer" element={<DigraphExplorerProject />} />
        <Route path="/projects/prettymath" element={<EducationalGamesProject />} />
        <Route path="/projects/wine-exports-viz" element={<ComtradeProject />} />
        <Route path="/projects/mastermind" element={<MastermindGameProject />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/blog/tag/:tag" element={<Blog />} />
        <Route path="/travels" element={<Travels />} />
        <Route path="/travel/vanlife" element={<Vanlife />} />
      </Routes>
    </Router>
  )
}

export default App