import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import CVEntry from '../components/CVEntry'
import ContentBlock from '../components/ContentBlock'
import professionalData from '../assets/cv-professional/manifest.json';
import { Briefcase, FileTerminal } from 'lucide-react';
import { VscGraphScatter } from "react-icons/vsc";
import { PiGitPullRequest } from "react-icons/pi";

const Work = () => {
  useEffect(() => {
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
      <ContentBlock title="Professional Experience" icon={Briefcase}>

          {/* Intro text */}
          <p className="text-justify text-gray-700 dark:text-white mb-4">
            My Mathematics Ph.D. transitioned me into a career in Data Science:
            I'm good with statistics and problem solving, and enjoy implementing algorithms. 
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
      <ContentBlock title="Technologies" icon={FileTerminal}>
          {/* Intro text */}
          <div className="text-justify text-gray-700 dark:text-white mb-8">
              <p>
                I work mainly in Python, utilising various packages for data mining, machine learning, visualisation, web-scraping, and most other things. I also have extensive experience working with SQL, JavaScript and a host of other technologies.
              </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-gray-300/70 dark:bg-gray-600 rounded-lg px-8 py-6 mb-4 mx-2 sm:mx-0">
              <div className="text-lg font-bold text-gray-600 dark:text-white mb-4 flex items-center">
                <VscGraphScatter className="h-6 w-6 mr-2" /> Data Science
              </div>
              <div className="text-md text-gray-600 dark:text-white text-justify">
                <p className='mb-2'>
                  I've spent a lot of time working with ScikitLearn, PyTorch and TensorFlow for machine learning tasks, and using NLP for working with textual data.
                </p>
                <p className='mb-2'>
                  NLP and DBSCAN clustering on Search Console data to provide recommendations for 
                  primary keywords. This cut down a days-long spreadsheet-scrolling task to a few minutes. 
                </p>
                <p className='mb-2'>
                  A combination of classification and clustering to recommend new category pages for D2C brands with a focus on 
                  optimising click-through rate and capturing niche keywords whilst reducing cannibalisation.
                </p>
                <p>
                  Implemented an LLM intergration to provide highly personalised recomendations for on-page copy. This allowed new pages to be launched in minutes rather than days. 
                </p>
              </div>
            </div>

            <div className="bg-gray-300/70 dark:bg-gray-600 rounded-lg px-8 py-6 mb-4 mx-2 sm:mx-0">
              <div className="text-lg font-bold text-gray-600 dark:text-white mb-4 flex items-center">
                <PiGitPullRequest className="h-6 w-6 mr-2" /> Software Development 
              </div>
              <div className="text-md text-gray-600 dark:text-white text-justify">
                <p className='mb-2'>
                  Built the <i>Macaroni Software</i> backend in Python running on GCP Compute Engine. This connected to client data sources via APIs, handled Data Cleaning and ML tasks, and integrated with BigQuery.
                </p>
                <p className='mb-2'>
                  I wrote wrappers (Python) for various APIs and data processing steps (Pandas). This saved the team from the manual csv-export/excel-import repetative nightmare and freed up countless hours.
                </p>
                <p className='mb-2'>
                  Set up Slack notifications from the backend system to alert devs (me) of tech problems and agency staff of clients' statuses.
                </p>
                <p className='mb-2'>
                  Created a job-queue system (PostgreSQL) for running back-end processes on demand and on schedules.
                </p>
                <p className='mb-2'>
                  Created numerous apps and dashboards in Retool connected to data in BigQuery and the backend via the job-queue. 
                  Apps drastically increased productivity by automating manual data-engineering tasks. Dashboards replaced PDF reports, saving account managers several hours each month per client.
                </p>
              </div>
            </div>
            
          </div>
      </ContentBlock>
    </Layout>
  )
}

export default Work