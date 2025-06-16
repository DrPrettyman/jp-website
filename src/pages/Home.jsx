import React from 'react'
import Layout from '../components/Layout'

import { Briefcase, GraduationCap, FileTerminal, Smile } from 'lucide-react';

const Home = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-gray-200/65 dark:bg-gray-800/80 rounded-lg px-8 py-6 mb-12 mx-2 sm:mx-0">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Image container */}
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
              <img
                src="/images/headshot.jpeg"
                alt="Your profile"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
            
            {/* Text content */}
            <div className="text-xl text-gray-600 dark:text-white">
              <div className="mb-8">
                <span className="text-4xl font-bold">
                  Hi, 
                </span>
                <span>
                  {' '} my name is Joshua.
                </span>
              </div>
              <p className="mb-8">
                I made this website as an online résumé to showcase my work experience, skills, 
                and projects. But then I just started having fun with it, it's really giving me nostalgia for MySpace. 
              </p>
              <p className="mb-8">
                I am a data scientist with software development experience and a Ph.D. in mathematics. 
                Please have a look around and feel free to reach out to me if you're interested in working together.
              </p>
            </div>
          </div>
          
        </div>


        <div className="bg-gray-200/65 dark:bg-gray-800/50 rounded-lg px-4 py-4 mb-4 mx-2 sm:mx-0">
          
          <div className="bg-gray-300/70 dark:bg-gray-800 rounded-lg px-8 py-6 mb-4 mx-2 sm:mx-0">
            <div className="text-lg font-bold text-gray-600 dark:text-white mb-4 flex items-center">
              <Briefcase className="h-6 w-6 mr-2" /> Professional Experience
            </div>
            <div className="text-md text-gray-600 dark:text-white">
              <p className='mb-2'>
                In my most recent role at Blink SEO I built the company's internal software from scratch, increasing productivity by 20× by automating all data processing and generating data-lead recommendations through machine learning. 
                This software improved the SEO process so much that we marketed it as a SaaS app to other agencies: <i>Macaroni Software</i>.
              </p>
              <p>
                I also have experience as a researcher at the National Physical Laboratory and lecturing Mathemetics at all levels of university. Details are found on my <a href="/professional" className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">Professional CV page</a>.
              </p>
            </div>
          </div>

          <div className="bg-gray-300/70 dark:bg-gray-800 rounded-lg px-8 py-6 mb-4 mx-2 sm:mx-0">
            <div className="text-lg font-bold text-gray-600 dark:text-white mb-4 flex items-center">
              <GraduationCap className="h-6 w-6 mr-2" /> Academic Background
            </div>
            <div className="text-md text-gray-600 dark:text-white">
              <p className='mb-2'>
                My Ph.D. focused on predicting tipping points in dynamical systems, with applications to geophysical time series data. I published three papers in respected journals and presented my research at international conferences.
              </p>
              <p>
                I previously obtained an MRes (Mathematics) from ICL and an MA (Mathematics) from Edinburgh. Details are found on my <a href="/academic" className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">Academic CV page</a>.
              </p>
            </div>
          </div>

          <div className="bg-gray-300/70 dark:bg-gray-800 rounded-lg px-8 py-6 mb-4 mx-2 sm:mx-0">
            <div className="text-lg font-bold text-gray-600 dark:text-white mb-4 flex items-center">
              <FileTerminal className="h-6 w-6 mr-2" />Tech Stack
            </div>
            <div className="text-md text-gray-600 dark:text-white">
              <p className='mb-2'>
                I work in Python, utilising Pandas, ScikitLearn, PyTorch and TensorFlow for data mining and machine learning tasks; and Plotly, Seaborn and Matplotlib for visualisation.
              </p>
              <p className='mb-2'>
                I also have extensive experience working in SQL, both for database management and data cleaning and manipulation, and have created and maintained BigQuery databases on GCP. 
                I have also used JavaScript for building web-apps –including dashboards– and for adding custom interactivity to Plotly figures. 
              </p>
              <p>
                I have used Shell Scripting for command line interfaces and automating tasks on cloud servers. I have built full-stack software solutions running on GCP Compute Engine. 
                In the past I have also used C++, Matlab and Java for various projects.
              </p>
            </div>
          </div>

          <div className="bg-gray-300/70 dark:bg-gray-800 rounded-lg px-8 py-6 mx-2 sm:mx-0">
            <div className="text-lg font-bold text-gray-600 dark:text-white mb-4 flex items-center">
              <Smile className="h-6 w-6 mr-2" />Bio
            </div>
            <div className="text-md text-gray-600 dark:text-white">
              <p className='mb-2'>
                I live in the Málaga region of Spain and spend most of my time writing code, doing DIY projects on our weird old casita, cooking vegan meals and drinking Spanish wine. 
              </p>
              <p>
                On the weekend I'll generally be spending time with my family either at a museum in Málaga, on the beach at Torremolinos or paddle-boarding up at Embalse del Guadalhorce. 
                We might also head off in our campervan to explore Andalucía and beyond. 
              </p>
            </div>
          </div>
          
        </div>

      </div>
    </Layout>
  )
}

export default Home