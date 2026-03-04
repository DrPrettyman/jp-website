import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CVEntry from '../components/CVEntry';
import Publication from '../components/Publication';
import ContentBlock from '../components/ContentBlock';
import educationData from '../assets/cv-academic/manifest.json';
import publicationsData from '../assets/cv-academic/publications.json';
import { GraduationCap, BookOpen } from 'lucide-react';
import introAcademicHtml from '../assets/cv-academic/intro-academic.html?raw';
import introPublicationsHtml from '../assets/cv-academic/intro-publications.html?raw';
import { generateMeta } from '../utils/seo';

export const meta = () => generateMeta({ title: "Academic Background", description: "Ph.D. in Mathematics from the University of Reading, MRes from Imperial College London, MA from the University of Edinburgh. Publications and research.", path: "/academic" });

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
      <ContentBlock title="Academic Background" icon={GraduationCap}>

          {/* Intro text */}
          <div dangerouslySetInnerHTML={{ __html: introAcademicHtml }} />

          {/* Grid of acedemic acheivements */}
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
      </ContentBlock>

      {/* Publications */}
      <ContentBlock title="Publications" icon={BookOpen}>
        
          {/* Intro text */}
          <div dangerouslySetInnerHTML={{ __html: introPublicationsHtml }} />

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

      </ContentBlock>
    </Layout>
  )
}

export default Education
