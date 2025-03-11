import React from 'react'
import { Mail, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-col items-center space-y-1">
          <div className="flex justify-center space-x-6">
            <p className="text-gray-700 dark:text-gray-200 text-sm">
              © Joshua Prettyman 2025. Created with TypeScript and React.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer