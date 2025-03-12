// Layout.jsx

import { ChevronsDown } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import Header from './Header'
import Footer from './Footer'
import NodeBackground from 'animated-network-background'

const Layout = ({ children }) => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when at least 10% of the footer is visible
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col pt-16 relative overflow-hidden">
      {/* Interactive node background - Visible all the time */}
      <div className="fixed top-0 left-0 w-full h-full z-[-1]">
        <NodeBackground />
      </div>
      
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      
      {/* ChevronDown icon - fixed at bottom center */}
      <div className={`fixed bottom-8 right-8 transform -translate-x-1/2 transition-opacity duration-300 ${isFooterVisible ? 'opacity-0' : 'opacity-100'}`}>
        <ChevronsDown 
          className="h-10 w-10 text-gray-700 dark:text-gray-300 cursor-pointer" 
          onClick={() => window.scrollBy({ top: 300, behavior: 'smooth' })}
        />
      </div>
      
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
