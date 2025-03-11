import React from 'react'
import Layout from '../../components/Layout'
import AngleGame from '../../components/AngleGame'
import FractionGame from '../../components/FractionGame'

import { Gamepad2 } from 'lucide-react';

const DigraphExplorerProject = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-gray-200/65 dark:bg-gray-800 rounded-lg px-8 py-6 mb-4">
          <div className="flex items-center text-gray-900 dark:text-white mb-4">
            <Gamepad2 className="h-8 w-8 mr-2" />
            <h1 className="text-4xl font-bold">
              Educational Games
            </h1>
          </div>
          
          <div className="text-gray-700 dark:text-white">

            <p className="mb-4 text-justify">
              While I was training to be a teacher (before changing career and embarking on a Ph.D.) I made a few educational games 
              to help teach my students.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AngleGame />
              <FractionGame />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DigraphExplorerProject
