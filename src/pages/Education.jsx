import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import CVEntry from '../components/CVEntry'
import Publication from '../components/Publication'
import educationData from '../assets/cv-academic/manifest.json';
import publicationsData from '../assets/publications/manifest.json';
import { GraduationCap, BookOpen } from 'lucide-react'

const Education = () => {

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
      {/* Academic Background */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-gray-200/65 dark:bg-gray-800 rounded-lg px-8 py-6 mb-4">
          <div className="flex items-center text-gray-900 dark:text-white mb-4">
            <GraduationCap className="h-8 w-8 mr-2" />
            <h1 className="text-4xl font-bold">
              Academic Background
            </h1>
          </div>
          <p className="text-justify text-gray-700 dark:text-white mb-8">
            At Edinburgh I studied Pure Mathematics but switched to more applied mathematics at the <em>Mathematics of Planet Earth</em> Centre for Doctoral Training. 
            My Masters taught courses covered Probability, Statistics, Computational Mathematics, and 
            Dynamical Systems. My Ph.D. focused on the application of dynamical systems theory to 
            the study of tipping points in geophysical systems.
            You can find a pdf-format CV <a href="/documents/JoshuaPrettymanCV.pdf" className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-500 underline" target="_blank" rel="noopener noreferrer">here</a>.
          </p>

          {/* Grid of work entries */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationData.map((entry) => (
              <CVEntry
                key={entry.entryId}
                title={entry.title}
                grade={entry.grade}
                company={entry.company}
                address={entry.address}
                headline={entry.headline}
                logo={entry.logo}
                transparent={entry.transparent}
                data-entry-id={entry.entryId}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Publications */}
      <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
        <div className="bg-gray-200/65 dark:bg-gray-800 rounded-lg px-6 py-6 mb-4">
          <div className="flex items-center text-gray-900 dark:text-white mb-4">
            <BookOpen className="h-8 w-8 mr-2" />
            <h1 className="text-4xl font-bold">
              Publications
            </h1>
          </div>
          <p className="text-justify text-gray-700 dark:text-white mb-8">
            Throughout my academic career I have been fortunate enough to present my research 
            at several international conferences and workshops, and publish a number of papers 
            in respected journals.
            I have also included my MA and Masters dissertation papers here.
          </p>

          {/* Publications section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicationsData.map((pub) => (
              <Publication
                key={pub.entryId}
                title={pub.title}
                journal={pub.journal}
                link={pub.link}
                date={pub.date}
                logo={pub.logo}
                transparent={pub.transparent}
                data-entry-id={pub.entryId}
                authors={pub.authors}
                abstract={pub.abstract}
              />
            ))}
          </div>
        </div>
      </div>   
    </Layout>
  )
}

export default Education
