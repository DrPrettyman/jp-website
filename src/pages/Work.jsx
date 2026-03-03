import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import CVEntry from '../components/CVEntry';
import ContentBlock from '../components/ContentBlock';
import TechSkill from '../components/TechSkill';
import ProjectCard from '../components/ProjectCard';
import professionalData from '../assets/cv-professional/manifest.json';
import techSkillsData from '../assets/techSkills.json';
import projectsData from '../assets/projects.json';
import { Briefcase, FileTerminal, FolderGit2 } from 'lucide-react';
import { PiGitPullRequest, PiPresentationChart } from "react-icons/pi";
import { BsDatabaseCheck } from "react-icons/bs";
import { TbChartScatter3D } from "react-icons/tb";
import introExperienceHtml from '../assets/cv-professional/intro-experience.html?raw';
import introTechStackHtml from '../assets/cv-professional/intro-tech-stack.html?raw';
import { generateMeta } from '../utils/seo';

export const meta = () => generateMeta({ title: "Professional Experience", description: "Data scientist and software developer. Experience at Blink SEO, the National Physical Laboratory, and university teaching.", path: "/professional" });

// Project IDs to display in the Portfolio section
const portfolioProjectIds = [
  'jobsearch-agent',
  'fraud-detection',
  'wine-exports-viz',
];

const iconComponents = {
  TbChartScatter3D: <TbChartScatter3D className="h-6 w-6 mr-2" />,
  BsDatabaseCheck: <BsDatabaseCheck className="h-6 w-6 mr-2" />,
  PiGitPullRequest: <PiGitPullRequest className="h-6 w-6 mr-2" />,
  PiPresentationChart: <PiPresentationChart className="h-6 w-6 mr-2" />,
};

const Work = () => {
  useEffect(() => {

    // Handle deep linking
    const { hash } = window.location;
    if (hash) {
      const id = hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }

    // Check if we should open any modal
    const searchParams = new URLSearchParams(window.location.search);
    const openModal = searchParams.get('open');
    if (openModal) {
      // Find the entry and simulate a click
      const button = document.querySelector(`[data-entry-id="${openModal}"] button`);
      button?.click();
    }
  }, []);

  return (
    <Layout>
      {/* Experience */}
      <ContentBlock title="Professional Experience" icon={Briefcase} id="work-experience">

          {/* Intro text */}
          <div dangerouslySetInnerHTML={{ __html: introExperienceHtml }} />

          {/* Grid of work entries */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionalData.map((entry) => (
              <CVEntry
                key={entry.entryId}
                title={entry.title}
                company={entry.company}
                address={entry.address}
                duration={entry.duration}
                headline={entry.headline}
                logo={entry.logo}
                details={entry.details}
                data-entry-id={entry.entryId}
              />
            ))}
          </div>

      
      </ContentBlock>

      {/* Portfolio */}
      <ContentBlock title="Portfolio" icon={FolderGit2} id="portfolio">
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            A selection of data science and analysis projects. More projects can be found on my{' '}
            <Link to="/projects" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">
              projects page
            </Link>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioProjectIds
              .map(id => projectsData.projects.find(p => p.id === id))
              .filter(Boolean)
              .map((project) => (
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

      {/* Tech Stack */}
      <ContentBlock title="Technologies and Skills" icon={FileTerminal} id="tech-stack">

          {/* Intro text */}
          <div dangerouslySetInnerHTML={{ __html: introTechStackHtml }} />

          {/* Grid of tech skills */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {techSkillsData.map((skill, index) => (
              <TechSkill
                key={index}
                title={skill.title}
                icon={iconComponents[skill.icon]}
                techIcons={skill.techIcons}
                firstParagraph={skill.firstParagraph}
                text={skill.text}
              />
            ))}
          </div>
      </ContentBlock>
    </Layout>
  )
}

export default Work;