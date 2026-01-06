import React from 'react'
import Layout from '../components/Layout'
import ProjectCard from '../components/ProjectCard'
import ContentBlock from '../components/ContentBlock'
import { FolderGit2 } from 'lucide-react'

const Projects = () => {
  return (
    <Layout>
      <ContentBlock title="Projects" icon={FolderGit2}>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Fraud Detection */}
            <ProjectCard
              title="Fraud Detection"
              date="2026"
              tags={["Python", "ML", "LightGBM", "Kaggle"]}
              description="Cost-sensitive fraud detection achieving 97.4% AUC and $447K annual savings. Features time-based CV and business-optimized thresholds."
              link="projects/fraud-detection"
              image="/images/fraud-detection/score_distribution.png"
            />
            {/* Comtrade */}
            <ProjectCard
              title="Wine exports/imports visualisation"
              date="2025"
              tags={["Plotly", "Tableau", "Python", "DataViz", "WebScraping"]}
              description="A data viz project to create an interactive world map showing wine imports and exports. Can also map other traded commodities using the UN's Comtrade data."
              link="projects/wine-exports-viz"
              image="/images/comtrade-screenshot.png"
            />
            {/* TAORG */}
            <ProjectCard
              title="TAORG"
              date="2025"
              tags={["JavaScript", "React", "App", "Fun"]}
              description="The Animal Opposite Rhyming Game is a game I've been playing with my children for years. I decided to make a wordle-style web app based on it. Have a go!"
              link="https://taorg.app"
              image="/images/taorg-screenshot.png"
            />
            {/* Macaroni */}
            <ProjectCard
              title="Macaroni"
              date="2023"
              tags={["Python", "SQL", "ML", "GCP"]}
              description="SaaS product for SEO productivity incorporating ML features. I developed the backend (Python), database (BigQuery) and prototype frontend (Retool) whilst working at Blink SEO."
              link="/projects/macaroni"
              image="/images/macaroni.jpeg"
            />
            {/* JobMaster */}
            <ProjectCard
              title="JobMaster"
              date="2022"
              tags={["Python", "SQL", "PostgreSQL", "Workflow"]}
              description="A job-queue system for triggering backend Python tasks from a web application. Created whilst working at Blink SEO to fill a need for a scalable and reliable system with a flexible API."
              link="/projects/jobmaster"
              image="/images/jobmaster.png"
            />
            {/* PyGoogalytics */}
            <ProjectCard
              title="PyGoogalytics"
              date="2022"
              tags={["Python", "Pandas", "Data", "APIs"]}
              description="A Python package for standardising and exporting Google Analytics, Google Ads, and Search Console data as a Pandas DataFrame, ready for analysis or storage. Created whilst working at Blink SEO."
              link="https://pypi.org/project/pygoogalytics/"
              image="/images/pygoogalytics.svg"
            />
            {/* Tipping Points */}
            <ProjectCard
              title="Tipping Points"
              date="2019"
              tags={["MatLab", "Python", "Research", "TimeSeries"]}
              description="Code for my Ph.D. research. Explore tipping points in a system of coupled non-linear differential equations."
              link="/projects/tipping-points"
              image="/images/indicators.pdf"
            />
            {/* Adaptive Mesh */}
            <ProjectCard
              title="Adaptive Mesh"
              date="2015"
              tags={["C++", "Numerical Methods", "Research"]}
              description="MRes. research."
              link="/projects/adaptive-mesh"
              image="/images/ring_phi.pdf"
            />
            {/* Educational Games */}
            <ProjectCard
              title="PrettyMath Games"
              date="2013"
              tags={["JavaScript", "React", "Education"]}
              description="A series of games I made during my time teaching Maths to High School students."
              link="/projects/prettymath"
              image="/images/angle-game-screenshot.png"
            />
            {/* Digraph Explorer */}
            <ProjectCard
              title="Digraph Explorer"
              date="2012"
              tags={["JavaScript", "React", "Education", "GraphTheory"]}
              description="A tool for my undergraduate dissertation. Explore directed graphs and calculate the number of paths through them."
              link="/projects/digraph-explorer"
              image="/images/digraph.png"
            />
          </div>
      </ContentBlock>
    </Layout>
  )
}

export default Projects
