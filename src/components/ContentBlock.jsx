const ContentBlock = ({ title, icon: Icon, children, maxWidth = "7xl" }) => {
  return (
    <div className={`max-w-${maxWidth} mx-auto py-6 sm:px-6 lg:px-8`}>
      <div className="bg-gray-200/65 dark:bg-gray-800 rounded-lg px-8 py-6 mb-4 mx-2 sm:mx-0">
        <div className="grid grid-cols-3 items-center sm:flex sm:items-center text-gray-900 dark:text-white mb-6">
          <Icon className="h-8 w-8 justify-self-start" />
          <h1 className="text-4xl font-bold text-center sm:text-left sm:ml-2">
            {title}
          </h1>
          <Icon className="h-8 w-8 justify-self-end sm:hidden" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default ContentBlock;