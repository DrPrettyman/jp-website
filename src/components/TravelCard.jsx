import React from 'react';

const TravelCard = ({
  title,
  dates,
  imagePath,
  imageAlt,
  tags = [],
  flags,
  description,
  link
}) => {
  return (
    <div className="bg-blue-50 dark:bg-gray-600 shadow rounded-lg p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Photo on the left (desktop) / top (mobile) */}
        <div className="w-full h-48 md:w-64 md:h-64 flex-shrink-0">
          <a href={link}>
            <img
              src={imagePath}
              alt={imageAlt || title}
              loading="lazy"
              className="w-full h-full bg-white object-cover rounded-lg shadow-md"
            />
          </a>
        </div>

        {/* Content on the right (desktop) / bottom (mobile) */}
        <div className="flex-1 flex flex-col">
          {/* Title & date (and tags on desktop) */}
          <div className='mb-3'>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
              <div>
                <a href={link}>
                  <h2 className="text-xl font-bold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-300 hover:underline inline">
                    {title}
                  </h2>
                </a>
                <span className="text-xs sm:text-sm text-gray-700 dark:text-white ml-2">
                  ({dates})
                </span>
              </div>
              {/* Tags and Flags - hidden on mobile, shown on desktop */}
              <div className="hidden md:flex flex-wrap gap-1 ml-4">
                {tags.map(tag => (
                  <span key={tag} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
                {flags && (
                  <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                    {flags}
                  </span>
                )}
              </div>
            </div>

            {/* Tags and Flags - shown on mobile, hidden on desktop */}
            <div className="flex md:hidden flex-wrap gap-1 mb-2">
              {tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
              {flags && (
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                  {flags}
                </span>
              )}
            </div>

          </div>

          {/* Description */}
          <div className="text-body">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
