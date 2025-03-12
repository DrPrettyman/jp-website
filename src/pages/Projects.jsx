import React from 'react'
import Layout from '../components/Layout'
import ProjectCard from '../components/ProjectCard'
import { FolderGit2 } from 'lucide-react'

const Projects = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-gray-200/65 dark:bg-gray-800 rounded-lg px-8 py-6 mb-4">
          <div className="flex items-center text-gray-900 dark:text-white mb-4">
            <FolderGit2 className="h-8 w-8 mr-2" />
            <h1 className="text-4xl font-bold">
              Projects
            </h1>
          </div>
          {/* <p className="text-justify text-gray-700 mb-8">
            Projects are fun!
          </p> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* TAORG */}
            <ProjectCard
              title="TAORG"
              date="2025"
              tags={["JavaScript", "React", "Next.js", "Tailwind"]}
              description="The Animal Opposite Rhyming Game is a game I've been playing with my children for years. I decided to make a wordle-style web app based on it."
              link="https://taorg.app"
              image="/images/taorg-screenshot.png"
            />
            {/* Macaroni */}
            <ProjectCard
              title="Macaroni"
              date="2023"
              tags={["Python", "SQL", "ML", "GCP"]}
              description="SaaS product for SEO productivity. Developed whilst working at Blink SEO."
              link="/projects/macaroni"
              image="/images/macaroni.jpeg"
            />
            {/* PyGoogalytics */}
            <ProjectCard
              title="PyGoogalytics"
              date="2022"
              tags={["Python", "Pandas", "Data"]}
              description="A Python package for standardising and exporting Google Analytics, Google Ads, and Search Console data as a Pandas DataFrame."
              link="https://pypi.org/project/pygoogalytics/"
              image="/images/pygoogalytics.svg"
            />
            {/* Tipping Points */}
            <ProjectCard
              title="Tipping Points"
              date="2019"
              tags={["MatLab", "Python"]}
              description="Code for my Ph.D. research. Explore tipping points in a system of coupled non-linear differential equations."
              link="/projects/tipping-points"
              image="/images/indicators.pdf"
            />
            {/* Adaptive Mesh */}
            <ProjectCard
              title="Adaptive Mesh"
              date="2015"
              tags={["C++", "Numerical Methods"]}
              description="MRes. research."
              link="/projects/adaptive-mesh"
              image="/images/ring_phi.pdf"
            />
            {/* Educational Games */}
            <ProjectCard
              title="PrettyMath Games"
              date="2013"
              tags={["JavaScript", "React"]}
              description="A series of games I made during my time teaching Maths to High School students."
              link="/projects/educational-games"
              image="/images/angle-game-screenshot.png"
            />
            {/* Digraph Explorer */}
            <ProjectCard
              title="Digraph Explorer"
              date="2012"
              tags={["JavaScript", "React"]}
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
