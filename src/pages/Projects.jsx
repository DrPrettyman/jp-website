import React from 'react'
import Layout from '../components/Layout'
import ProjectCard from '../components/ProjectCard'
import ContentBlock from '../components/ContentBlock'
import { FolderGit2 } from 'lucide-react'
import projectsData from '../assets/projects.json'

// List specific project IDs to display (in order), or use 'ALL' to show all projects
const projectIds = 'ALL'
// const projectIds = [
//   'fraud-detection',
//   'wine-exports-viz',
//   'taorg',
// ]

const Projects = () => {
  const projects = projectIds === 'ALL'
    ? projectsData.projects
    : projectIds.map(id => projectsData.projects.find(p => p.id === id)).filter(Boolean)

  return (
    <Layout>
      <ContentBlock title="Projects" icon={FolderGit2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                date={project.date}
                tags={project.tags}
                description={project.description}
                link={project.link}
                image={project.image}
              />
            ))}
          </div>
      </ContentBlock>
    </Layout>
  )
}

export default Projects
