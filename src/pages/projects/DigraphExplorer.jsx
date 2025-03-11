import React from 'react'
import Layout from '../../components/Layout'
import GraphBuilder from '../../components/GraphBuilder'
import { Waypoints } from 'lucide-react'

import { Circle, Share2 } from 'lucide-react';

const DigraphExplorerProject = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-gray-200/65 dark:bg-gray-800 rounded-lg px-8 py-6 mb-4">
          <div className="flex items-center text-gray-900 dark:text-white mb-4">
            <Waypoints className="h-8 w-8 mr-2" />
            <h1 className="text-4xl font-bold">
              Digraph Explorer
            </h1>
          </div>
          
          <div className="text-gray-700 dark:text-white">

            <p className="mb-4 text-justify">
              My dissertation project at the University of Edinburgh (a group project with three other students) 
              explored the properties of directed graphs 
              and how they relate to non-commutative algebras. 
              I made this fun tool to help me and my groupmates to visualise graphs and 
              quickly calculate the number of paths through a graph, without having to type out 
              a load of ones and zeros all the time (for the first few days we were 
              entering the adjacency matrix in MatLab to do the calculations).
              You can read more about the mathematics of these graphs, including how the patterns relate to 
              quasipolynomials, <a href="/academic?open=ma-dissertation" className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-500 underline">in the dissertation</a>.
            </p>

            <p className="mb-4 text-justify">
              I volunteered to turn our research project into a class given to first year students, 
              with this tool used as a teaching resource. This earned myself and my groupmates 
              a letter of commendation from the Principal of the University, which is nice. 
              It's also just a fun tool to play with! The original project was done in BBC Basic 
              and took about three days to write, but I just made the same thing in JavaScript and React in about 10 minutes 😅.
            </p>

            <GraphBuilder />

            <p className="mb-8 text-justify">
              Try it out! Click the <Circle size={16} className="inline-block align-text-bottom" /> button to add nodes and the <Share2 size={16} className="inline-block align-text-bottom" /> button to add edges.
              If you start creating loops you'll see an exponential explosion in the number of paths!
              You can also download the path counts as a CSV file, the original program just displayed the results in the console. 
              It looked like this:
            </p>

            <img src="/images/digraph_creata_screenshot.png" alt="Digraph Explorer Console" className="mb-8 px-6 mx-auto block" />

            <p className="mb-4 text-justify">
              In fact, if you have a Windows PC you can have a look at the original program which is just a .exe file [<a href="/documents/digraph_creata.exe" download className="text-blue-600 hover:text-blue-800 underline">download</a>].
            </p>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DigraphExplorerProject
