import React from 'react'
import Layout from '../components/Layout'
import ContentBlock from '../components/ContentBlock'
import { Map } from 'lucide-react'

const Travels = () => {
  return (
    <Layout>
      <ContentBlock title="Travels" icon={Map}>
        {/* Intro text */}
        <div className="text-md text-gray-600 dark:text-white text-justify mb-6">
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
          {/* Vanlife - Custom Layout */}
          <div className="bg-blue-50 dark:bg-gray-600 shadow rounded-lg p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Photo on the left (desktop) / top (mobile) */}
              <div className="w-full h-48 md:w-64 md:h-64 flex-shrink-0">
                <a href="/travel/vanlife">
                  <img
                    src="/images/vanlife_wide.jpeg"
                    alt="Van Life Part I"
                    className="w-full h-full bg-white object-cover rounded-lg shadow-md"
                  />
                </a>
              </div>

              {/* Content on the right (desktop) / bottom (mobile) */}
              <div className="flex-1 flex flex-col">
                {/* Title & date (and tags on desktop) */}
                <div className='mb-4'>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                    <div>
                      <a href="/travel/vanlife">
                        <h2 className="text-xl font-bold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-300 hover:underline inline">
                          Van Life Part I
                        </h2>
                      </a>
                      <span className="text-sm text-gray-700 dark:text-white ml-2">
                        (2019-2021)
                      </span>
                    </div>
                    {/* Tags - hidden on mobile, shown on desktop */}
                    <div className="hidden md:flex flex-wrap gap-1 ml-4">
                      {["Europe", "Vanlife", "Covid"].map(tag => (
                        <span key={tag} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tags - shown on mobile, hidden on desktop */}
                  <div className="flex md:hidden flex-wrap gap-1 mb-2">
                    {["Europe", "Vanlife", "Covid"].map(tag => (
                      <span key={tag} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}

                <div className="text-gray-800 dark:text-white italic">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentBlock>
    </Layout>
  )
}

export default Travels
