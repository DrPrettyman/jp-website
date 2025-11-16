import React from 'react';
import Layout from '../../components/Layout';
import ContentBlock from '../../components/ContentBlock';
import MasterMindGame from '../../components/MasterMindGame';

import { Puzzle } from 'lucide-react';

const MastermindGame = () => {
  return (
    <Layout>
      <ContentBlock title="Mastermind Game" icon={Puzzle}>
        <div className="text-gray-700 dark:text-white">
          <p className="mb-8 text-justify">
            A classic code-breaking game built in React. Try to crack the secret combination
            of four colors within 8 attempts. Red pegs indicate correct colors in the correct
            position, while yellow pegs show correct colors in the wrong position. Good luck!
          </p>

          <div className="flex justify-center items-center w-full mb-4">
            <MasterMindGame />
          </div>
        </div>
      </ContentBlock>
    </Layout>
  )
}

export default MastermindGame
