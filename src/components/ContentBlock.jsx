import { LiaGithub } from "react-icons/lia";

const ContentBlock = ({ title, icon: Icon, children, maxWidth = "7xl", githubUrl }) => {
  return (
    <div className={`max-w-${maxWidth} mx-auto py-6 sm:px-6 lg:px-8`}>
      <div className="bg-gray-200/65 dark:bg-gray-800 rounded-lg px-8 py-6 mb-4 mx-2 sm:mx-0">
        <div className="text-gray-900 dark:text-white mb-6">
          {/* Mobile layout */}
          <div className="sm:hidden">
            <div className="grid grid-cols-3 items-center mb-4">
              <Icon className="h-8 w-8 justify-self-start" />
              <h1 className="text-4xl font-bold text-center">
                {title}
              </h1>
              <Icon className="h-8 w-8 justify-self-end" />
            </div>
            {githubUrl && (
              <div className="flex justify-center">
                <a 
                  href={githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="relative group text-gray-600 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <LiaGithub className="h-10 w-10" />
                  <span className="absolute top-1/2 -left-28 -translate-y-1/2 hidden group-hover:block bg-gray-800 dark:bg-gray-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">View on GitHub</span>
                </a>
              </div>
            )}
          </div>
          
          {/* Desktop layout */}
          <div className="hidden sm:flex items-center">
            <Icon className="h-8 w-8 mr-2" />
            <h1 className="text-4xl font-bold">
              {title}
            </h1>
            {githubUrl && (
              <div className="font-bold flex items-center ml-auto">
                <a 
                  href={githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="relative group text-gray-600 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <LiaGithub className="h-10 w-10" />
                  <span className="absolute top-1/2 -left-28 -translate-y-1/2 hidden group-hover:block bg-gray-800 dark:bg-gray-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">View on GitHub</span>
                </a>
              </div>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ContentBlock;