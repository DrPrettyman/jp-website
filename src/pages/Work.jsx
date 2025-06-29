import React, { useEffect } from 'react';
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
          <p className="text-justify text-gray-700 dark:text-white mb-4">
            My Ph.D. focussed on predicting tipping points in dynamical systems using multi-dimensional time series data, which I thought 
            to be a great jumping-off point for a career in Data Science:
            I'm good with statistics, problem solving, implementing algorithms and working with data. 
          </p>

          <p className="text-justify text-gray-700 dark:text-white mb-4">
            I work in mainly in Python and SQL, but I have experience with creating and maintaining databases, 
            dashboards and full-stack software projects. I have implemented and used a variety of 
            Machine Learning algorithms. 
            You can find a pdf-format CV <a href="/documents/JoshuaPrettymanCV.pdf" className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-500 underline" target="_blank" rel="noopener noreferrer">here</a>.
          </p>

          <p className="text-justify text-gray-700 dark:text-white mb-8">
            In my most recent role at Blink SEO I built the company's internal software from scratch, increasing productivity by 20× by automating all data processing and generating data-lead recommendations through machine learning. 
            This software improved the SEO process so much that we marketed it as a SaaS app to other agencies: <i>Macaroni Software</i>.
          </p>

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
          <div className="text-justify text-gray-700 dark:text-white mb-8">
              <p>
                I work mainly in Python, utilising various packages for data mining, machine learning, visualisation, web-scraping, and most other things. I also have extensive experience working with SQL, JavaScript and a host of other technologies.
              </p>
          </div>
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