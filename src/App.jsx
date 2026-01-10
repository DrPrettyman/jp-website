import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

const CVRedirect = () => {
  useEffect(() => {
    window.location.href = '/cv/two_page/JPrettymanCV.pdf'
  }, [])
  return null
}

// const TutorRedirect = () => {
//   useEffect(() => {
//     window.location.href = '/tutor_poster/tutor_poster.pdf'
//   }, [])
//   return null
// }

import Home from './pages/Home'
import Education from './pages/Education'
import Work from './pages/Work'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

import Tutor from './pages/Tutor'
import Freelance from './pages/Freelance'

import DigraphExplorerProject from './pages/projects/DigraphExplorer'
import EducationalGamesProject from './pages/projects/EducationalGames'
import ComtradeProject from './pages/projects/Comtrade'
import MastermindGameProject from './pages/projects/MastermindGame'
import FraudDetectionProject from './pages/projects/FraudDetection'
import JobMasterProject from './pages/projects/JobMaster'
import MacaroniProject from './pages/projects/Macaroni'
import EarlyWarningSignalsProject from './pages/projects/EarlyWarningSignals'
import PSIndicatorProject from './pages/projects/PSIndicator'
import MultidimEWSProject from './pages/projects/MultidimEWS'
import PSRobustnessProject from './pages/projects/PSRobustness'
import AdaptiveMeshProject from './pages/projects/AdaptiveMesh'
import JobSearchAgentProject from './pages/projects/JobSearchAgent'

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
        <Route path="/projects/fraud-detection" element={<FraudDetectionProject />} />
        <Route path="/projects/jobmaster" element={<JobMasterProject />} />
        <Route path="/projects/macaroni" element={<MacaroniProject />} />
        <Route path="/projects/early-warning-signals" element={<EarlyWarningSignalsProject />} />
        <Route path="/projects/ps-indicator" element={<PSIndicatorProject />} />
        <Route path="/projects/multidim-ews" element={<MultidimEWSProject />} />
        <Route path="/projects/ps-robustness" element={<PSRobustnessProject />} />
        <Route path="/projects/adaptive-mesh" element={<AdaptiveMeshProject />} />
        <Route path="/projects/jobsearch-agent" element={<JobSearchAgentProject />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/blog/tag/:tag" element={<Blog />} />
        <Route path="/travels" element={<Travels />} />
        <Route path="/travel/vanlife" element={<Vanlife />} />
        <Route path="/cv" element={<CVRedirect />} />
        <Route path="/tutor" element={<Tutor />} />
        <Route path="/freelance" element={<Freelance />} />
      </Routes>
    </Router>
  )
}

export default App