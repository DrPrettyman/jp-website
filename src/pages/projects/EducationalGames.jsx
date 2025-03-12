import React from 'react'
import Layout from '../../components/Layout'

import { Gamepad2, Github } from 'lucide-react';
import { AngleEstimationGame, FractionEstimationGame } from 'prettymath-games';

const EducationalGames = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-gray-200/65 dark:bg-gray-800 rounded-lg px-8 py-6 mb-4">
          <div className="flex items-center text-gray-900 dark:text-white mb-4">
            <Gamepad2 className="h-8 w-8 mr-2" />
            <h1 className="text-4xl font-bold">
              PrettyMath Games
            </h1>
            <div className="text-sm font-bold flex items-center ml-auto hover:text-blue-500">
              <a href="https://github.com/drprettyman/prettymath-games" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center">
                <Github className="mr-1" /> View on GitHub
              </a>
            </div>
          </div>
          
          <div className="text-gray-700 dark:text-white">

            <p className="mb-8 text-justify">
              While I was training to be a teacher (before changing career and embarking on a Ph.D.) I made a few educational games 
              to help teach my students. I've recently re-made these games in React to show my children as a fun project. 
              I've done two so far but may add more in the future.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center w-full mb-4">
              <div className="flex flex-col items-center justify-center">
                <AngleEstimationGame />
              </div>
              <div className="flex flex-col items-center justify-center">
                <FractionEstimationGame />
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default EducationalGames
