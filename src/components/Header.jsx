import React, { useState } from 'react'
import { Menu, Mail, Linkedin, GraduationCap, Briefcase, Home, Star, FolderGit2, FileDown, FileText, BookOpen } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const getButtonClasses = (path) => {
    return `px-4 py-2 rounded-lg ${
      isActive(path)
        ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
    }`
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow fixed top-0 w-full z-50">
      {/* <div className="max-w-7xl mx-auto px-0"> */}
      <div className="max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14">
          {/* Logo/Name and Social Icons */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
              <img src="/images/headshot.jpeg" alt="Joshua's face" className="h-10 w-10 rounded-full" />
            </Link>
            <Link to="/" className="hidden md:block text-xl font-bold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
              Dr Joshua Prettyman
            </Link>
            <div className="flex space-x-2">
              <Link 
                to="/" 
                className="relative group text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Home className="h-5 w-5" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Home</span>
              </Link>
              <a 
                href="mailto:your.email@example.com" 
                className="relative group text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Email</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/joshuaprettyman/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative group text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">LinkedIn</span>
              </a>
              <a 
                href="/documents/JoshuaPrettymanCV.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative group text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <FileText className="h-5 w-5" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">PDF CV</span>
              </a>
              {/* <a 
                href="mailto:your.email@example.com" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <img src={cvIcon} alt="CV Icon" className="h-5 w-5" />
              </a> */}
            </div>
          </div>
          
          {/* Navigation links */}
          <nav className="hidden md:flex space-x-2 ml-auto">
            <Link 
              to="/academic" 
              className={getButtonClasses('/academic')}
            >
              <div className="flex items-center space-x-1 text-sm">
                <GraduationCap className="h-4 w-4 mr-1" />
                <span className="whitespace-nowrap">Academic CV</span>
              </div>
            </Link>

            <Link 
              to="/professional" 
              className={getButtonClasses('/professional')}
            >
              <div className="flex items-center space-x-1 text-sm">
                <Briefcase className="h-4 w-4 mr-1" />
                <span className="whitespace-nowrap">Professional CV</span>
              </div>
            </Link>

            <Link 
              to="/projects" 
              className={getButtonClasses('/projects')}
            >
              <div className="flex items-center space-x-1 text-sm">
                <FolderGit2 className="h-4 w-4 mr-1" />
                <span className="whitespace-nowrap">Projects</span>
              </div>
            </Link>

            <Link 
              to="/blog" 
              className={getButtonClasses('/blog')}
            >
              <div className="flex items-center space-x-1 text-sm">
                <BookOpen className="h-4 w-4 mr-1" />
                <span className="whitespace-nowrap">Blog</span>
              </div>
            </Link>
            <DarkModeToggle />
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </button>

          

          {mobileMenuOpen && (
            <div className="absolute top-16 right-0 left-0 bg-white dark:bg-gray-900 shadow-lg md:hidden">
              <div className="px-4 py-2 space-y-2 flex flex-col items-end">
                <Link 
                  to="/academic" 
                  className={`text-right px-4 py-2 rounded-lg ${
                    isActive('/academic')
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <GraduationCap className="h-4 w-4" />
                    <span>Academic CV</span>
                  </div>
                </Link>
                <Link 
                  to="/professional" 
                  className={`text-right px-4 py-2 rounded-lg ${
                    isActive('/professional')
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <Briefcase className="h-4 w-4" />
                    <span className="whitespace-nowrap">Professional CV</span>
                  </div>
                </Link>
                <Link 
                  to="/projects" 
                  className={`text-right px-4 py-2 rounded-lg ${
                    isActive('/projects')
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <FolderGit2 className="h-4 w-4" />
                    <span className="whitespace-nowrap">Projects</span>
                  </div>
                </Link>
                <Link 
                  to="/blog" 
                  className={`text-right px-4 py-2 rounded-lg ${
                    isActive('/blog')
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span className="whitespace-nowrap">Blog</span>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header