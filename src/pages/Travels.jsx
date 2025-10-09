import React from 'react'
import Layout from '../components/Layout'
import ProjectCard from '../components/ProjectCard'
import ContentBlock from '../components/ContentBlock'
import { Map } from 'lucide-react'

const Travels = () => {
  return (
    <Layout>
      <ContentBlock title="Travels" icon={Map}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Vanlife */}
          <ProjectCard
            title="Van Life 2019-2021"
            date="2019-2021"
            tags={["Europe", "Spain", "Travel", "Van"]}
            description="Our two-year adventure traveling across Europe in a converted Mercedes Sprinter van with our family. From the UK through France, Germany, and spending most of our time exploring Spain."
            link="/travel/vanlife"
            image="/images/vanlife-preview.jpg"
          />
        </div>
      </ContentBlock>
    </Layout>
  )
}

export default Travels
