import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import CVEntry from '../components/CVEntry'
import ContentBlock from '../components/ContentBlock'
import professionalData from '../assets/cv-professional/manifest.json';
import { Briefcase } from 'lucide-react'

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
    </Layout>
  )
}

export default Work