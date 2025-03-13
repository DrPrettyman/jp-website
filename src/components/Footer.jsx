import React from 'react'
import { Mail, Linkedin } from 'lucide-react'
import { FaReact, FaRegCopyright } from "react-icons/fa";
import { IoLogoVercel } from "react-icons/io5";
import { PiHandPeace } from "react-icons/pi";

const Footer = () => {
  return (
    <footer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-col items-center space-y-1">
          <div className="flex justify-center space-x-6">
            <p className="text-gray-700 dark:text-gray-200 text-sm">
              <FaRegCopyright className="inline-block mr-1" /> 
              Joshua Prettyman 2025 <PiHandPeace className="inline-block mr-1" />
              Created with React <FaReact className="inline-block mr-1" /> 
              Hosted on Vercel <IoLogoVercel className="inline-block mr-1" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer