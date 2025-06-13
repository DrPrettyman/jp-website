import React from 'react';
import Layout from '../../components/Layout';
import ContentBlock from '../../components/ContentBlock';

import { Gamepad2 } from 'lucide-react';
import { LiaGithub } from "react-icons/lia";
import { AngleEstimationGame, FractionEstimationGame } from 'prettymath-games';

const EducationalGames = () => {
  return (
    <Layout>
      <ContentBlock title="PrettyMath Games" icon={Gamepad2} githubUrl="https://github.com/DrPrettyman/prettymath-games">
          <div className="text-gray-700 dark:text-white">
            <p className="mb-8 text-justify">
              While I was training to be a teacher (before changing career and embarking on a Ph.D.) I made a few educational games 
              to help teach my students. I've recently re-made these games in React to show my children as a fun project. 
              I've done two so far but may add more in the future.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center w-full mb-4 text-gray-700 dark:text-grey-700">
              <div className="flex flex-col items-center justify-center">
                <AngleEstimationGame />
              </div>
              <div className="flex flex-col items-center justify-center">
                <FractionEstimationGame />
              </div>
            </div>
          </div>
      </ContentBlock>
    </Layout>
  )
}

export default EducationalGames
