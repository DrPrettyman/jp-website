import React from 'react'
import Layout from '../components/Layout'

const Home = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-gray-200/65 dark:bg-gray-800 rounded-lg px-8 py-8 mb-4">
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
        {/* <div className="bg-gray-100/75 rounded-[60px] px-12 py-12 mb-8">
          <div className="bg-blue-50 shadow rounded-full p-4 flex flex-col justify-between h-full">
            Boo
          </div>
        </div> */}
      </div>
    </Layout>
  )
}

export default Home