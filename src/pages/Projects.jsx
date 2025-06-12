import React from 'react'
import Layout from '../components/Layout'
import ProjectCard from '../components/ProjectCard'
import { FolderGit2 } from 'lucide-react'

const Projects = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-gray-200/65 dark:bg-gray-800 rounded-lg px-8 py-6 mb-4 mx-2 sm:mx-0">
          <div className="grid grid-cols-3 items-center sm:flex sm:items-center text-gray-900 dark:text-white mb-6">
            <FolderGit2 className="h-8 w-8 justify-self-start" />
            <h1 className="text-4xl font-bold text-center sm:text-left sm:ml-2">
              Projects
            </h1>
            <FolderGit2 className="h-8 w-8 justify-self-end sm:hidden" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Comtrade */}
            <ProjectCard
              title="Wine exports/imports visualisation"
              date="2025"
              tags={["Plotly", "Tableau", "Python", "DataViz"]}
              description="A data viz project to create an interactive world map showing wine imports and exports. Can also map other traded commodities using the UN's Comtrade data."
              link="projects/wine-exports-viz"
              image="/images/taorg-screenshot.png"
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
              link="https://github.com/DrPrettyman/jobmaster"
              image="/images/jobmaster.png"
            />
            {/* PyGoogalytics */}
            <ProjectCard
              title="PyGoogalytics"
              date="2022"
              tags={["Python", "Pandas", "Data"]}
              description="A Python package for standardising and exporting Google Analytics, Google Ads, and Search Console data as a Pandas DataFrame, ready for analysis or storage. Created whilst working at Blink SEO."
              link="https://pypi.org/project/pygoogalytics/"
              image="/images/pygoogalytics.svg"
            />
            {/* Tipping Points */}
            <ProjectCard
              title="Tipping Points"
              date="2019"
              tags={["MatLab", "Python", "Research"]}
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
              tags={["JavaScript", "React", "Educational"]}
              description="A series of games I made during my time teaching Maths to High School students."
              link="/projects/prettymath"
              image="/images/angle-game-screenshot.png"
            />
            {/* Digraph Explorer */}
            <ProjectCard
              title="Digraph Explorer"
              date="2012"
              tags={["JavaScript", "React", "Educational"]}
              description="A tool for my undergraduate dissertation. Explore directed graphs and calculate the number of paths through them."
              link="/projects/digraph-explorer"
              image="/images/digraph.png"
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Projects
