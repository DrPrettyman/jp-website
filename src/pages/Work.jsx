import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CVEntry from '../components/CVEntry';
import ContentBlock from '../components/ContentBlock';
import TechSkill from '../components/TechSkill';
import professionalData from '../assets/cv-professional/manifest.json';
import techSkillsData from '../assets/techSkills.json';
import { Briefcase, FileTerminal } from 'lucide-react';
import { PiGitPullRequest, PiPresentationChart } from "react-icons/pi";
import { BsDatabaseCheck } from "react-icons/bs";
import { TbChartScatter3D } from "react-icons/tb";
import introExperienceHtml from '../assets/cv-professional/intro-experience.html?raw';
import introTechStackHtml from '../assets/cv-professional/intro-tech-stack.html?raw';

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