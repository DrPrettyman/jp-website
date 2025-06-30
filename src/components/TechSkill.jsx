import React from 'react';

const renderText = (items, level = 0) => {
  const listClassName = level === 0 ? "list-disc list-outside ml-5" : "list-['–'] list-outside ml-3";
  const listItemClassName = level === 0 ? "mb-2 pl-2" : "mb-1 pl-2";

  return (
    <ul className={listClassName}>
      {items.map((item, index) => (
        <li key={index} className={listItemClassName}>
          <span dangerouslySetInnerHTML={{ __html: item.content }}></span>
          {item.children && renderText(item.children.map(child => ({ content: child })), level + 1)} 
        </li>
      ))}
    </ul>
  );
};

const TechSkill = ({ title, icon, techIcons, firstParagraph, text }) => {
  return (
    <div className="bg-blue-50 dark:bg-gray-600 shadow rounded-lg px-8 py-6 mb-4 mx-2 sm:mx-0">
      {/* Mobile layout */}
      <div className="sm:hidden text-lg font-bold text-gray-600 dark:text-white mb-4">
        <div className="flex items-center justify-center text-center mb-2">
          {icon}
          {title}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {techIcons.map((icon, index) => (
            <img key={index} src={`/tech_icons/${icon}.svg`} alt={`${icon} Logo`} className="h-6 w-6" />
          ))}
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden sm:flex text-lg font-bold text-gray-600 dark:text-white mb-4 items-center justify-between">
        <div className="flex items-center">
          {icon}
          {title}
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          {techIcons.map((icon, index) => (
            <img key={index} src={`/tech_icons/${icon}.svg`} alt={`${icon} Logo`} className="h-6 w-6" />
          ))}
        </div>
      </div>
      <div className="text-md text-gray-600 dark:text-white text-justify">
        <p className='mb-2' dangerouslySetInnerHTML={{ __html: firstParagraph }}></p>
        {renderText(text)}
      </div>
    </div>
  );
};

export default TechSkill;
