import React from 'react'
import Layout from '../components/Layout'
import ContentBlock from '../components/ContentBlock'
import TravelCard from '../components/TravelCard'
import { Map } from 'lucide-react'
import { generateMeta } from '../utils/seo'

export const meta = () => generateMeta({ title: "Travels", description: "Travel map and stories from travelling Europe in a campervan.", path: "/travels" });

const Travels = () => {
  return (
    <Layout>
      <ContentBlock title="Travels" icon={Map}>
        {/* Intro text */}
        <div className="text-body text-justify mb-6">
              <p className='mb-2'>
                As a family, we have traveled a lot. Most of the time we have traveled cheaply, all of the time we have found really 
                exciting and interesting places. My wife, Amber, handles all of the organisation so I can't take credit for this, but I 
                want to showcase some of our journeys here. 
              </p>
              <p className='mb-2'>
                I've created an interactive map using Leaflet to display the locations we have visited, mainly so I can remind myself 
                of our adventures: the names of towns, the locations of beaches or museums... It helps for me to have this visual 
                reminder. Kind of like sticking pins, strings and polaroids onto a wall map, but more computerised. 
              </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <TravelCard
            title="Van Life Part I"
            dates="Oct 2019 — June 2020"
            imagePath="/images/vanlife_wide.webp"
            imageAlt="Van Life Part I"
            tags={["Europe", "Vanlife"]}
            flags="🇬🇧 → 🇫🇷 → 🇧🇪 → 🇩🇪 → 🇱🇺 → 🇫🇷 → 🇦🇩 → 🇪🇸 → 🇵🇹"
            link="/travel/vanlife"
            description={
              <>
                <p className='mb-2'>
                  The first part of our five-year (on-and-off) adventure traveling across Europe in a converted Mercedes Sprinter van.
                  From the UK through Belgium, Germany, Luxembourg, France and Andorra to Sunny Spain and Portugal.
                </p>
                <p className='mb-2'>
                  After years of dreaming and months of building, with my PhD thesis submitted, we set off in late 2019
                  to explore as much of Europe as possible...
                </p>
                <p className='mb-2'>
                  Well, it didn't turn out quite as we'd planned because of that global pandemic, but we did spend our Lock-Down stuck on a beach in Portugal —
                  not such a bad thing after all! At the end of this period, once travel restrictions had eased, we headed back to the UK for the
                  summer before starting on Vanlife Part II.
                </p>
              </>
            }
          />
        </div>

      </ContentBlock>
    </Layout>
  )
}

export default Travels
